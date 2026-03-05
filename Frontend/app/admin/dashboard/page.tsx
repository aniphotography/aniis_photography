// 'use client'

// import { useState, useEffect } from 'react'

// export default function AdminDashboard() {

//   const [collections, setCollections] = useState<any[]>([])
//   const [selectedCollection, setSelectedCollection] = useState<string>('')

//   const [title, setTitle] = useState('')
//   const [category, setCategory] = useState('')
//   const [description, setDescription] = useState('')
//   const [date, setDate] = useState('')
//   const [cover, setCover] = useState<File | null>(null)
//   const [video, setVideo] = useState<File | null>(null)

//   const [uploadCategory, setUploadCategory] = useState('')
//   const [images, setImages] = useState<FileList | null>(null)
//   const [loading, setLoading] = useState(false)

//   const token =
//     typeof window !== 'undefined'
//       ? localStorage.getItem('adminToken')
//       : null

//   // ================= LOAD COLLECTIONS =================
//   useEffect(() => {
//     const url = uploadCategory
//       ? `http://localhost:5000/api/collections?category=${uploadCategory}`
//       : `http://localhost:5000/api/collections`

//     fetch(url)
//       .then(res => res.json())
//       .then(data => setCollections(data))
//   }, [uploadCategory])

//   // ================= CREATE COLLECTION =================
//   const handleCreateCollection = async (e: any) => {
//     e.preventDefault()

//     if (!token) return alert('Not authenticated')
//     if (!category) return alert('Select category')

//     const formData = new FormData()
//     formData.append('title', title)
//     formData.append('category', category)
//     formData.append('description', description)
//     formData.append('date', date)

//     if (cover) formData.append('cover', cover)
//     if (video) formData.append('video', video)

//     setLoading(true)

//     const res = await fetch('http://localhost:5000/api/collections', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })

//     setLoading(false)

//     if (res.ok) {
//       alert('Collection created!')
//       setTitle('')
//       setCategory('')
//       setDescription('')
//       setDate('')
//       setCover(null)
//       setVideo(null)
//       setUploadCategory('') // reload all collections
//     } else {
//       alert('Failed to create collection')
//     }
//   }

//   // ================= UPLOAD IMAGES =================
//   const handleUploadImages = async (e: any) => {
//     e.preventDefault()

//     if (!token) return alert('Not authenticated')
//     if (!images || !selectedCollection)
//       return alert('Select collection & images')

//     const formData = new FormData()
//     formData.append('collection_id', selectedCollection)

//     Array.from(images).forEach((img) => {
//       formData.append('images', img)
//     })

//     setLoading(true)

//     const res = await fetch('http://localhost:5000/api/media/multiple', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })

//     setLoading(false)

//     if (res.ok) {
//       alert('Images uploaded!')
//       setImages(null)
//     } else {
//       alert('Upload failed')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-10 space-y-16">

//       <h1 className="text-4xl text-gold mb-10">Admin CMS Dashboard</h1>

//       {/* ================= CREATE COLLECTION ================= */}
//       <div className="border border-gold/20 p-8 rounded-xl">
//         <h2 className="text-2xl text-gold mb-6">Create New Collection</h2>

//         <form onSubmit={handleCreateCollection} className="space-y-4">

//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full p-2 bg-gray-800"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <select
//             className="w-full p-2 bg-gray-800"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="wedding">Wedding</option>
//             <option value="pre-wedding">Pre-Wedding</option>
//             <option value="commercial">Commercial</option>
//             <option value="fashion">Fashion</option>
//             <option value="video-production">Video Production</option>
//             <option value="album-design">Album Design</option>
//           </select>

//           <textarea
//             placeholder="Description"
//             className="w-full p-2 bg-gray-800"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Year (e.g. 2024)"
//             className="w-full p-2 bg-gray-800"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />

//           <div>
//             <label>Cover Image</label>
//             <input type="file" onChange={(e: any) => setCover(e.target.files[0])} />
//           </div>

//           <div>
//             <label>Background Video</label>
//             <input type="file" onChange={(e: any) => setVideo(e.target.files[0])} />
//           </div>

//           <button className="bg-gold text-black px-6 py-2">
//             {loading ? 'Creating...' : 'Create Collection'}
//           </button>
//         </form>
//       </div>

//       {/* ================= UPLOAD IMAGES ================= */}
//       <div className="border border-gold/20 p-8 rounded-xl">
//         <h2 className="text-2xl text-gold mb-6">Upload Images To Collection</h2>

//         <form onSubmit={handleUploadImages} className="space-y-4">

//           {/* Category Filter */}
//           <select
//             className="w-full p-2 bg-gray-800"
//             value={uploadCategory}
//             onChange={(e) => {
//               setUploadCategory(e.target.value)
//               setSelectedCollection('')
//             }}
//           >
//             <option value="">All Categories</option>
//             <option value="wedding">Wedding</option>
//             <option value="pre-wedding">Pre-Wedding</option>
//             <option value="commercial">Commercial</option>
//             <option value="fashion">Fashion</option>
//             <option value="video-production">Video Production</option>
//             <option value="album-design">Album Design</option>
//           </select>

//           {/* Collection Dropdown */}
//           <select
//             className="w-full p-2 bg-gray-800"
//             value={selectedCollection}
//             onChange={(e) => setSelectedCollection(e.target.value)}
//           >
//             <option value="">Select Collection</option>
//             {collections.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.title}
//               </option>
//             ))}
//           </select>

//           <input
//             type="file"
//             multiple
//             onChange={(e: any) => setImages(e.target.files)}
//           />

//           <button className="bg-gold text-black px-6 py-2">
//             {loading ? 'Uploading...' : 'Upload Images'}
//           </button>
//         </form>
//       </div>

//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  // --- States for Data Management ---
  const [collections, setCollections] = useState<any[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // --- States for "Create New Collection" ---
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [cover, setCover] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)

  // --- States for "Upload Images" ---
  const [uploadFilterCategory, setUploadFilterCategory] = useState('') 
  const [images, setImages] = useState<FileList | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  // ================= LOAD COLLECTIONS DYNAMICALLY =================
  // This effect runs whenever the user changes the "Filter Category" dropdown
  useEffect(() => {
    const url = uploadFilterCategory 
      ? `http://localhost:5000/api/collections?category=${uploadFilterCategory}`
      : `http://localhost:5000/api/collections`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCollections(data);
        setSelectedCollection(''); // Reset specific selection when list changes
      })
      .catch(err => console.error("Error fetching collections:", err));
  }, [uploadFilterCategory]);

  // ================= HANDLER: CREATE COLLECTION =================
  const handleCreateCollection = async (e: any) => {
    e.preventDefault()
    if (!token) return alert('Not authenticated')
    if (!category) return alert('Please select a category')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('date', date)
    if (cover) formData.append('cover', cover)
    if (video) formData.append('video', video)

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/collections', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (res.ok) {
        alert('Collection created successfully!')
        window.location.reload() // Refresh to update lists
      } else {
        alert('Failed to create collection')
      }
    } catch (error) {
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  // ================= HANDLER: UPLOAD IMAGES =================
  const handleUploadImages = async (e: any) => {
    e.preventDefault()
    if (!token) return alert('Not authenticated')
    if (!images || !selectedCollection) return alert('Please select a collection and images')

    const formData = new FormData()
    formData.append('collection_id', selectedCollection)
    Array.from(images).forEach((img) => formData.append('images', img))

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/media/multiple', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (res.ok) {
        alert('Images uploaded successfully!')
        setImages(null)
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-16">
      <h1 className="text-4xl text-gold mb-10 border-b border-gold/20 pb-4">Admin CMS Dashboard</h1>

      {/* ================= SECTION 1: CREATE COLLECTION ================= */}
      <div className="border border-gold/20 p-8 rounded-xl bg-gray-900/50">
        <h2 className="text-2xl text-gold mb-6">1. Create New Collection</h2>
        <form onSubmit={handleCreateCollection} className="space-y-4 max-w-2xl">
          <input
            type="text"
            placeholder="Collection Title (e.g. John & Jane Wedding)"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-300"
            required
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
            placeholder="Description..."
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 h-24"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year (e.g. 2024)"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700"
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Cover Image</label>
              <input type="file" className="text-sm" onChange={(e: any) => setCover(e.target.files[0])} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Background Video</label>
              <input type="file" className="text-sm" onChange={(e: any) => setVideo(e.target.files[0])} />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-gold text-black px-8 py-3 rounded font-bold hover:bg-yellow-600 disabled:opacity-50 transition-all"
          >
            {loading ? 'Processing...' : 'Create Collection'}
          </button>
        </form>
      </div>

      {/* ================= SECTION 2: UPLOAD IMAGES ================= */}
      <div className="border border-gold/20 p-8 rounded-xl bg-gray-900/50">
        <h2 className="text-2xl text-gold mb-6">2. Upload Images to Existing Collection</h2>
        <form onSubmit={handleUploadImages} className="space-y-6 max-w-2xl">
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Step A: Filter by Category</label>
            <select
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              value={uploadFilterCategory}
              onChange={(e) => setUploadFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="wedding">Wedding</option>
              <option value="pre-wedding">Pre-Wedding</option>
              <option value="commercial">Commercial</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Step B: Select the Specific Collection</label>
            <select
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              value={selectedCollection}
              required
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <option value="">-- Choose a Collection --</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} {c.date ? `(${c.date})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Step C: Select Images (Multiple)</label>
            <input
              type="file"
              multiple
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-black file:font-bold hover:file:bg-yellow-600 cursor-pointer"
              onChange={(e: any) => setImages(e.target.files)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-gold text-black px-8 py-3 rounded font-bold hover:bg-yellow-600 disabled:opacity-50 transition-all"
          >
            {loading ? 'Uploading...' : 'Upload Images Now'}
          </button>
        </form>
      </div>
    </div>
  )
}