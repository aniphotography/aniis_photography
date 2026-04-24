
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function AdminDashboard() {
  const searchParams = useSearchParams()
  const [homeSection, setHomeSection] = useState('')
  const [homeSlot, setHomeSlot] = useState('')
  const [homePhoto, setHomePhoto] = useState(null)
  const [homeData, setHomeData] = useState({})

  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState('')
  const [media, setMedia] = useState([])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const [cover, setCover] = useState(null)
  const [video, setVideo] = useState(null)
  const [coverVideo, setCoverVideo] = useState(null)

  const [images, setImages] = useState(null)
  const [tag, setTag] = useState('')
  const [blogVideo, setBlogVideo] = useState(null)
  const [blogText, setBlogText] = useState('')

  const [logos, setLogos] = useState([])
  const [logoFile, setLogoFile] = useState(null)
  const [logoTitle, setLogoTitle] = useState('')

  const [videoLogos, setVideoLogos] = useState([])
  const [videoLogoFile, setVideoLogoFile] = useState(null)
  const [videoLogoTitle, setVideoLogoTitle] = useState('')

  const [featuredTitle, setFeaturedTitle] = useState('')
  const [featuredDescription, setFeaturedDescription] = useState('')
  const [featuredDate, setFeaturedDate] = useState('')
  const [featuredCover, setFeaturedCover] = useState(null)
  const [featuredVideo, setFeaturedVideo] = useState(null)
  const [featuredCoverVideo, setFeaturedCoverVideo] = useState(null)
const [featuredYoutubeUrl, setFeaturedYoutubeUrl] = useState('')

const [recentYoutubeUrl, setRecentYoutubeUrl] = useState('')
  const [recentTitle, setRecentTitle] = useState('')
  const [recentDescription, setRecentDescription] = useState('')
  const [recentDate, setRecentDate] = useState('')
  const [recentCover, setRecentCover] = useState(null)
  const [recentVideo, setRecentVideo] = useState(null)
  const [recentCoverVideo, setRecentCoverVideo] = useState(null)
  const [blogYoutubeUrl, setBlogYoutubeUrl] = useState('')
const [fashionYoutubeUrl, setFashionYoutubeUrl] = useState('')



// Inside AdminDashboard function
const [testimonials, setTestimonials] = useState([]);
const [testiAuthor, setTestiAuthor] = useState('');
const [testiQuote, setTestiQuote] = useState('');
const [testiImage, setTestiImage] = useState(null); // If you want to upload a couple photo
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
/* FETCH TESTIMONIALS */
useEffect(() => {
  fetch(`${API}/api/testimonials`)
    .then(res => res.json())
    .then(data => { if (Array.isArray(data)) setTestimonials(data) })
    .catch(err => console.error("Error loading testimonials", err));
}, []);

/* UPLOAD TESTIMONIAL */
const uploadTestimonial = async (e) => {
  e.preventDefault();

  // 1. Define the API base (Uses .env variable or defaults to localhost)
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // 2. Validation: Ensure required fields are not empty
  if (!testiAuthor || !testiQuote) {
    alert("Please provide both the names and the quote.");
    return;
  }

  // 3. Prepare FormData for file upload
  const formData = new FormData();
  formData.append('author_name', testiAuthor);
  formData.append('quote', testiQuote);
  
  // Only append image if one was selected
  if (testiImage) {
    formData.append('image', testiImage); 
  }

  try {
    // 4. Send the POST request
    const response = await fetch(`${API}/api/testimonials`, {
      method: 'POST',
      body: formData,
      // Note: Do NOT set Content-Type header when using FormData
      // If your routes are protected, uncomment the line below:
      // headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const newTesti = await response.json();

      // 5. Update the UI state immediately
      setTestimonials((prev) => [newTesti, ...prev]);

      // 6. Clear the form inputs
      setTestiAuthor('');
      setTestiQuote('');
      setTestiImage(null);
      
      // Optional: Success message
      console.log("Testimonial uploaded successfully!");
    } else {
      const errorData = await response.json();
      alert(`Upload failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Network Error during upload:", error);
    alert("Could not connect to the server. Please check if the backend is running.");
  }
};
/* DELETE TESTIMONIAL */
const deleteTestimonial = async (id) => {
  if (!confirm("Delete this testimonial?")) return;
  const res = await fetch(`${API}/api/testimonials/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }
};




  /* FETCH HOME CONTENT */
  useEffect(() => {
    fetch(`${API}/api/home-content`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formatted = data.reduce((acc, item) => {
            acc[item.slot] = item.image_path
            return acc
          }, {})
          setHomeData(formatted)
        }
      })
      .catch(err => console.error("Error loading home content", err))
  }, [])

  /* UPLOAD HOME PHOTO */
  const uploadHomePagePhoto = async (e) => {
    e.preventDefault()
    if (!homeSection || !homeSlot || !homePhoto) return alert("Please select Section, Slot, and Image")

    const formData = new FormData()
    formData.append("section", homeSection)
    formData.append("slot", homeSlot)
    formData.append("image", homePhoto)

    const res = await fetch(`${API}/api/home-content`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    if (res.ok) {
      const updated = await res.json()
      alert(`${homeSlot.toUpperCase()} updated successfully!`)
      setHomeData(prev => ({ ...prev, [updated.slot]: updated.image_path }))
      setHomePhoto(null)
    } else {
      alert("Upload failed")
    }
  }

  /* UPLOAD LOGO */
  const uploadLogo = async (e) => {
    e.preventDefault()
    if (!logoFile) return alert('Please select a logo file')

    const formData = new FormData()
    formData.append('image', logoFile)
    formData.append('title', logoTitle || '')
    formData.append('tag', 'logo')
    if (selectedCollection) formData.append('collection_id', selectedCollection)

    const res = await fetch(`${API}/api/media`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    if (res.ok) {
      const newLogo = await res.json()
      setLogos(prev => [newLogo, ...prev])
      setLogoFile(null)
      setLogoTitle('')
      alert('Fashion Logo uploaded')
    } else {
      alert('Upload failed. Check backend terminal for SQL errors.')
    }
  }

  const deleteLogo = async (id) => {
    if (!confirm('Delete logo?')) return
    await fetch(`${API}/api/media/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setLogos(prev => prev.filter(l => l.id !== id))
  }

  /* UPLOAD VIDEO LOGO */
  const uploadVideoLogo = async (e) => {
    e.preventDefault()
    if (!videoLogoFile) return alert('Please select a logo file')

    const formData = new FormData()
    formData.append('image', videoLogoFile)
    formData.append('title', videoLogoTitle || '')
    formData.append('tag', 'video_logo')

    const res = await fetch(`${API}/api/media`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    if (res.ok) {
      const newLogo = await res.json()
      setVideoLogos(prev => [newLogo, ...prev])
      setVideoLogoFile(null)
      setVideoLogoTitle('')
      alert('Video Production Logo uploaded successfully!')
    } else {
      const errorText = await res.text()
      console.error("Server Error Details:", errorText)
      alert('Upload failed. Check the backend terminal for the SQL error.')
    }
  }

  const deleteVideoLogo = async (id) => {
    if (!confirm('Delete video logo?')) return
    await fetch(`${API}/api/media/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setVideoLogos(prev => prev.filter(l => l.id !== id))
  }

  /* LOAD COLLECTIONS BY CATEGORY */
  useEffect(() => {
    if (!category) return
    fetch(`${API}/api/collections?category=${category}`)
      .then(res => res.json())
      .then(data => setCollections(data))
  }, [category])

  useEffect(() => {
    const queryCategory = searchParams?.get('category')
    const querySelected = searchParams?.get('id')
    if (queryCategory) setCategory(queryCategory)
    if (querySelected) setSelectedCollection(querySelected)
  }, [searchParams])

  useEffect(() => {
    const querySelected = searchParams?.get('id')
    if (!querySelected) {
      setSelectedCollection('')
      setMedia([])
    }
  }, [category, searchParams])

  /* LOAD MEDIA */
  useEffect(() => {
    if (!selectedCollection) return
    fetch(`${API}/api/media?collection_id=${selectedCollection}`)
      .then(res => res.json())
      .then(data => setMedia(data))
  }, [selectedCollection])

  /* LOAD LOGOS */
  useEffect(() => {
    fetch(`${API}/api/media?tag=logo`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setLogos(data) })
      .catch(err => console.error('Error loading logos', err))
  }, [])

  useEffect(() => {
    fetch(`${API}/api/media?tag=video_logo`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setVideoLogos(data) })
      .catch(err => console.error('Error loading video logos', err))
  }, [])

  /* CREATE COLLECTION */
  const createCollection = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("category", category)
    formData.append("description", description)
    formData.append("date", date)
    if (cover) formData.append("cover", cover)
    if (video) formData.append("video", video)
    if (coverVideo) formData.append("coverVideo", coverVideo)

    const res = await fetch(`${API}/api/collections`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    if (res.ok) { alert("Collection created"); window.location.reload() }
    else alert("Failed")
  }

const createFeaturedCollection = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("title", featuredTitle)
  formData.append("category", category)
  formData.append("description", featuredDescription)
  formData.append("date", featuredDate)
  formData.append("section", "featured")
  
  // YouTube link for the "Watch Now" modal
  if (featuredYoutubeUrl) formData.append("youtube_url", featuredYoutubeUrl)

  // Files
  if (featuredCover) formData.append("cover", featuredCover)
  if (featuredVideo) formData.append("video", featuredVideo) // For background loop

  const res = await fetch(`${API}/api/collections`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  if (res.ok) { alert("Featured Collection created"); window.location.reload() }
  else alert("Failed")
}

/* CREATE RECENT COLLECTION */
const createRecentCollection = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("title", recentTitle)
  formData.append("category", category)
  formData.append("description", recentDescription)
  formData.append("date", recentDate)
  formData.append("section", "recent")
  
  // YouTube link for the "Watch Now" modal
  if (recentYoutubeUrl) formData.append("youtube_url", recentYoutubeUrl)

  // Files
  if (recentCover) formData.append("cover", recentCover)
  if (recentVideo) formData.append("video", recentVideo) // For background loop

  const res = await fetch(`${API}/api/collections`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  if (res.ok) { alert("Recent Collection created"); window.location.reload() }
  else alert("Failed")
}
  /* UPLOAD IMAGES */
  const uploadImages = async (e) => {
    e.preventDefault()
 
   if (!selectedCollection) return alert("Please select a collection before uploading images")
 
  
    const formData = new FormData()
    formData.append("collection_id", selectedCollection)
    formData.append("tag", tag)

  if (fashionYoutubeUrl && category === 'fashion') {
  formData.append("youtube_url", fashionYoutubeUrl)
}
    if (images && images.length > 0) {
      Array.from(images).forEach(img => formData.append("images", img))
    }
    if (blogVideo) formData.append("images", blogVideo)
    if (blogText) formData.append("content", blogText)

    const res = await fetch(`${API}/api/media/multiple`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    if (res.ok) {
      alert("Uploaded")
      fetch(`${API}/api/media?collection_id=${selectedCollection}`)
        .then(res => res.json())
        .then(data => setMedia(data))
    } else {
      alert("Upload failed")
    }
  }

  /* DELETE IMAGE */
  const deleteImage = async (id) => {
    if (!confirm("Delete image?")) return
    await fetch(`${API}/api/media/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    setMedia(media.filter(m => m.id !== id))
  }

  /* DELETE COLLECTION */
  const deleteCollection = async (id) => {
    if (!confirm("Delete collection?")) return
    await fetch(`${API}/api/collections/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    setCollections(collections.filter(c => c.id !== id))
  }
const renderCreateInputs = () => {
  if (category === "wedding" || category === "pre-wedding" || category === "fashion") {
    return (
      <>
        {/* FEATURED WORKS SECTION */}
        <div className="border border-gold p-4">
          <h3 className="text-gold mb-3">Featured Works</h3>
          <input placeholder="Title" className="w-full p-3 bg-gray-800" onChange={e => setFeaturedTitle(e.target.value)} />
          <textarea placeholder="Description" className="w-full p-3 bg-gray-800" onChange={e => setFeaturedDescription(e.target.value)} />
          <input placeholder="Year" className="w-full p-3 bg-gray-800" onChange={e => setFeaturedDate(e.target.value)} />
          
          {category === "fashion" && (
            <>
              <label>Cover Video</label>
              <input type="file" onChange={e => setFeaturedCoverVideo(e.target.files[0])} />
            </>
          )}
          
          {category !== "fashion" && (
            <>
              <label>Insert Cover Photo</label>
              <input type="file" onChange={e => setFeaturedCover(e.target.files[0])} />
              <label>Insert Background Video</label>
              <input type="file" onChange={e => setFeaturedVideo(e.target.files[0])} />
              
              {/* NEW YOUTUBE INPUT FOR FEATURED */}
              {(category === "wedding" || category === "pre-wedding") && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-amber-500 text-sm uppercase font-bold">YouTube Video Link</label>
                  <input 
                    type="text"
                    placeholder="Paste YouTube URL here..."
                    className="p-3 bg-gray-900 border border-amber-500/30 text-white focus:border-amber-500 outline-none transition-all"
                    value={featuredYoutubeUrl}
                    onChange={e => setFeaturedYoutubeUrl(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400">Powers the "Watch it now" button in the gallery hero.</p>
                </div>
              )}
            </>
          )}
          <button onClick={createFeaturedCollection} className="bg-gold text-black px-6 py-3 mt-3">Create Featured</button>
        </div>

        {/* RECENT WORKS SECTION */}
        <div className="border border-gold p-4 mt-4">
          <h3 className="text-gold mb-3">Recent Works</h3>
          <input placeholder="Title" className="w-full p-3 bg-gray-800" onChange={e => setRecentTitle(e.target.value)} />
          <textarea placeholder="Description" className="w-full p-3 bg-gray-800" onChange={e => setRecentDescription(e.target.value)} />
          <input placeholder="Year" className="w-full p-3 bg-gray-800" onChange={e => setRecentDate(e.target.value)} />
          
          {category === "fashion" && (
            <>
              <label>Cover Video</label>
              <input type="file" onChange={e => setRecentCoverVideo(e.target.files[0])} />
            </>
          )}
          
          {category !== "fashion" && (
            <>
              <label>Insert Cover Photo</label>
              <input type="file" onChange={e => setRecentCover(e.target.files[0])} />
              <label>Insert Background Video</label>
              <input type="file" onChange={e => setRecentVideo(e.target.files[0])} />

              {/* NEW YOUTUBE INPUT FOR RECENT */}
              {(category === "wedding" || category === "pre-wedding") && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-amber-500 text-sm uppercase font-bold">YouTube Video Link</label>
                  <input 
                    type="text"
                    placeholder="Paste YouTube URL here..."
                    className="p-3 bg-gray-900 border border-amber-500/30 text-white focus:border-amber-500 outline-none transition-all"
                    value={recentYoutubeUrl}
                    onChange={e => setRecentYoutubeUrl(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400">Powers the "Watch it now" button in the gallery hero.</p>
                </div>
              )}
            </>
          )}
          <button onClick={createRecentCollection} className="bg-gold text-black px-6 py-3 mt-3">Create Recent</button>
        </div>
      </>
    )
  }



    switch (category) {
      case "blogs":
        return (
          <>
            <input placeholder="Title" className="w-full p-3 bg-gray-800" onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" className="w-full p-3 bg-gray-800" onChange={e => setDescription(e.target.value)} />
            <input placeholder="Year" className="w-full p-3 bg-gray-800" onChange={e => setDate(e.target.value)} />
            <label>Blog Cover</label>
            <input type="file" onChange={e => setCover(e.target.files[0])} />
            <button onClick={createCollection} className="bg-gold text-black px-6 py-3 mt-3">Create Blog</button>
          </>
        )
      case "video-production":
        return (
          <>
            <input placeholder="Title" className="w-full p-3 bg-gray-800" onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" className="w-full p-3 bg-gray-800" onChange={e => setDescription(e.target.value)} />
            <input placeholder="Year" className="w-full p-3 bg-gray-800" onChange={e => setDate(e.target.value)} />
            <label>Thumbnail</label>
            <input type="file" accept="image/*" onChange={e => setCover(e.target.files[0])} />
            <button onClick={createCollection} className="bg-gold text-black px-6 py-3 mt-3">Create Video Project</button>
          </>
        )
      case "album-design":
        return (
          <>
            <input placeholder="Title" className="w-full p-3 bg-gray-800" onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" className="w-full p-3 bg-gray-800" onChange={e => setDescription(e.target.value)} />
            <input placeholder="Year" className="w-full p-3 bg-gray-800" onChange={e => setDate(e.target.value)} />
            <label>Album Cover</label>
            <input type="file" onChange={e => setCover(e.target.files[0])} />
            <button onClick={createCollection} className="bg-gold text-black px-6 py-3 mt-3">Create Album</button>
          </>
        )
      default:
        return null
    }
  }

  /* RENDER UPLOAD OPTIONS */
  const renderCollectionUpload = () => {
    switch (category) {
      case "wedding":
      case "pre-wedding":
        return (
          <>
            <label>Upload Collection Photos</label>
            <input type="file" multiple onChange={e => setImages(e.target.files)} />
          </>
        )
      case "fashion":
  return (
    <>
      <label>Upload Fashion Assets</label>
      <input type="file" multiple onChange={e => setImages(e.target.files)} />
      <input placeholder="Tag (reel-video / still-photo / logo)" className="w-full p-3 bg-gray-800 mt-2" onChange={e => setTag(e.target.value)} />
      
      {/* TRAILER LINK FOR VIDEOS */}
      <div className="border border-amber-500/30 p-4 mt-4 bg-black/30 rounded">
        <h4 className="text-amber-400 text-sm mb-2 uppercase tracking-widest">Watch Trailer YouTube Link (for videos)</h4>
        <input
          type="text"
          placeholder="Paste YouTube URL for these videos..."
          className="w-full p-3 bg-gray-900 border border-amber-500/30 text-white text-sm"
          onChange={e => setFashionYoutubeUrl(e.target.value)}
        />
        <p className="text-gray-500 text-xs mt-1">This link will show as Watch Trailer button on each video uploaded above.</p>
      </div>
    </>
  )
      case "video-production":
        return (
          <>
            <label>Upload Video Production Files</label>
            <input type="file" multiple accept="image/*,video/*" onChange={e => setImages(e.target.files)} />
            <input placeholder="Tag (optional: still, video, thumbnail)" className="w-full p-3 bg-gray-800 mt-2" onChange={e => setTag(e.target.value)} />
          </>
        )
      case "album-design":
        return (
          <>
            <label>Upload Album Design Images</label>
            <input type="file" multiple onChange={e => setImages(e.target.files)} />
          </>
        )
      case "blogs":
  return (
    <>
      <label>Upload Blog Images</label>
      <input type="file" multiple onChange={e => setImages(e.target.files)} />
      <label className="mt-3 block">Upload Blog Video</label>
      <input type="file" onChange={e => setBlogVideo(e.target.files[0])} />
      <textarea placeholder="Write Blog Content..." className="w-full p-3 bg-gray-800 mt-3" onChange={e => setBlogText(e.target.value)} />
      
      {/* WATCH STORY LINK */}
      <div className="border border-amber-500/30 p-4 mt-4 bg-black/30 rounded">
        <h4 className="text-amber-400 text-sm mb-2 uppercase tracking-widest">Watch Story YouTube Link</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste YouTube URL (e.g. https://youtu.be/xxxxx)"
            className="flex-1 p-3 bg-gray-900 border border-amber-500/30 text-white text-sm"
            onChange={e => setBlogYoutubeUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={async () => {
              if (!selectedCollection || !blogYoutubeUrl) return alert('Select a collection and enter a URL')
              const currentToken = localStorage.getItem('adminToken')
              const res = await fetch(`${API}/api/collections/${selectedCollection}/youtube`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtube_url: blogYoutubeUrl })
              })
              if (res.ok) alert('Watch Story link saved!')
              else alert('Failed to save link')
            }}
            className="bg-amber-500 text-black px-4 py-2 text-sm font-bold"
          >
            Save Link
          </button>
        </div>
      </div>
    </>
  )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-16">
      <h1 className="text-4xl text-gold">Admin CMS</h1>

      {/* HOME PAGE MANAGEMENT */}
      <div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl">
        <h2 className="text-2xl text-gold mb-6">Home Page Media Management</h2>
        <form onSubmit={uploadHomePagePhoto} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gold/70 text-sm uppercase">Section</label>
            <select className="w-full p-3 bg-gray-800 border border-gold/20" value={homeSection} onChange={e => { setHomeSection(e.target.value); setHomeSlot('') }}>
              <option value="">Select Home Section</option>
              <option value="hero">Hero Section</option>
              <option value="services">Our Services Section</option>
              <option value="featured">Signature Collections (Featured)</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gold/70 text-sm uppercase">Slot</label>
            <select className="w-full p-3 bg-gray-800 border border-gold/20" value={homeSlot} onChange={e => setHomeSlot(e.target.value)}>
              <option value="">Select Slot</option>
              {homeSection === 'hero' && <option value="main_hero">Main Hero Background</option>}
              {homeSection === 'services' && (
                <>
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="video-production">Video Production</option>
                  <option value="fashion">Fashion</option>
                  <option value="album-design">Album Design</option>
                  <option value="wedding_bg">Wedding Page (Header Background)</option>
                  <option value="pre-wedding_bg">Pre-Wedding Page (Header Background)</option>
                  <option value="fashion_bg">Fashion Page Header</option>
        <option value="video_production_bg">Video Production Page Header</option>
                </>
              )}
              {homeSection === 'featured' && (
                <>
                  <option value="slot1">Ethereal Elegance (Slot 1)</option>
                  <option value="slot2">Romance in Motion (Slot 2)</option>
                  <option value="slot3">Timeless Stories (Slot 3)</option>
                </>
              )}
            </select>
            {homeSlot && homeData[homeSlot] && (
              <div className="mt-2 border border-gold/20 p-2 bg-black/50">
                <p className="text-[10px] uppercase text-gray-500 mb-1">Active Image:</p>
                <img src={getMediaUrl(homeData[homeSlot])} className="h-16 w-full object-cover" alt="preview" />
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gold/70 text-sm uppercase">New Image File</label>
            <input key={homeSlot} type="file" className="p-2 bg-gray-800 border border-gold/20 cursor-pointer" onChange={e => setHomePhoto(e.target.files[0])} />
          </div>

          <button className="md:col-span-3 bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Update Home Content
          </button>
        </form>
      </div>

      {/* BRAND LOGOS */}
      <div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
        <h2 className="text-2xl text-gold mb-6 font-serif">Brand Logos (Fashion Slider)</h2>
        <form onSubmit={uploadLogo} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Title (optional)" className="w-full p-3 bg-gray-800" value={logoTitle} onChange={e => setLogoTitle(e.target.value)} />
          <input type="file" accept="image/*" className="p-2 bg-gray-800" onChange={e => setLogoFile(e.target.files[0])} />
          <button className="bg-gold text-black px-6 py-3">Upload Logo</button>
        </form>
        <div className="grid grid-cols-6 gap-4 mt-6">
          {logos.map(l => (
            <div key={l.id} className="relative flex items-center justify-center p-2 bg-black/50 border border-white/5">
              {l.image_url && <img src={getMediaUrl(l.image_url)} className="h-12 object-contain" alt={l.title || 'logo'} />}
              <button onClick={() => deleteLogo(l.id)} className="absolute top-1 right-1 bg-red-600 px-2 py-1 text-xs">Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO LOGOS */}
      <div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
        <h2 className="text-2xl text-gold mb-6 font-serif">Video Production Logos (Gallery Slider)</h2>
        <form onSubmit={uploadVideoLogo} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Logo Title (optional)" className="w-full p-3 bg-gray-800" value={videoLogoTitle} onChange={e => setVideoLogoTitle(e.target.value)} />
          <input type="file" accept="image/*" className="p-2 bg-gray-800" onChange={e => setVideoLogoFile(e.target.files[0])} />
          <button className="bg-gold text-black px-6 py-3">Upload Video Logo</button>
        </form>
        <div className="grid grid-cols-6 gap-4 mt-6">
          {videoLogos.map(l => (
            <div key={l.id} className="relative flex items-center justify-center p-2 bg-black/50 border border-white/5 group">
              {l.image_url && <img src={getMediaUrl(l.image_url)} className="h-12 object-contain" />}
              <button onClick={() => deleteVideoLogo(l.id)} className="absolute top-1 right-1 bg-red-600 px-2 py-1 text-xs opacity-0 group-hover:opacity-100">Delete</button>
            </div>
          ))}
        </div>
      </div>
{/* MANAGE FEATURED COLLECTIONS */}
<div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl">
  <h2 className="text-2xl text-gold mb-6">Homepage Signature Collections</h2>
  <p className="text-gray-400 text-sm mb-6">
    Select which collections appear in the Homepage Signature section. Maximum 3 slots available.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map(slot => (
      <div key={slot} className="border border-gold/20 p-4 bg-black/30 rounded">
        <h3 className="text-gold mb-3 text-sm uppercase">Slot {slot}</h3>
        <select
          className="w-full p-3 bg-gray-800 text-white text-sm"
          onChange={async (e) => {
            const collId = e.target.value
            if (!collId) return
            const currentToken = localStorage.getItem('adminToken')
            const res = await fetch(`${API}/api/collections/${collId}/featured`, {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ is_featured: true, featured_slot: slot })
            })
            if (res.ok) alert(`Slot ${slot} updated!`)
            else alert(`Failed: ${res.status}`)
          }}
        >
          <option value="">— Select a Collection —</option>
          {collections
            .filter(c => c.category !== 'album-design')
            .map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
        </select>
      </div>
    ))}
  </div>
  <p className="text-gray-500 text-xs mt-4">
    * Selecting a collection for a slot will automatically remove any previous collection from that slot.
  </p>
</div>
{/* WEDDING TESTIMONIALS MANAGEMENT */}
<div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
  <h2 className="text-2xl text-gold mb-6 font-serif">Wedding Testimonials</h2>
  
  <form onSubmit={uploadTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Couple Names (e.g. Sarah & Marc)" 
        className="w-full p-3 bg-gray-800 border border-white/10" 
        value={testiAuthor} 
        onChange={e => setTestiAuthor(e.target.value)} 
      />
      <textarea 
        placeholder="The Testimonial Quote..." 
        className="w-full p-3 bg-gray-800 border border-white/10 h-32" 
        value={testiQuote} 
        onChange={e => setTestiQuote(e.target.value)} 
      />
    </div>
    <div className="space-y-4">
      <label className="text-gray-400 text-sm block">Couple's Photo (Optional)</label>
      <input 
        type="file" 
        accept="image/*" 
        className="w-full p-2 bg-gray-800 border border-white/10" 
        onChange={e => setTestiImage(e.target.files[0])} 
      />
      {/* Button matches the Video Upload style */}
      <button className="w-full bg-gold text-black px-6 py-3 font-bold hover:bg-white transition-all">
        Upload Testimonial
      </button>
    </div>
  </form>

  {/* Display List */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
    {testimonials.map(t => (
      <div key={t.id} className="relative p-4 bg-black/50 border border-white/5 rounded-lg group">
        <div className="flex gap-4 items-start">
          {t.image_url && (
            <img src={getMediaUrl(t.image_url)} className="w-12 h-12 rounded-full object-cover" alt="couple" />
          )}
          <div className="flex-1">
            {/* Text color changed from amber to gold */}
            <p className="font-bold text-gold text-sm">{t.author_name}</p>
            <p className="text-xs text-gray-400 italic line-clamp-3">"{t.quote}"</p>
          </div>
        </div>
        <button 
          onClick={() => deleteTestimonial(t.id)} 
          className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>
      {/* CREATE COLLECTION */}
      <div className="border p-8">
        <h2>Create Collection</h2>
        <select className="w-full p-3 bg-gray-800" onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Page</option>
          <option value="wedding">Wedding</option>
          <option value="pre-wedding">Pre Wedding</option>
          <option value="fashion">Fashion</option>
          <option value="blogs">Blogs</option>
          <option value="video-production">Video Production</option>
          <option value="album-design">Album Design</option>
        </select>
        {renderCreateInputs()}
      </div>

      {/* COLLECTION MEDIA MANAGEMENT */}
      <div className="border p-8">
        <h2>{category} Collections</h2>
        <select className="w-full p-3 bg-gray-800 mt-3" value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
          <option value="">Select Collection</option>
          {collections.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        {/* COVER MEDIA MANAGEMENT - shows current cover and allows deletion */}
{selectedCollection && (() => {
  const selected = collections.find(c => String(c.id) === String(selectedCollection))
  if (!selected) return null
  return (
    <div className="border border-gold/20 p-4 mt-4 bg-black/30 rounded space-y-4">
      <h3 className="text-gold text-sm uppercase tracking-widest">Collection Cover Media</h3>
      
      {/* Cover Image */}
      {selected.cover_image && category !== 'fashion' && (
        <div className="flex items-center gap-4">
          <img src={getMediaUrl(selected.cover_image)} className="h-16 w-24 object-cover border border-white/10" />
          <div>
            <p className="text-xs text-gray-400 mb-1">Cover Image</p>
            <button
              onClick={async () => {
                if (!confirm('Delete cover image?')) return
                const currentToken = localStorage.getItem('adminToken')
                const res = await fetch(`${API}/api/collections/${selectedCollection}/cover`, {
                  method: 'PATCH',
                  headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ field: 'cover_image' })
                })
                if (res.ok) {
                  alert('Cover image deleted')
                  // Refresh collections list
                  fetch(`${API}/api/collections?category=${category}`)
                    .then(r => r.json()).then(data => setCollections(data))
                }
              }}
              className="bg-red-600 text-white px-3 py-1 text-xs"
            >
              Delete Cover Image
            </button>
          </div>
        </div>
      )}

      {/* Background Video */}
      {selected.video_url && category !== 'fashion' && (
        <div className="flex items-center gap-4">
          <video src={getMediaUrl(selected.video_url)} className="h-16 w-24 object-cover border border-white/10" muted />
          <div>
            <p className="text-xs text-gray-400 mb-1">Background Video</p>
            <button
              onClick={async () => {
                if (!confirm('Delete background video?')) return
                const currentToken = localStorage.getItem('adminToken')
                const res = await fetch(`${API}/api/collections/${selectedCollection}/cover`, {
                  method: 'PATCH',
                  headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ field: 'video_url' })
                })
                if (res.ok) {
                  alert('Background video deleted')
                  fetch(`${API}/api/collections?category=${category}`)
                    .then(r => r.json()).then(data => setCollections(data))
                }
              }}
              className="bg-red-600 text-white px-3 py-1 text-xs"
            >
              Delete Background Video
            </button>
          </div>
        </div>
      )}

      {/* Cover Video (fashion) */}
      {selected.cover_video && (
        <div className="flex items-center gap-4">
          <video src={getMediaUrl(selected.cover_video)} className="h-16 w-24 object-cover border border-white/10" muted />
          <div>
            <p className="text-xs text-gray-400 mb-1">Cover Video</p>
            <button
              onClick={async () => {
                if (!confirm('Delete cover video?')) return
                const currentToken = localStorage.getItem('adminToken')
                const res = await fetch(`${API}/api/collections/${selectedCollection}/cover`, {
                  method: 'PATCH',
                  headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ field: 'cover_video' })
                })
                if (res.ok) {
                  alert('Cover video deleted')
                  fetch(`${API}/api/collections?category=${category}`)
                    .then(r => r.json()).then(data => setCollections(data))
                }
              }}
              className="bg-red-600 text-white px-3 py-1 text-xs"
            >
              Delete Cover Video
            </button>
          </div>
        </div>
      )}
    </div>
  )
})()}
        <button onClick={() => deleteCollection(selectedCollection)} className="bg-red-600 px-4 py-2 mt-3">Delete Collection</button>

        <form onSubmit={uploadImages} className="mt-4">
          {renderCollectionUpload()}
          <button className="bg-gold text-black px-6 py-3 mt-3">Upload</button>
        </form>

        <div className="grid grid-cols-4 gap-4 mt-10">
          {media.map(item => (
            <div key={item.id} className="relative">
              {item.content && <p className="text-white mb-2 text-sm">{item.content}</p>}
              {item.image_url && item.image_url.endsWith('.mp4') && (
                <video src={getMediaUrl(item.image_url)} controls className="w-full h-40 object-cover" />
              )}
              {item.image_url && !item.image_url.endsWith('.mp4') && (
                <img src={getMediaUrl(item.image_url)} className="w-full h-40 object-cover" />
              )}
              <button onClick={() => deleteImage(item.id)} className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-xs">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
