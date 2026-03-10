'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {

  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState('')
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [cover, setCover] = useState(null)
  const [video, setVideo] = useState(null)

  const [uploadFilterCategory, setUploadFilterCategory] = useState('')
  const [images, setImages] = useState(null)

  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken')
    : null


  // ================= LOAD COLLECTIONS =================

  useEffect(() => {

    const url = uploadFilterCategory
      ? `http://localhost:5000/api/collections?category=${uploadFilterCategory}`
      : `http://localhost:5000/api/collections`

    fetch(url)
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(() => {})

  }, [uploadFilterCategory])


  // ================= LOAD MEDIA =================

  useEffect(() => {

    if (!selectedCollection) return

    fetch(`http://localhost:5000/api/media?collection_id=${selectedCollection}`)
      .then(res => res.json())
      .then(data => setMedia(data))

  }, [selectedCollection])


  // ================= CREATE COLLECTION =================

  const handleCreateCollection = async (e) => {

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

    const res = await fetch(
      'http://localhost:5000/api/collections',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      }
    )

    if (res.ok) {

      alert('Collection created')

      window.location.reload()

    } else {

      alert('Failed to create collection')

    }

    setLoading(false)

  }


  // ================= UPLOAD IMAGES =================

  const handleUploadImages = async (e) => {

    e.preventDefault()

    if (!images || !selectedCollection)
      return alert('Select collection and images')

    const formData = new FormData()

    formData.append('collection_id', selectedCollection)

    Array.from(images).forEach(img =>
      formData.append('images', img)
    )

    setLoading(true)

    const res = await fetch(
      'http://localhost:5000/api/media/multiple',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      }
    )

    if (res.ok) {

      alert('Images uploaded')

      setImages(null)

      fetch(
        `http://localhost:5000/api/media?collection_id=${selectedCollection}`
      )
        .then(res => res.json())
        .then(data => setMedia(data))

    } else {

      alert('Upload failed')

    }

    setLoading(false)

  }


  // ================= DELETE IMAGE =================

  const deleteImage = async (id) => {

    if (!confirm('Delete this image?')) return

    await fetch(
      `http://localhost:5000/api/media/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    setMedia(media.filter(m => m.id !== id))

  }


  // ================= DELETE COLLECTION =================

  const deleteCollection = async (id) => {

    if (!confirm('Delete this collection?')) return

    await fetch(
      `http://localhost:5000/api/collections/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    setCollections(collections.filter(c => c.id !== id))

  }


  return (

    <div className="min-h-screen bg-black text-white p-10 space-y-16">

      <h1 className="text-4xl text-gold border-b border-gold/20 pb-4">
        Admin CMS Dashboard
      </h1>


      {/* ================= CREATE COLLECTION ================= */}

      <div className="border border-gold/20 p-8 rounded-xl bg-gray-900/50">

        <h2 className="text-2xl text-gold mb-6">
          Create New Collection
        </h2>

        <form
          onSubmit={handleCreateCollection}
          className="space-y-4 max-w-2xl"
        >

          <input
            type="text"
            placeholder="Collection Title"
            className="w-full p-3 bg-gray-800"
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <select
            className="w-full p-3 bg-gray-800"
            onChange={(e)=>setCategory(e.target.value)}
            required
          >

            <option value="">Select Category</option>
            <option value="wedding">Wedding</option>
            <option value="pre-wedding">Pre-Wedding</option>
            <option value="fashion">Fashion</option>
            <option value="commercial">Commercial</option>
            <option value="video-production">Video Production</option>
            <option value="album-design">Album Design</option>

          </select>

          <textarea
            placeholder="Description"
            className="w-full p-3 bg-gray-800"
            onChange={(e)=>setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year"
            className="w-full p-3 bg-gray-800"
            onChange={(e)=>setDate(e.target.value)}
          />

          <input type="file" onChange={(e)=>setCover(e.target.files[0])}/>
          <input type="file" onChange={(e)=>setVideo(e.target.files[0])}/>

          <button
            className="bg-gold text-black px-8 py-3"
          >
            {loading ? 'Processing...' : 'Create Collection'}
          </button>

        </form>

      </div>


      {/* ================= UPLOAD IMAGES ================= */}

      <div className="border border-gold/20 p-8 rounded-xl bg-gray-900/50">

        <h2 className="text-2xl text-gold mb-6">
          Upload Images
        </h2>

        <select
          className="w-full p-3 bg-gray-800 mb-4"
          value={uploadFilterCategory}
          onChange={(e)=>setUploadFilterCategory(e.target.value)}
        >

          <option value="">All Categories</option>
          <option value="wedding">Wedding</option>
          <option value="pre-wedding">Pre-Wedding</option>
          <option value="fashion">Fashion</option>

        </select>

        <select
          className="w-full p-3 bg-gray-800 mb-4"
          value={selectedCollection}
          onChange={(e)=>setSelectedCollection(e.target.value)}
        >

          <option value="">Select Collection</option>

          {collections.map(c=>(
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}

        </select>

        <button
          onClick={()=>deleteCollection(selectedCollection)}
          className="bg-red-600 px-4 py-2 mb-4"
        >
          Delete Collection
        </button>

        <form onSubmit={handleUploadImages}>

          <input
            type="file"
            multiple
            onChange={(e)=>setImages(e.target.files)}
          />

          <button
            type="submit"
            className="bg-gold text-black px-8 py-3 mt-4"
          >
            Upload Images
          </button>

        </form>


        {/* ================= SHOW MEDIA ================= */}

        <div className="grid grid-cols-4 gap-4 mt-10">

          {media.map(img => (

            <div key={img.id} className="relative">

              <img
                src={`http://localhost:5000${img.image_url}`}
                className="w-full h-40 object-cover"
              />

              <button
                onClick={()=>deleteImage(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}