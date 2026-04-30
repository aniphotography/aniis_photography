
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function BlogsPage() {

  const [blogs, setBlogs] = useState([])
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  // Check admin status
useEffect(() => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) {
    localStorage.removeItem('adminToken'); // optional but recommended
    setIsAdmin(false);
  } else {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }
}, []);

  // 🔥 FETCH BLOGS FROM COLLECTIONS
  const fetchBlogs = () => {
    fetch(`${API}/api/collections?category=blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // 🔐 HANDLE ADD BUTTON
  const handleAddClick = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard?category=blogs')
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          Photography <span className="text-gold">Blogs</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Stories, guides, and inspiration from our photography journey
        </p>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* BLOGS */}
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="group cursor-pointer">

                <div className="overflow-hidden rounded-xl mb-5 border border-white/10">
                  <img
                    src={getMediaUrl(blog.cover_image)}
                    alt={blog.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-display mb-2 group-hover:text-gold transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 uppercase tracking-widest">
                  {blog.date}
                </p>

              </div>
            </Link>
          ))}

          {/* ➕ ADD CARD */}
          {isAdmin && <AddCard handleAddClick={handleAddClick} />}

        </div>
      </section>

      <Footer />
    </main>
  )
}

// ➕ ADD CARD COMPONENT
function AddCard({ handleAddClick }) {
  return (
    <div
      onClick={handleAddClick}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-xl mb-5 border border-dashed border-gold flex items-center justify-center h-72 hover:bg-white/5 transition">
        <span className="text-5xl text-gold">+</span>
      </div>

      <h3 className="text-xl md:text-2xl font-display mb-2 text-gray-500">
        Add Blog
      </h3>

      <p className="text-sm text-gray-600 uppercase tracking-widest">
        ADMIN
      </p>
    </div>
  )
}
