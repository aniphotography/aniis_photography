'use client'

import Link from 'next/link'

export default function CategoriesSection() {
  const categories = [
    {
      id: 1,
      title: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      href: '/wedding',
      description: 'Capturing your special day with timeless elegance',
    },
    {
      id: 2,
      title: 'Pre-Wedding',
      image: 'https://images.unsplash.com/photo-1512888286885-9a6c4d8e9e9e?w=600&q=80',
      href: '/pre-wedding',
      description: 'Romance and connection before the big day',
    },
    {
      id: 3,
      title: 'Video Production',
      image: 'https://images.unsplash.com/photo-1578926078328-123456789012?w=600&q=80',
      href: '/video-production',
      description: 'Professional brand and corporate video production',
    },
    {
      id: 4,
      title: 'Fashion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      href: '/fashion',
      description: 'High-fashion and editorial photography',
    },
    {
      id: 5,
      title: 'Album Design',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      href: '/album-design',
      description: 'Creative album layouts and custom designs',
    },
  ]

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
          <p className="text-gray-400 font-lato max-w-2xl mx-auto">
            Explore our range of photography services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden h-80 cursor-pointer block rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-display text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-200 text-sm font-lato opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <div className="w-12 h-1 bg-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Second Row - 2 Centered Cards */}
        <div className="flex justify-center mt-8 gap-8">
          {categories.slice(3, 5).map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden h-80 w-full lg:w-1/3 cursor-pointer block rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-display text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-200 text-sm font-lato opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <div className="w-12 h-1 bg-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
