"use client";

import { CartItem, Product, Promotion } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContext {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  promotion: Promotion | null;
  applyPromotion: (code: string) => Promise<boolean>;
  removePromotion: () => void;
}

const CartContext = createContext<CartContext | undefined>(undefined);

const CART_STORAGE_KEY = "shopping-cart";

const validatePromotion = async (code: string): Promise<Promotion | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const mockPromotions: Record<string, Promotion> = {
    "SUMMER2024": {
      id: "1",
      code: "SUMMER2024",
      description: "Summer sale discount",
      type: "percentage",
      value: 20,
      minPurchase: 50,
      maxUses: 100,
      usedCount: 45,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "WELCOME10": {
      id: "2",
      code: "WELCOME10",
      description: "New customer discount",
      type: "fixed_amount",
      value: 10,
      minPurchase: 25,
      maxUses: 1000,
      usedCount: 234,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return mockPromotions[code] || null;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromotion(null);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const calculateDiscount = () => {
    if (!promotion) return 0;

    if (promotion.type === "percentage") {
      return (subtotal * promotion.value) / 100;
    }

    return Math.min(promotion.value, subtotal);
  };

  const discount = calculateDiscount();
  const totalPrice = subtotal - discount;

  const applyPromotion = async (code: string): Promise<boolean> => {
    try {
      const validPromotion = await validatePromotion(code);
      if (!validPromotion) {
        throw new Error("Invalid promotion code");
      }

      if (!validPromotion.enabled) {
        throw new Error("This promotion is no longer active");
      }
      
      const now = new Date();
      if (now < validPromotion.startDate) {
        throw new Error("This promotion has not started yet");
      }
      
      if (now > validPromotion.endDate) {
        throw new Error("This promotion has expired");
      }
      
      if (validPromotion.usedCount >= validPromotion.maxUses) {
        throw new Error("This promotion has reached its maximum usage limit");
      }
      
      if (subtotal < validPromotion.minPurchase) {
        throw new Error(`This promotion requires a minimum purchase of $${validPromotion.minPurchase.toFixed(2)}`);
      }

      setPromotion(validPromotion);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to apply promotion");
    }
  };

  const removePromotion = () => {
    setPromotion(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalItems,
        subtotal,
        discount,
        totalPrice,
        promotion,
        applyPromotion,
        removePromotion,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}