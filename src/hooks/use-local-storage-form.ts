"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorageForm<T extends Record<string, unknown>>(
  key: string,
  initialData: T
) {
  const [formData, setFormData] = useState<T>(() => {
    if (typeof window === "undefined") return initialData;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialData, ...parsed };
      }
    } catch {
      // corrupted data, ignore
    }
    return initialData;
  });

  // Auto-save on every change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(formData));
    } catch {
      // quota exceeded, ignore
    }
  }, [key, formData]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { formData, setFormData, clearSavedData };
}
