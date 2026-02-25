'use client'

import { useState } from 'react'

export default function AdminDashboard() {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select an image file')
      return
    }

    if (!category) {
      alert('Please select a category')
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem('adminToken')

      if (!token) {
        alert('Not authenticated')
        return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('image', file)

      const res = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (res.ok) {
        alert('Uploaded successfully')
        setTitle('')
        setCategory('')
        setFile(null)
      } else {
        const data = await res.json()
        alert(data.message || 'Upload failed')
      }

    } catch (error) {
      console.error(error)
      alert('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl text-gold mb-6">Admin Dashboard</h1>

      <form onSubmit={handleUpload} className="space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Title"
          value={title}
          className="w-full p-2 bg-gray-800"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />

        <select
          value={category}
          className="w-full p-2 bg-gray-800"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="">Select Category</option>
          <option value="wedding">Wedding</option>
          <option value="pre-wedding">Pre-Wedding</option>
          <option value="commercial">Commercial</option>
          <option value="fashion">Fashion</option>
          <option value="video-production">Video Production</option>
          <option value="album-design">Album Design</option>
        </select>

        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0])
            }
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-black px-4 py-2"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

      </form>
    </div>
  )
}