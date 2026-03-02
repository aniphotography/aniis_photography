'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {

  const [collections, setCollections] = useState<any[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string>('')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [cover, setCover] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)

  const [images, setImages] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('adminToken')
      : null

  // Load collections for image upload dropdown
  useEffect(() => {
    fetch('http://localhost:5000/api/collections?category=wedding')
      .then(res => res.json())
      .then(data => setCollections(data))
  }, [])

  // ================= CREATE COLLECTION =================
  const handleCreateCollection = async (e: any) => {
    e.preventDefault()

    if (!token) return alert('Not authenticated')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('date', date)

    if (cover) formData.append('cover', cover)
    if (video) formData.append('video', video)

    setLoading(true)

    const res = await fetch('http://localhost:5000/api/collections', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    setLoading(false)

    if (res.ok) {
      alert('Collection created!')
      window.location.reload()
    } else {
      alert('Failed to create collection')
    }
  }

  // ================= UPLOAD IMAGES =================
  const handleUploadImages = async (e: any) => {
    e.preventDefault()

    if (!token) return alert('Not authenticated')
    if (!images || !selectedCollection)
      return alert('Select collection & images')

    const formData = new FormData()
    formData.append('collection_id', selectedCollection)

    Array.from(images).forEach((img) => {
      formData.append('images', img)
    })

    setLoading(true)

    const res = await fetch('http://localhost:5000/api/media/multiple', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    setLoading(false)

    if (res.ok) {
      alert('Images uploaded!')
    } else {
      alert('Upload failed')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-16">

      <h1 className="text-4xl text-gold mb-10">Admin CMS Dashboard</h1>

      {/* ================= CREATE COLLECTION ================= */}
      <div className="border border-gold/20 p-8 rounded-xl">
        <h2 className="text-2xl text-gold mb-6">Create New Collection</h2>

        <form onSubmit={handleCreateCollection} className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="wedding">Wedding</option>
            <option value="pre-wedding">Pre-Wedding</option>
            <option value="commercial">Commercial</option>
            <option value="fashion">Fashion</option>
            <option value="video-production">Video Production</option>
            <option value="album-design">Album Design</option>
          </select>

          <textarea
            placeholder="Description"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year (e.g. 2024)"
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setDate(e.target.value)}
          />

          <div>
            <label>Cover Image</label>
            <input type="file" onChange={(e: any) => setCover(e.target.files[0])} />
          </div>

          <div>
            <label>Background Video</label>
            <input type="file" onChange={(e: any) => setVideo(e.target.files[0])} />
          </div>

          <button className="bg-gold text-black px-6 py-2">
            {loading ? 'Creating...' : 'Create Collection'}
          </button>
        </form>
      </div>

      {/* ================= UPLOAD IMAGES ================= */}
      <div className="border border-gold/20 p-8 rounded-xl">
        <h2 className="text-2xl text-gold mb-6">Upload Images To Collection</h2>

        <form onSubmit={handleUploadImages} className="space-y-4">

          <select
            className="w-full p-2 bg-gray-800"
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">Select Collection</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <input
            type="file"
            multiple
            onChange={(e: any) => setImages(e.target.files)}
          />

          <button className="bg-gold text-black px-6 py-2">
            {loading ? 'Uploading...' : 'Upload Images'}
          </button>
        </form>
      </div>

    </div>
  )
}