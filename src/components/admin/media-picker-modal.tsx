"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Upload, Image as ImageIcon, Check } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { compressImage } from "@/lib/compress-image";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string | null;
  mimeType: string | null;
}

interface MediaPickerModalProps {
  open: boolean;
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaPickerModal({ open, onSelect, onClose }: MediaPickerModalProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data.filter((m: MediaItem) => m.mimeType?.startsWith("image/")));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) {
      setSelected(null);
      loadMedia();
    }
  }, [open, loadMedia]);

  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    let failed = 0;
    let lastError = "";
    for (const file of Array.from(files)) {
      try {
        const compressed = await compressImage(file);
        await upload(compressed.name, compressed, {
          access: "public",
          handleUploadUrl: "/api/media/upload",
        });
      } catch (err) {
        console.error(`Upload error for ${file.name}:`, err);
        lastError = err instanceof Error ? err.message : "Upload failed";
        failed++;
      }
    }
    setUploading(false);
    if (failed > 0) {
      setError(`${failed} file(s) failed to upload.${lastError ? ` Error: ${lastError}` : ""}`);
    }
    loadMedia();
    e.target.value = "";
  };

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#0f1729] border border-white/10 rounded-xl w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white font-[family-name:var(--font-montserrat)]">
            Select Image
          </h3>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 cursor-pointer transition-colors">
              <Upload size={14} />
              {uploading ? "Uploading..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No images yet. Upload one above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {media.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selected === item.url
                      ? "border-[#F5A623] ring-2 ring-[#F5A623]/30"
                      : "border-transparent hover:border-white/20"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="w-full h-full object-cover"
                  />
                  {selected === item.url && (
                    <div className="absolute inset-0 bg-[#F5A623]/20 flex items-center justify-center">
                      <div className="w-7 h-7 bg-[#F5A623] rounded-full flex items-center justify-center">
                        <Check size={16} className="text-black" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="px-4 py-2 text-sm text-black bg-[#F5A623] hover:bg-[#D4910A] rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}
