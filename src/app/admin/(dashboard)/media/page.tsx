"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import { compressImage } from "@/lib/compress-image";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  size: number | null;
  mimeType: string | null;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadMedia = useCallback(async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data);
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("alt", file.name);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast(`Failed to upload ${file.name}`, "error");
      }
    }

    toast(`Uploaded ${files.length} file(s)`, "success");
    setUploading(false);
    loadMedia();
    e.target.value = "";
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const res = await fetch(`/api/media/${deleteTarget.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast("File deleted", "success");
      loadMedia();
    } else {
      toast("Failed to delete file", "error");
    }

    setDeleting(false);
    setDeleteTarget(null);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("URL copied to clipboard", "info");
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <AdminHeader title="Media Library" />
      <main className="p-6">
        {/* Upload area */}
        <label className="block mb-6 cursor-pointer">
          <div className="border-2 border-dashed border-white/10 hover:border-[#F5A623]/30 rounded-xl p-8 text-center transition-colors">
            <Upload
              size={32}
              className="mx-auto mb-3 text-gray-500"
            />
            <p className="text-sm text-gray-400">
              {uploading
                ? "Uploading..."
                : "Click or drag files here to upload"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Supports images, PDFs, and documents
            </p>
          </div>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0f1729] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="aspect-square relative bg-white/5 flex items-center justify-center">
                {item.mimeType?.startsWith("image/") ? (
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={32} className="text-gray-600" />
                )}
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy URL"
                  >
                    <Copy size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-400 truncate">
                  {item.filename}
                </p>
                <p className="text-xs text-gray-600">{formatSize(item.size)}</p>
              </div>
            </div>
          ))}
        </div>

        {media.length === 0 && !uploading && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-50" />
            <p>No media files yet. Upload your first file above.</p>
          </div>
        )}

        <ConfirmDialog
          open={!!deleteTarget}
          title="Delete File"
          message={`Are you sure you want to delete "${deleteTarget?.filename}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      </main>
    </>
  );
}
