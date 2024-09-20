import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const supportedFileTypes = [
  "image/png",
  "image/jpeg",
  "application/pdf",
];
