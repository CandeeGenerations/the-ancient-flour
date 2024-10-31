import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return format(date, "MMMM d, yyyy 'at' h:mm a");
}

export function formatOrderNumber(orderId: string) {
  return orderId;
}