"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  images: { id: string; url: string; alt: string }[];
  onImagesChange: (images: { id: string; url: string; alt: string }[]) => void;
}

export function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, this would upload to a storage service
    const newImages = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      alt: file.name,
    }));
    onImagesChange([...images, ...newImages]);
  }, [images, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: true
  });

  const removeImage = (id: string) => {
    onImagesChange(images.filter((image) => image.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the files here"
              : "Drag & drop images here, or click to select"}
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group aspect-square">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="rounded-lg object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(image.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}