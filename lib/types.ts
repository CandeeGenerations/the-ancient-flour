import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  allergens: z.array(z.string()),
  inStock: z.boolean().default(true),
  tags: z.array(z.string()),
  enabled: z.boolean().default(true),
  featured: z.boolean().default(false),
  images: z.array(z.object({
    id: z.string(),
    url: z.string().url("Invalid image URL"),
    alt: z.string(),
    isPrimary: z.boolean().default(false),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
  image: z.string(),
});

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
  })),
  status: z.enum([
    "new",
    "confirmed",
    "in_progress",
    "completed",
    "fulfilled",
    "canceled",
    "archived"
  ]),
  total: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cash", "check", "zelle", "paypal", "applepay", "venmo"]),
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = z.infer<typeof orderSchema>;