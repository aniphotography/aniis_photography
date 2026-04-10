
'use client'

import { useState,useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AdminDashboard(){
const searchParams = useSearchParams()
const [homeSection, setHomeSection] = useState('')
const [homeSlot, setHomeSlot] = useState('')
const [homePhoto, setHomePhoto] = useState(null)
const [homeData, setHomeData] = useState({})



const [collections,setCollections]=useState([])
const [selectedCollection,setSelectedCollection]=useState('')
const [media,setMedia]=useState([])

const [title,setTitle]=useState('')
const [category,setCategory]=useState('')
const [description,setDescription]=useState('')
const [date,setDate]=useState('')

const [cover,setCover]=useState(null)
const [video,setVideo]=useState(null)
const [coverVideo,setCoverVideo]=useState(null)

const [images,setImages]=useState(null)
const [tag,setTag]=useState('')
const [blogVideo,setBlogVideo]=useState(null)
const [blogText,setBlogText]=useState('')

/* BRAND LOGOS (admin-managed) */
const [logos, setLogos] = useState([])
const [logoFile, setLogoFile] = useState(null)
const [logoTitle, setLogoTitle] = useState('')

// video logos
const [videoLogos, setVideoLogos] = useState([])
const [videoLogoFile, setVideoLogoFile] = useState(null)
const [videoLogoTitle, setVideoLogoTitle] = useState('')
/* FEATURED STATES */

const [featuredTitle,setFeaturedTitle]=useState('')
const [featuredDescription,setFeaturedDescription]=useState('')
const [featuredDate,setFeaturedDate]=useState('')
const [featuredCover,setFeaturedCover]=useState(null)
const [featuredVideo,setFeaturedVideo]=useState(null)
const [featuredCoverVideo,setFeaturedCoverVideo]=useState(null)

/* RECENT STATES */

const [recentTitle,setRecentTitle]=useState('')
const [recentDescription,setRecentDescription]=useState('')
const [recentDate,setRecentDate]=useState('')
const [recentCover,setRecentCover]=useState(null)
const [recentVideo,setRecentVideo]=useState(null)
const [recentCoverVideo,setRecentCoverVideo]=useState(null)

const token =
typeof window!=='undefined'
?localStorage.getItem('adminToken')
:null

/* --- FETCH EXISTING HOME CONTENT --- */
useEffect(() => {
    fetch("http://localhost:5000/api/home-content")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formatted = data.reduce((acc, item) => {
            acc[item.slot] = item.image_path;
            return acc;
          }, {});
          setHomeData(formatted);
        }
      })
      .catch(err => console.error("Error loading home content", err));
  }, []);


/* --- UPLOAD HANDLER --- */
const uploadHomePagePhoto = async (e) => {
  e.preventDefault()
  if (!homeSection || !homeSlot || !homePhoto) return alert("Please select Section, Slot, and Image")

  const formData = new FormData()
  formData.append("section", homeSection)
  formData.append("slot", homeSlot)
  formData.append("image", homePhoto)

  const res = await fetch("http://localhost:5000/api/home-content", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  if (res.ok) {
    const updated = await res.json();
    alert(`${homeSlot.toUpperCase()} updated successfully!`)
    // Update local state to refresh the preview immediately
    setHomeData(prev => ({ ...prev, [updated.slot]: updated.image_path }));
    setHomePhoto(null)
  } else {
    alert("Upload failed")
  }
}
/* LOAD COLLECTIONS */

/* --- LOGO UPLOAD (for brand slider) --- */
// const uploadLogo = async (e) => {
//   e.preventDefault()
//   if (!logoFile) return alert('Please select a logo file')

//   const formData = new FormData()
//   formData.append('title', logoTitle || '')
//   formData.append('tag', 'logo')
//   formData.append('image', logoFile)

//   const res = await fetch('http://localhost:5000/api/media', {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData
//   })

//   if (res.ok) {
//     const newLogo = await res.json()
//     setLogos(prev => [newLogo, ...prev])
//     setLogoFile(null)
//     setLogoTitle('')
//     alert('Logo uploaded')
//   } else {
//     alert('Upload failed')
//   }
// }
const uploadLogo = async (e) => {
  e.preventDefault()
  if (!logoFile) return alert('Please select a logo file')

  const formData = new FormData()
  
  // 1. MUST BE 'image' to match your createMedia controller
  formData.append('image', logoFile) 
  
  // 2. Metadata
  formData.append('title', logoTitle || '')
  formData.append('tag', 'logo')

  // 3. Logic: ONLY append collection_id if it is a valid number
  if (selectedCollection) {
    formData.append('collection_id', selectedCollection)
  }

  const res = await fetch('http://localhost:5000/api/media', {
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
  await fetch(`http://localhost:5000/api/media/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  setLogos(prev => prev.filter(l => l.id !== id))
}
// const uploadVideoLogo = async (e) => {
//     e.preventDefault()
//     if (!videoLogoFile) return alert('Please select a logo file')

//     const formData = new FormData()
//     formData.append('title', videoLogoTitle || '')
//     formData.append('page', 'video-production')
//     formData.append('section', 'collections')
//     formData.append('file', videoLogoFile)

//     const res = await fetch('http://localhost:5000/api/media/upload', {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData
//     })

//     if (res.ok) {
//       const newLogo = await res.json()
//       setVideoLogos(prev => [newLogo, ...prev])
//       setVideoLogoFile(null)
//       setVideoLogoTitle('')
//       alert('Video Production Logo uploaded')
//     } else {
//       alert('Upload failed')
//     }
//   }
const uploadVideoLogo = async (e) => {
  e.preventDefault();
  if (!videoLogoFile) return alert('Please select a logo file');

  const formData = new FormData();
  
  // 1. Ensure the key is 'image' to match your controller
  formData.append('image', videoLogoFile); 
  
  // 2. Metadata
  formData.append('title', videoLogoTitle || '');
  formData.append('tag', 'video_logo');
  
  /* ✅ THE FIX: 
     If collection_id is an integer, sending an empty string "" causes a 500 error.
     We omit it or send nothing so the DB handles it as NULL. 
  */
  // formData.append('collection_id', ''); // REMOVE OR COMMENT THIS OUT

  const res = await fetch('http://localhost:5000/api/media', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (res.ok) {
    const newLogo = await res.json();
    setVideoLogos(prev => [newLogo, ...prev]);
    setVideoLogoFile(null);
    setVideoLogoTitle('');
    alert('Video Production Logo uploaded successfully!');
  } else {
    // This will help us see the REAL error in the browser console
    const errorText = await res.text();
    console.error("Server Error Details:", errorText);
    alert('Upload failed. Check the backend terminal for the SQL error.');
  }
};
  const deleteVideoLogo = async (id) => {
    if (!confirm('Delete video logo?')) return
    await fetch(`http://localhost:5000/api/media/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setVideoLogos(prev => prev.filter(l => l.id !== id))
  }
useEffect(()=>{

  if(!category) return

  fetch(`http://localhost:5000/api/collections?category=${category}`)
    .then(res=>res.json())
    .then(data=>setCollections(data))

},[category])

useEffect(() => {
  const queryCategory = searchParams?.get('category')
  const querySelected = searchParams?.get('id')

  if (queryCategory) {
    setCategory(queryCategory)
  }
  if (querySelected) {
    setSelectedCollection(querySelected)
  }
}, [searchParams])

useEffect(() => {
  const querySelected = searchParams?.get('id')
  if (!querySelected) {
    setSelectedCollection('')
    setMedia([])
  }
}, [category, searchParams])

/* LOAD MEDIA */

useEffect(()=>{

if(!selectedCollection) return

fetch(`http://localhost:5000/api/media?collection_id=${selectedCollection}`)
.then(res=>res.json())
.then(data=>setMedia(data))

},[selectedCollection])

/* --- LOAD BRAND LOGOS FOR ADMIN --- */
useEffect(() => {
  fetch('http://localhost:5000/api/media?tag=logo')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setLogos(data)
    })
    .catch(err => console.error('Error loading logos', err))
}, [])

useEffect(() => {
  fetch('http://localhost:5000/api/media?tag=video_logo')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setVideoLogos(data)
    })
    .catch(err => console.error('Error loading video logos', err))
}, [])

{/* --- HOME PAGE MANAGEMENT SECTION --- */}
<div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
  <h2 className="text-2xl text-gold mb-6 font-serif">Home Page Visuals</h2>
  <form onSubmit={uploadHomePagePhoto} className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Section Selector */}
    <div className="flex flex-col space-y-2">
      <label className="text-gold/70 text-sm uppercase">Section</label>
      <select 
        className="w-full p-3 bg-gray-800 border border-gold/20"
        value={homeSection}
        onChange={e => { setHomeSection(e.target.value); setHomeSlot('') }}
      >
        <option value="">Select Home Section</option>
        <option value="hero">Hero Section</option>
        <option value="services">Our Services</option>
        <option value="featured">Signature Slots</option>
      </select>
    </div>

    {/* Slot Selector (Conditional) */}
    <div className="flex flex-col space-y-2">
      <label className="text-gold/70 text-sm uppercase">Slot</label>
      <select 
        className="w-full p-3 bg-gray-800 border border-gold/20" 
        value={homeSlot} 
        onChange={e => setHomeSlot(e.target.value)}
      >
        <option value="">Select Slot</option>
        {homeSection === 'hero' && <option value="main_hero">Main Hero Background</option>}
        {homeSection === 'services' && (
          <>
            <option value="wedding">Wedding</option>
            <option value="pre-wedding">Pre-Wedding</option>
            <option value="fashion">Fashion</option>
            <option value="video-production">Video Production</option>
        
          </>
        )}
        {homeSection === 'featured' && (
          <>
            <option value="slot1">Frame 1 (Left)</option>
            <option value="slot2">Frame 2 (Top Right)</option>
            <option value="slot3">Frame 3 (Bottom Right)</option>
          </>
        )}
      </select>
      
      {/* PREVIEW OF CURRENT DB IMAGE */}
      {homeSlot && homeData[homeSlot] && (
        <div className="mt-2">
          <p className="text-[10px] text-gray-500 uppercase">Current Image:</p>
          <img 
            src={`http://localhost:5000${homeData[homeSlot]}`} 
            className="h-16 w-24 object-cover border border-gold/30"
            alt="Current"
          />
        </div>
      )}
    </div>

    {/* File Input */}
    <div className="flex flex-col space-y-2">
      <label className="text-gold/70 text-sm uppercase">New Image</label>
      <input 
        type="file" 
        className="p-2 bg-gray-800 border border-gold/20 text-xs"
        onChange={e => setHomePhoto(e.target.files[0])}
      />
    </div>

    <button className="md:col-span-3 bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-all">
      Update Home Content
    </button>
  </form>
</div>

/* CREATE COLLECTION */

const createCollection=async(e)=>{

e.preventDefault()

const formData=new FormData()

formData.append("title",title)
formData.append("category",category)
formData.append("description",description)
formData.append("date",date)

// if(cover) formData.append("cover",cover)
if(cover) formData.append("cover", cover) // Use "file" to match backend upload.single('file')
if(video) formData.append("video",video)
if(coverVideo) formData.append("coverVideo",coverVideo)

const res=await fetch(
"http://localhost:5000/api/collections",
{
method:"POST",
headers:{Authorization:`Bearer ${token}`},
body:formData
})

if(res.ok){
alert("Collection created")
window.location.reload()
}else{
alert("Failed")
}

}


/* CREATE FEATURED COLLECTION */

const createFeaturedCollection=async(e)=>{

e.preventDefault()

const formData=new FormData()

formData.append("title",featuredTitle)
formData.append("category",category)
formData.append("description",featuredDescription)
formData.append("date",featuredDate)
// formData.append("type","featured")
formData.append("section","featured")
if(featuredCover) formData.append("cover",featuredCover)
if(featuredVideo) formData.append("video",featuredVideo)
if(featuredCoverVideo) formData.append("coverVideo",featuredCoverVideo)

const res=await fetch(
"http://localhost:5000/api/collections",
{
method:"POST",
headers:{Authorization:`Bearer ${token}`},
body:formData
})

if(res.ok){
alert("Featured Collection created")
window.location.reload()
}else{
alert("Failed")
}

}


/* CREATE RECENT COLLECTION */

const createRecentCollection=async(e)=>{

e.preventDefault()

const formData=new FormData()

formData.append("title",recentTitle)
formData.append("category",category)
formData.append("description",recentDescription)
formData.append("date",recentDate)
// formData.append("type","recent")
formData.append("section","recent")
if(recentCover) formData.append("cover",recentCover)
if(recentVideo) formData.append("video",recentVideo)
if(recentCoverVideo) formData.append("coverVideo",recentCoverVideo)

const res=await fetch(
"http://localhost:5000/api/collections",
{
method:"POST",
headers:{Authorization:`Bearer ${token}`},
body:formData
})

if(res.ok){
alert("Recent Collection created")
window.location.reload()
}else{
alert("Failed")
}

}


/* UPLOAD MEDIA */
const uploadImages=async(e)=>{

e.preventDefault()

if(!selectedCollection) return alert("Please select a collection before uploading images")

const formData=new FormData()

formData.append("collection_id",selectedCollection)
formData.append("tag",tag)

/* ✅ FIX 1: SAFE IMAGE HANDLING */
if(images && images.length > 0){
Array.from(images).forEach(img=>{
formData.append("images",img)
})
}

/* ✅ FIX 2: BLOG VIDEO SUPPORT */
if(blogVideo){
formData.append("images",blogVideo)
}

/* ✅ FIX 3: BLOG TEXT SUPPORT */
if(blogText){
  formData.append("content",blogText)
}
const res=await fetch(
"http://localhost:5000/api/media/multiple",
{
method:"POST",
headers:{Authorization:`Bearer ${token}`},
body:formData
})

if(res.ok){

alert("Uploaded")

fetch(`http://localhost:5000/api/media?collection_id=${selectedCollection}`)
.then(res=>res.json())
.then(data=>setMedia(data))




}else{

alert("Upload failed")

}

}



/* DELETE IMAGE */

const deleteImage=async(id)=>{

if(!confirm("Delete image?")) return

await fetch(
`http://localhost:5000/api/media/${id}`,
{
method:"DELETE",
headers:{Authorization:`Bearer ${token}`}
})

setMedia(media.filter(m=>m.id!==id))

}


/* DELETE COLLECTION */

const deleteCollection=async(id)=>{

if(!confirm("Delete collection?")) return

await fetch(
`http://localhost:5000/api/collections/${id}`,
{
method:"DELETE",
headers:{Authorization:`Bearer ${token}`}
})

setCollections(collections.filter(c=>c.id!==id))

}


/* CREATE COLLECTION INPUTS */

const renderCreateInputs=()=>{

if(
category==="wedding" ||
category==="pre-wedding" ||
category==="fashion"
){

return(

<>

{/* FEATURED WORKS */}

<div className="border border-gold p-4">

<h3 className="text-gold mb-3">Featured Works</h3>

<input
placeholder="Title"
className="w-full p-3 bg-gray-800"
onChange={e=>setFeaturedTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full p-3 bg-gray-800"
onChange={e=>setFeaturedDescription(e.target.value)}
/>

<input
placeholder="Year"
className="w-full p-3 bg-gray-800"
onChange={e=>setFeaturedDate(e.target.value)}
/>

{category==="fashion" && (
<>
<label>Cover Video</label>
<input type="file" onChange={e=>setFeaturedCoverVideo(e.target.files[0])}/>
</>
)}

{category!=="fashion" && (
<>
<label>Insert Cover Photo</label>
<input type="file" onChange={e=>setFeaturedCover(e.target.files[0])}/>
<label>Insert Background Video</label>
<input type="file" onChange={e=>setFeaturedVideo(e.target.files[0])}/>
</>
)}

<button
onClick={createFeaturedCollection}
className="bg-gold text-black px-6 py-3 mt-3">
Create Featured
</button>

</div>


{/* RECENT WORKS */}

<div className="border border-gold p-4 mt-4">

<h3 className="text-gold mb-3">Recent Works</h3>

<input
placeholder="Title"
className="w-full p-3 bg-gray-800"
onChange={e=>setRecentTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full p-3 bg-gray-800"
onChange={e=>setRecentDescription(e.target.value)}
/>

<input
placeholder="Year"
className="w-full p-3 bg-gray-800"
onChange={e=>setRecentDate(e.target.value)}
/>

{category==="fashion" && (
<>
<label>Cover Video</label>
<input type="file" onChange={e=>setRecentCoverVideo(e.target.files[0])}/>
</>
)}

{category!=="fashion" && (
<>
<label>Insert Cover Photo</label>
<input type="file" onChange={e=>setRecentCover(e.target.files[0])}/>
<label>Insert Background Video</label>
<input type="file" onChange={e=>setRecentVideo(e.target.files[0])}/>
</>
)}

<button
onClick={createRecentCollection}
className="bg-gold text-black px-6 py-3 mt-3">
Create Recent
</button>

</div>

</>

)

}
switch(category){

case "blogs":

return(
<>

<input
placeholder="Title"
className="w-full p-3 bg-gray-800"
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full p-3 bg-gray-800"
onChange={e=>setDescription(e.target.value)}
/>

<input
placeholder="Year"
className="w-full p-3 bg-gray-800"
onChange={e=>setDate(e.target.value)}
/>

<label>Blog Cover</label>
<input type="file" onChange={e=>setCover(e.target.files[0])}/>

<button
onClick={createCollection}
className="bg-gold text-black px-6 py-3 mt-3"
>
Create Blog
</button>

</>
)


case "video-production":

return(
<>

<input
placeholder="Title"
className="w-full p-3 bg-gray-800"
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full p-3 bg-gray-800"
onChange={e=>setDescription(e.target.value)}
/>

<input
placeholder="Year"
className="w-full p-3 bg-gray-800"
onChange={e=>setDate(e.target.value)}
/>

<label>Thumbnail</label>
<input type="file" accept="image/*" onChange={e=>setCover(e.target.files[0])}/>

<button
onClick={createCollection}
className="bg-gold text-black px-6 py-3 mt-3"
>
Create Video Project
</button>

</>
)


case "album-design":

return(
<>

<input
placeholder="Title"
className="w-full p-3 bg-gray-800"
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full p-3 bg-gray-800"
onChange={e=>setDescription(e.target.value)}
/>

<input
placeholder="Year"
className="w-full p-3 bg-gray-800"
onChange={e=>setDate(e.target.value)}
/>

<label>Album Cover</label>
<input type="file" onChange={e=>setCover(e.target.files[0])}/>

<button
onClick={createCollection}
className="bg-gold text-black px-6 py-3 mt-3"
>
Create Album
</button>

</>
)

default:
return null

}

}


/* MEDIA UPLOAD OPTIONS */

const renderCollectionUpload=()=>{

switch(category){

case "wedding":
case "pre-wedding":
return(
<>
<label>Upload Collection Photos</label>
<input type="file" multiple onChange={e=>setImages(e.target.files)}/>
</>
)

case "fashion":
return(
<>
<label>Upload Fashion Assets</label>
<input type="file" multiple onChange={e=>setImages(e.target.files)}/>
<input
placeholder="Tag (reel-video / still-photo / logo)"
className="w-full p-3 bg-gray-800 mt-2"
onChange={e=>setTag(e.target.value)}
/>
</>
)

case "video-production":
return(
<>
<label>Upload Video Production Files</label>
<input type="file" multiple accept="image/*,video/*" onChange={e=>setImages(e.target.files)}/>
<input
placeholder="Tag (optional: still, video, thumbnail)"
className="w-full p-3 bg-gray-800 mt-2"
onChange={e=>setTag(e.target.value)}
/>
</>
)

case "album-design":
return(
<>
<label>Upload Album Design Images</label>
<input type="file" multiple onChange={e=>setImages(e.target.files)}/>
</>
)

case "blogs":

return(
<>
<label>Upload Blog Images</label>
<input type="file" multiple onChange={e=>setImages(e.target.files)}/>

<label className="mt-3 block">Upload Blog Video</label>
<input type="file" onChange={e=>setBlogVideo(e.target.files[0])}/>

<textarea
placeholder="Write Blog Content..."
className="w-full p-3 bg-gray-800 mt-3"
onChange={e=>setBlogText(e.target.value)}
/>
</>
)

default:
return null

}

}


return(

<div className="min-h-screen bg-black text-white p-10 space-y-16">

<h1 className="text-4xl text-gold">Admin CMS</h1>

{/* --- HOME PAGE MANAGEMENT --- */}
      <div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl">
        <h2 className="text-2xl text-gold mb-6">Home Page Media Management</h2>
        <form onSubmit={uploadHomePagePhoto} className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col space-y-2">
            <label className="text-gold/70 text-sm uppercase">Section</label>
            <select
              className="w-full p-3 bg-gray-800 border border-gold/20"
              value={homeSection}
              onChange={e => { setHomeSection(e.target.value); setHomeSlot('') }}
            >
              <option value="">Select Home Section</option>
              <option value="hero">Hero Section</option>
              <option value="services">Our Services Section</option>
              <option value="featured">Signature Collections (Featured)</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gold/70 text-sm uppercase">Slot</label>
            <select 
               className="w-full p-3 bg-gray-800 border border-gold/20" 
               value={homeSlot} 
               onChange={e => setHomeSlot(e.target.value)}
            >
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

            {/* PREVIEW BOX: This shows what is currently in that slot */}
            {homeSlot && homeData[homeSlot] && (
                <div className="mt-2 border border-gold/20 p-2 bg-black/50">
                    <p className="text-[10px] uppercase text-gray-500 mb-1">Active Image:</p>
                    <img 
                        src={`http://localhost:5000${homeData[homeSlot]}`} 
                        className="h-16 w-full object-cover" 
                        alt="preview"
                    />
                </div>
            )}
          </div>

       <div className="flex flex-col space-y-2">
  <label className="text-gold/70 text-sm uppercase">New Image File</label>
  <input
    /* Adding this key ensures that whenever the slot changes, 
      the input is destroyed and recreated, clearing the "Choose File" text.
    */
    key={homeSlot} 
    type="file"
    className="p-2 bg-gray-800 border border-gold/20 cursor-pointer"
    onChange={e => setHomePhoto(e.target.files[0])}
  />
</div>

          <button className="md:col-span-3 bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Update Home Content
          </button>
        </form>
      </div>

  {/* BRAND LOGOS MANAGEMENT */}

  <div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
    <h2 className="text-2xl text-gold mb-6 font-serif">Brand Logos (Fashion Slider)</h2>

    <form onSubmit={uploadLogo} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Title (optional)"
        className="w-full p-3 bg-gray-800"
        value={logoTitle}
        onChange={e => setLogoTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="p-2 bg-gray-800"
        onChange={e => setLogoFile(e.target.files[0])}
      />

      <button className="bg-gold text-black px-6 py-3">Upload Logo</button>
    </form>

    <div className="grid grid-cols-6 gap-4 mt-6">
      {logos.map(l => (
        <div key={l.id} className="relative flex items-center justify-center p-2 bg-black/50 border border-white/5">
          {l.image_url && (
            <img src={`http://localhost:5000${l.image_url}`} className="h-12 object-contain" alt={l.title || 'logo'} />
          )}
          <button onClick={() => deleteLogo(l.id)} className="absolute top-1 right-1 bg-red-600 px-2 py-1 text-xs">Delete</button>
        </div>
      ))}
    </div>
  </div>

{/* ✅ VIDEO PRODUCTION LOGOS */}
<div className="border-2 border-gold/30 p-8 bg-gray-900/30 rounded-xl shadow-2xl mb-10">
  <h2 className="text-2xl text-gold mb-6 font-serif">
    Video Production Logos (Gallery Slider)
  </h2>

  <form onSubmit={uploadVideoLogo} className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    <input
      type="text"
      placeholder="Logo Title (optional)"
      className="w-full p-3 bg-gray-800"
      value={videoLogoTitle}
      onChange={e => setVideoLogoTitle(e.target.value)}
    />

    <input
      type="file"
      accept="image/*"
      className="p-2 bg-gray-800"
      onChange={e => setVideoLogoFile(e.target.files[0])}
    />

    <button className="bg-gold text-black px-6 py-3">
      Upload Video Logo
    </button>

  </form>

  <div className="grid grid-cols-6 gap-4 mt-6">
    {videoLogos.map(l => (
      <div key={l.id} className="relative flex items-center justify-center p-2 bg-black/50 border border-white/5 group">
        {l.image_url && (
          <img
            src={`http://localhost:5000${l.image_url}`}
            className="h-12 object-contain"
          />
        )}

        <button
          onClick={() => deleteVideoLogo(l.id)}
          className="absolute top-1 right-1 bg-red-600 px-2 py-1 text-xs opacity-0 group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>
  {/* CREATE COLLECTION */}

<div className="border p-8">

<h2>Create Collection</h2>

<select
className="w-full p-3 bg-gray-800"
onChange={e=>setCategory(e.target.value)}
required
>

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

<select
className="w-full p-3 bg-gray-800 mt-3"
value={selectedCollection}
onChange={e=>setSelectedCollection(e.target.value)}
>

<option value="">Select Collection</option>

{collections.map(c=>(
<option key={c.id} value={c.id}>{c.title}</option>
))}

</select>

<button
onClick={()=>deleteCollection(selectedCollection)}
className="bg-red-600 px-4 py-2 mt-3"
>
Delete Collection
</button>


<form onSubmit={uploadImages} className="mt-4">

{renderCollectionUpload()}

<button className="bg-gold text-black px-6 py-3 mt-3">
Upload
</button>

</form>

<div className="grid grid-cols-4 gap-4 mt-10">

{media.map(item => (

  <div key={item.id} className="relative">

    {/* TEXT */}
    {item.content && (
      <p className="text-white mb-2 text-sm">{item.content}</p>
    )}

    {/* VIDEO */}
    {item.image_url && item.image_url.endsWith('.mp4') && (
      <video
        src={`http://localhost:5000${item.image_url}`}
        controls
        className="w-full h-40 object-cover"
      />
    )}

    {/* IMAGE */}
    {item.image_url && !item.image_url.endsWith('.mp4') && (
      <img
        src={`http://localhost:5000${item.image_url}`}
        className="w-full h-40 object-cover"
      />
    )}

    {/* DELETE BUTTON */}
    <button
      onClick={()=>deleteImage(item.id)}
      className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-xs"
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