import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaUrl(url?: string | null) {
  if (!url) return url
  if (typeof url !== 'string') return url
  if (url.startsWith('http')) return url

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
}
