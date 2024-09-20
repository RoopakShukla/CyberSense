import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const supportedFileTypes = [
  "image/png",
  "image/jpeg",
  "video/x-flv",
  "video/quicktime",
  "video/mpeg",
  "video/mpegps",
  "video/mpg",
  "video/mp4",
  "video/webm",
  "video/wmv",
  "video/3gpp",
  "audio/aac",
  "audio/mpeg",
  "audio/flac",
  "audio/mp3",
  "audio/m4a",
  "audio/mpeg",
  "audio/mpga",
  "audio/mp4",
  "audio/opus",
  "audio/pcm",
  "audio/wav",
  "audio/webm",
  "application/pdf",
];
