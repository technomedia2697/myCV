'use client';

import { useState, useCallback } from 'react';

export interface UploadedImage {
  url: string;
  type: string;
  size: number;
  name: string;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<UploadedImage | null> => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success || !result.data) {
        setError(result.error || 'Upload failed');
        return null;
      }

      return {
        url: result.data.url,
        type: result.data.type,
        size: result.data.size,
        name: result.data.name
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    upload,
    uploading,
    error,
  };
}
