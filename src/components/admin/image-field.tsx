"use client";

import { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { MediaPickerModal } from "./media-picker-modal";

interface ImageFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        {/* Thumbnail preview */}
        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={20} className="text-gray-600" />
          )}
        </div>

        {/* URL input + buttons */}
        <div className="flex-1 flex gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
          />
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="px-3 py-2 text-xs text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap"
          >
            Browse
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <MediaPickerModal
        open={pickerOpen}
        onSelect={(url) => {
          onChange(url);
          setPickerOpen(false);
        }}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
