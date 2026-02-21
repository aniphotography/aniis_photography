'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function AlbumGalleryPage() {
  const params = useParams()
  const albumId = params.id
  const [selectedImage, setSelectedImage] = useState(null)

  const albumsData = {
    '1': {
      title: 'Sarah & John Wedding',
      date: '2024',
      photos: 500,
      description: 'A beautiful celebration of love with breathtaking moments captured throughout the day.',
      images: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Bride & Groom' },
        { id: 2, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'First Dance' },
        { id: 3, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Reception' },
        { id: 4, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Celebration' },
        { id: 5, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Golden Hour' },
        { id: 6, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Couple Portrait' },
        { id: 7, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Ceremony' },
        { id: 8, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Details' },
      ],
    },
    '2': {
      title: 'Emma & Alex Engagement',
      date: '2024',
      photos: 200,
      description: 'An intimate engagement shoot celebrating the beginning of their beautiful journey together.',
      images: [
        { id: 1, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Sunset Proposal' },
        { id: 2, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Romantic Moment' },
        { id: 3, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Ring Detail' },
        { id: 4, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Couple Embrace' },
        { id: 5, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Golden Light' },
        { id: 6, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Candid Shot' },
      ],
    },
    '3': {
      title: 'Rachel & David Wedding',
      date: '2023',
      photos: 450,
      description: 'An elegant wedding capturing every precious moment of Rachel and David\'s special day.',
      images: [
        { id: 1, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Bride Entrance' },
        { id: 2, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Vow Exchange' },
        { id: 3, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'First Kiss' },
        { id: 4, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'Reception Dance' },
        { id: 5, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Family Photo' },
        { id: 6, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Sunset Portraits' },
        { id: 7, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Reception Decor' },
        { id: 8, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Send Off' },
      ],
    },
    '4': {
      title: 'Jessica & Mark Celebration',
      date: '2023',
      photos: 350,
      description: 'An unforgettable celebration of Jessica and Mark\'s love with stunning photography.',
      images: [
        { id: 1, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Entrance' },
        { id: 2, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Bride & Groom' },
        { id: 3, image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=800&q=80', caption: 'First Dance' },
        { id: 4, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', caption: 'Reception' },
        { id: 5, image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Celebration' },
        { id: 6, image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80', caption: 'Group Photo' },
      ],
    },
  }

  const album = albumsData[albumId] || albumsData['1']

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Album Header */}
      <section className="pt-32 px-6 bg-gradient-to-b from-black/50 to-black">
        <div className="max-w-7xl mx-auto pb-12">
          <div className="border-l-4 border-gold pl-6 mb-8">
            <p className="text-gold text-sm uppercase tracking-widest mb-2">{album.date}</p>
            <h1 className="text-5xl md:text-6xl font-display mb-4">
              {album.title}
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              {album.photos} High-Resolution Photos
            </p>
            <p className="text-gray-400 font-lato max-w-2xl">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {album.images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden h-72 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image || "/placeholder.svg"}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white font-display text-lg text-center">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.caption}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors duration-300"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-white text-center mt-4 font-display text-xl">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
