'use client'

import { useState,useEffect } from 'react'

export default function AdminDashboard(){

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


/* LOAD COLLECTIONS */

useEffect(()=>{

if(!category) return

if(category==="gallery"){

fetch("http://localhost:5000/api/collections")
.then(res=>res.json())
.then(data=>{

const filtered=data.filter(
c =>
c.category==="wedding" ||
c.category==="pre-wedding" ||
c.category==="fashion"
)

setCollections(filtered)

})

return
}

fetch(`http://localhost:5000/api/collections?category=${category}`)
.then(res=>res.json())
.then(data=>setCollections(data))

},[category])


/* LOAD MEDIA */

useEffect(()=>{

if(!selectedCollection) return

fetch(`http://localhost:5000/api/media?collection_id=${selectedCollection}`)
.then(res=>res.json())
.then(data=>setMedia(data))

},[selectedCollection])


/* CREATE COLLECTION */

const createCollection=async(e)=>{

e.preventDefault()

const formData=new FormData()

formData.append("title",title)
formData.append("category",category)
formData.append("description",description)
formData.append("date",date)

if(cover) formData.append("cover",cover)
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
formData.append("type","featured")

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
formData.append("type","recent")

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

<label>Main Video</label>
<input type="file" onChange={e=>setVideo(e.target.files[0])}/>

<label>Thumbnail</label>
<input type="file" onChange={e=>setCover(e.target.files[0])}/>

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

case "gallery":
return(
<>
<label>Upload Gallery Images</label>
<input type="file" multiple onChange={e=>setImages(e.target.files)}/>
<input
placeholder="Tag (wedding / pre-wedding / fashion)"
className="w-full p-3 bg-gray-800 mt-2"
onChange={e=>setTag(e.target.value)}
/>
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
<option value="gallery">Gallery</option>
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

{media.map(img=>(
<div key={img.id} className="relative">

<img
src={`http://localhost:5000${img.image_url}`}
className="w-full h-40 object-cover"
/>

<button
onClick={()=>deleteImage(img.id)}
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