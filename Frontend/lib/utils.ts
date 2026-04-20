// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function getMediaUrl(url?: string | null) {
//   if (!url) return url
//   if (typeof url !== 'string') return url
//   if (url.startsWith('http')) return url

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//   return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
// }
export function getMediaUrl(url?: string | null) {
  if (!url) return url
  if (typeof url !== 'string') return url
  if (!url.startsWith('http')) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  }

  // ✅ Auto-optimize Cloudinary URLs
  if (url.includes('res.cloudinary.com')) {
    // For videos
    if (url.includes('/video/upload/')) {
      return url.replace(
        '/video/upload/',
        '/video/upload/q_auto,f_auto,w_1280/'
      )
    }
    // For images
    if (url.includes('/image/upload/')) {
      return url.replace(
        '/image/upload/',
        '/image/upload/q_auto,f_auto,w_1920/'
      )
    }
  }

  return url
}