import { Product } from "@/lib/types";

export const products: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Sourdough Bread",
    description: "Traditional sourdough bread made with organic flour. Our signature sourdough is fermented for 24 hours, creating a perfect balance of tangy flavor and chewy texture. Made with organic wheat flour, filtered water, and our century-old starter culture.",
    price: 8.99,
    allergens: ["wheat", "gluten"],
    inStock: true,
    tags: ["bread", "organic"],
    enabled: true,
    featured: true,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070",
        alt: "Sourdough Bread",
        isPrimary: true
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "2": {
    id: "2",
    name: "Chocolate Croissant",
    description: "Buttery croissant filled with premium dark chocolate. Each croissant is hand-laminated over three days, creating 27 perfect layers of butter and dough. Filled with high-quality 70% dark chocolate from single-origin cacao beans.",
    price: 4.99,
    allergens: ["wheat", "dairy", "eggs"],
    inStock: true,
    tags: ["pastries", "chocolate"],
    enabled: true,
    featured: true,
    images: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=2070",
        alt: "Chocolate Croissant",
        isPrimary: true
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "3": {
    id: "3",
    name: "Carrot Cake",
    description: "Moist carrot cake with cream cheese frosting",
    price: 24.99,
    allergens: ["wheat", "dairy", "eggs", "nuts"],
    inStock: false,
    tags: ["cakes"],
    enabled: true,
    featured: false,
    images: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2070",
        alt: "Carrot Cake",
        isPrimary: true
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
};