

// 'use client'
// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { getMediaUrl } from '@/lib/utils'

// export default function AlbumGalleryPage() {
//   const params = useParams()
//   const albumId = params.id

//   const [selectedImage, setSelectedImage] = useState(null)
//   const [album, setAlbum] = useState(null)

//   useEffect(() => {
//     fetch(`${API}/api/collections/${albumId}`)
//       .then(res => res.json())
//       .then(data => {
//         setAlbum({
//           ...data.collection,
//           images: data.images
//         })
//       })
//   }, [albumId])

//   if (!album) return null

//   // --- NAVIGATION LOGIC FIXED ---
//   const showNextImage = (e) => {
//     e.stopPropagation();
//     // Reference album.images instead of just images
//     const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
//     const nextIndex = (currentIndex + 1) % album.images.length;
//     setSelectedImage(album.images[nextIndex]);
//   };

//   const showPrevImage = (e) => {
//     e.stopPropagation();
//     // Reference album.images instead of just images
//     const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
//     const prevIndex = (currentIndex - 1 + album.images.length) % album.images.length;
//     setSelectedImage(album.images[prevIndex]);
//   };

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* HERO SECTION WITH VIDEO */}
//       <section className="relative h-[70vh] w-full overflow-hidden bg-black">
//         <div className="absolute inset-0 w-full h-full">
//           <video autoPlay loop muted playsInline
//             className="w-full h-full object-cover opacity-50"
//           >
//             <source
//               src={getMediaUrl(album.video_url)}
//               type="video/mp4"
//             />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />
//         </div>

//         <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
//           <div className="border-l-4 border-[#d4af37] pl-6 mb-4">
//             <p className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-2">
//               {album.date}
//             </p>
//             <h1 className="text-5xl md:text-7xl font-display mb-4 tracking-tight">
//               {album.title}
//             </h1>
//             <div className="flex items-center gap-4 text-gray-300 mb-6">
//               <span className="text-xs tracking-widest uppercase">
//                 {album.images.length} Photos
//               </span>
//               <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
//               <span className="text-xs tracking-widest uppercase italic">
//                 High-Resolution Collection
//               </span>
//             </div>
//             <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
//               {album.description}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* MASONRY GRID */}
//       <section className="px-6 py-20 bg-[#1a1a1a]">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-1">
//             {album.images.map((image, index) => {
//               const isLarge = index % 5 === 0
//               const isWide = index % 5 === 3

//               return (
//                 <div
//                   key={image.id}
//                   className={`group relative overflow-hidden cursor-pointer border border-white/5
//                     ${isLarge ? 'md:row-span-2' : ''}
//                     ${isWide ? 'md:col-span-2' : ''}
//                   `}
//                   onClick={() => setSelectedImage(image)}
//                 >
//                   <img
//                     src={getMediaUrl(image.image_url)}
//                     alt={image.caption}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />

//                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <p className="text-[#d4af37] font-display text-lg text-center tracking-widest uppercase px-4">
//                       {image.caption}
//                     </p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* LIGHTBOX */}
//    {selectedImage && (
//   <div
//     className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
//     onClick={() => setSelectedImage(null)}
//   >
//     {/* Close Button Row */}
//     <div className="w-full h-16 flex items-center justify-end px-8 md:px-16 shrink-0">
//       <button
//         onClick={() => setSelectedImage(null)}
//         className="text-[#d4af37] hover:text-white transition-colors text-2xl z-[110] p-4"
//       >
//         ✕
//       </button>
//     </div>

//     <div className="flex-grow relative flex items-center justify-center p-2 pt-0">
//       {/* Main Image Container */}
//       <div
//         className="relative max-w-7xl w-full flex flex-col items-center"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Navigation: Previous Button (Invisible click area with a prominent circular arrow) */}
// {/* Navigation: Previous Button */}
// <button
//   onClick={showPrevImage}
//   className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] transition-all group pl-4 md:pl-10"
// >
//   <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
//     {/* translate-y-[4px] pushes the glyph DOWN into the center */}
//     <span className="transform translate-y-[-8px] leading-none pr-1">
//       ‹
//     </span>
//   </span>
// </button>

// {/* Navigation: Next Button */}
// <button
//   onClick={showNextImage}
//   className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] transition-all group pr-4 md:pr-10"
// >
//   <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
//     {/* translate-y-[4px] pushes the glyph DOWN into the center */}
//     <span className="transform translate-y-[-8px] leading-none pl-1">
//       ›
//     </span>
//   </span>
// </button>

//         {/* --- ACTUAL IMAGE --- */}
//         <img
//           src={getMediaUrl(selectedImage.image_url)}
//           className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
//           alt="Gallery View"
//         />
        
//         <div className="mt-4 text-center">
//           {selectedImage.caption && (
//             <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
//               {selectedImage.caption}
//             </p>
//           )}
          
//           <p className="text-gray-500 text-[10px] tracking-widest">
//             {album.images.findIndex(img => img.id === selectedImage.id) + 1} / {album.images.length}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//       <Footer />
//     </main>
//   )
// }
// 'use client'
// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { getMediaUrl } from '@/lib/utils'

// export default function AlbumGalleryPage() {
//   const params = useParams()
//   const albumId = params.id

//   const [selectedImage, setSelectedImage] = useState(null)
//   const [album, setAlbum] = useState(null)
//   const [showVideo, setShowVideo] = useState(false); // NEW: Video Modal State

//   useEffect(() => {
//     fetch(`${API}/api/collections/${albumId}`)
//       .then(res => res.json())
//       .then(data => {
//         setAlbum({
//           ...data.collection,
//           images: data.images
//         })
//       })
//   }, [albumId])

//   // Helper to format YouTube link for the modal
// const getYoutubeEmbedUrl = (url) => {
//   if (!url) return null;
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   const videoId = (match && match[2].length === 11) ? match[2] : null;
  
//   if (!videoId) return null;
//   // Added mute=1 because many browsers block autoplaying videos with sound
//   return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
// };
// // This specifically looks at your new youtube_url column
// const embedUrl = album ? getYoutubeEmbedUrl(album.youtube_url) : null;
//   if (!album) return null

//   const showNextImage = (e) => {
//     e.stopPropagation();
//     const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
//     const nextIndex = (currentIndex + 1) % album.images.length;
//     setSelectedImage(album.images[nextIndex]);
//   };

//   const showPrevImage = (e) => {
//     e.stopPropagation();
//     const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
//     const prevIndex = (currentIndex - 1 + album.images.length) % album.images.length;
//     setSelectedImage(album.images[prevIndex]);
//   };

//   return (
//     <main className="min-h-screen bg-[#1a1a1a] text-white">
//       <Navbar />

//       {/* HERO SECTION WITH VIDEO OVERLAY LOGIC */}
//       {/* ===== HERO SECTION WITH BACKGROUND VIDEO & BUTTON ===== */}
// <section className="relative h-[70vh] w-full overflow-hidden bg-black">
//   <div className="absolute inset-0 w-full h-full">
//     <video 
//       autoPlay 
//       loop 
//       muted 
//       playsInline
//       className="w-full h-full object-cover opacity-50"
//     >
//       {/* IMPORTANT: This source still needs a direct MP4 link. 
//           If album.video_url is now a YouTube link, this background video will not play. 
//           This only works if you keep a separate MP4 file for the background.
//       */}
//       <source
//         src={getMediaUrl(album.video_url)}
//         type="video/mp4"
//       />
//     </video>
//     <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />
//   </div>

//   <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
//     <div className="border-l-4 border-[#d4af37] pl-6 mb-4">
//       <p className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-2">
//         {album.date}
//       </p>
//       <h1 className="text-5xl md:text-7xl font-display mb-4 tracking-tight">
//         {album.title}
//       </h1>
      
//       <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
//         <span className="text-xs tracking-widest uppercase">
//           {album.images?.length} Photos
//         </span>
//         <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
//         <span className="text-xs tracking-widest uppercase italic">
//           High-Resolution Collection
//         </span>

//         {/* THE BUTTON ADDED TO YOUR EXACT DESIGN */}
//         {/* THE BUTTON */}
// {album.youtube_url && (
//   <button 
//     onClick={() => setShowVideo(true)}
//     className="group flex items-center gap-3 bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-[#d4af37] hover:text-white transition-all duration-300 shadow-xl ml-2"
//   >
//     <span className="text-xs uppercase tracking-wider">Watch it now</span>
//     <div className="bg-red-600 rounded-full p-1 group-hover:scale-110 transition-transform">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-3 h-3">
//         <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
//       </svg>
//     </div>
//   </button>
// )}
      
//       </div>

//       <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
//         {album.description}
//       </p>
//     </div>
//   </div>
// </section>


//       {/* NEW: YOUTUBE FILM MODAL */}
//      {showVideo && (
//       <div 
//         className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
//         onClick={() => setShowVideo(false)} // Close if clicking background
//       >
//         <div 
//           className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl"
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
//         >
//           <button 
//             onClick={() => setShowVideo(false)}
//             className="absolute -top-12 right-0 text-white hover:text-[#d4af37] text-2xl"
//           >
//             Close ✕
//           </button>
          
//           {embedUrl ? (
//             <iframe
//               className="w-full h-full"
//               src={embedUrl}
//               title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               Invalid Video URL: {album.video_url}
//             </div>
//           )}
//         </div>
//       </div>
//     )}
    
'use client'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'

export default function AlbumGalleryPage() {
  const params = useParams()
  const albumId = params.id

  const [selectedImage, setSelectedImage] = useState(null)
  const [album, setAlbum] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/collections/${albumId}`)
      .then(res => res.json())
      .then(data => {
        setAlbum({
          ...data.collection,
          images: data.images
        })
      })
  }, [albumId])

  // Helper to format YouTube link for the modal
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) return null;
    // Autoplay enabled, muted by default to bypass browser blocks
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
  };

  // --- LOGIC SEPARATION ---
  // Background: Direct Cloudinary MP4
  const backgroundVideoUrl = album ? getMediaUrl(album.video_url) : null;
  // Modal: Formatted YouTube Link
  const embedUrl = album ? getYoutubeEmbedUrl(album.youtube_url) : null;

  if (!album) return null

  const showNextImage = (e) => {
    e.stopPropagation();
    const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % album.images.length;
    setSelectedImage(album.images[nextIndex]);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    const currentIndex = album.images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + album.images.length) % album.images.length;
    setSelectedImage(album.images[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* HERO SECTION WITH BACKGROUND VIDEO */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <div className="border-l-4 border-[#d4af37] pl-6 mb-4">
            <p className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-2">
              {album.date}
            </p>
            <h1 className="text-5xl md:text-7xl font-display mb-4 tracking-tight">
              {album.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
              <span className="text-xs tracking-widest uppercase">
                {album.images?.length} Photos
              </span>
              <span className="w-8 h-[1px] bg-[#d4af37]/50"></span>
              <span className="text-xs tracking-widest uppercase italic">
                High-Resolution Collection
              </span>

              {/* WATCH NOW BUTTON (Only shows if youtube_url exists) */}
              {album.youtube_url && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="group flex items-center gap-3 bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-[#d4af37] hover:text-white transition-all duration-300 shadow-xl ml-2"
                >
                  <span className="text-xs uppercase tracking-wider">Watch it now</span>
                  <div className="bg-red-600 rounded-full p-1 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-3 h-3">
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            <p className="text-gray-400 font-lato max-w-2xl leading-relaxed">
              {album.description}
            </p>
          </div>
        </div>
      </section>

      {/* YOUTUBE FILM MODAL */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#d4af37] text-2xl transition-colors"
            >
               ✕
            </button>

            {embedUrl ? (
              <iframe
                key={embedUrl}
                className="w-full h-full"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4 border border-white/10">
                <p>YouTube Link not found or invalid</p>
                <code className="text-xs text-[#d4af37]">{album.youtube_url}</code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MASONRY GRID & LIGHTBOX ... remains exactly as you had it */}
     
      {/* MASONRY GRID (Your existing grid) */}
      <section className="px-6 py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-1">
            {album.images.map((image, index) => {
              const isLarge = index % 5 === 0
              const isWide = index % 5 === 3

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden cursor-pointer border border-white/5
                    ${isLarge ? 'md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                  `}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={getMediaUrl(image.image_url)}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className="text-[#d4af37] font-display text-lg text-center tracking-widest uppercase px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
    {selectedImage && (
  <div
    className="fixed inset-0 bg-black/98 backdrop-blur-md z-[100] flex flex-col transition-opacity duration-300"
    onClick={() => setSelectedImage(null)}
  >
     {/* Close Button Row */}
    <div className="w-full h-16 flex items-center justify-end px-8 md:px-16 shrink-0">
      <button
        onClick={() => setSelectedImage(null)}
        className="text-[#d4af37] hover:text-white transition-colors text-2xl z-[110] p-4"
      >
        ✕
      </button>
    </div>
     <div className="flex-grow relative flex items-center justify-center p-2 pt-0">   
          {/* Main Image Container */}
      <div
        className="relative max-w-7xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation: Previous Button (Invisible click area with a prominent circular arrow) */}
{/* Navigation: Previous Button */}
<button
  onClick={showPrevImage}
  className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start z-[130] transition-all group pl-4 md:pl-10"
>
  <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
    {/* translate-y-[4px] pushes the glyph DOWN into the center */}
    <span className="transform translate-y-[-8px] leading-none pr-1">
      ‹
    </span>
  </span>
</button>

 {/* Navigation: Next Button */}
 <button
   onClick={showNextImage}
  className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end z-[130] transition-all group pr-4 md:pr-10"
>
  <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black/10 group-hover:bg-black/50 rounded-full text-[#d4af37] text-6xl md:text-7xl transition-all duration-300 transform group-hover:scale-110 select-none overflow-hidden">
    {/* translate-y-[4px] pushes the glyph DOWN into the center */}
    <span className="transform translate-y-[-8px] leading-none pl-1">
      ›
    </span>
  </span>
</button>

         {/* --- ACTUAL IMAGE --- */}
        <img
          src={getMediaUrl(selectedImage.image_url)}
          className="w-full h-auto max-h-[85vh] object-contain shadow-2xl transition-all duration-300"
          alt="Gallery View"
        />
        
         <div className="mt-4 text-center">
           {selectedImage.caption && (
            <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs font-medium mb-1">
              {selectedImage.caption}
            </p>
          )}
          
          <p className="text-gray-500 text-[10px] tracking-widest">
             {album.images.findIndex(img => img.id === selectedImage.id) + 1} / {album.images.length}
           </p>
         </div>
      </div>
     </div>
  </div>
)}

      <Footer />
    </main>
  )
}