"use client";

import { useState } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "./image-upload";
import { Product, ProductImage, productSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onClose: () => void;
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  onClose,
}: ProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(
    product?.images || []
  );

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      allergens: [],
      quantity: 0,
      tags: [],
      enabled: true,
      featured: false,
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const handleImageUpload = (files: FileList) => {
    // In a real app, this would upload to a storage service
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: ProductImage = {
          id: Math.random().toString(36).substring(7),
          url: reader.result as string,
          alt: file.name,
          isPrimary: images.length === 0,
        };
        setImages((prev) => [...prev, newImage]);
        form.setValue("images", [...images, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    form.setValue(
      "images",
      images.filter((img) => img.id !== imageId)
    );
  };

  const handleSetPrimaryImage = (imageId: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === imageId,
    }));
    setImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const onSubmit = async (data: Product) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call
      console.log("Submitting product:", { ...data, images });
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {product ? "Edit Product" : "Add Product"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {images.map((image) => (
                  <div 
                    key={image.id} 
                    className={cn(
                      "relative aspect-square rounded-lg border-2 overflow-hidden group",
                      image.isPrimary ? "border-primary" : "border-muted"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 self-end"
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                      {!image.isPrimary && (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleSetPrimaryImage(image.id)}
                        >
                          Set as Primary
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ImageUpload onUpload={handleImageUpload} />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergens (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value.join(", ")}
                      onChange={(e) => field.onChange(
                        e.target.value.split(",").map((s) => s.trim())
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value.join(", ")}
                      onChange={(e) => field.onChange(
                        e.target.value.split(",").map((s) => s.trim())
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enabled</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Featured</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}