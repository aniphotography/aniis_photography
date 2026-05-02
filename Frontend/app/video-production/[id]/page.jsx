'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getMediaUrl } from '@/lib/utils'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function VideoProductionDetailPage() {
const [trailerUrl, setTrailerUrl] = useState("");
const [videoYoutubeUrl, setVideoYoutubeUrl] = useState("");
const getEmbedUrl = (url) => {
  if (!url) return "";
  
  // This regex handles: watch?v=, shorts/, and youtu.be/
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[1].length === 11) ? match[1] : null;

  // Converting to /embed/ allows BOTH Shorts and Videos to play in your modal
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
};
	const params = useParams()
	const router = useRouter()

	const id = params.id

	const [project, setProject] = useState(null)

	useEffect(() => {
		fetch(`${API}/api/collections/${id}`)
			.then(res => res.json())
			.then(data => setProject(data))
			.catch(err => console.error(err))
	}, [id])

	const handleAddClick = (type) => {
		const token = localStorage.getItem('adminToken')

		if (!token) {
			router.push('/admin/login')
		} else {
			router.push(`/admin/dashboard?category=video-production&id=${id}&type=${type}`)
		}
	}

	if (!project) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<h1 className="text-white font-display text-2xl">
					Loading Project...
				</h1>
			</div>
		)
	}
const allMedia = project.images || []
const videos = allMedia.filter(m =>
	m.image_url?.match(/\.(mp4|mov|avi)$/i)
)

const images = allMedia.filter(m =>
	!m.image_url?.match(/\.(mp4|mov|avi)$/i)
)

	return (
		<main className="min-h-screen bg-[#0a0a0a] text-white">
			<Navbar />

			{/* HEADER */}
			<section className="pt-40 pb-20 text-center px-6">
				<Link
					href="/video-production"
					className="text-gold text-xs uppercase tracking-[0.4em] mb-4 inline-block"
				>
					← Back to Collections
				</Link>

				<h1 className="text-5xl md:text-7xl font-display mt-4">
					<span className="text-gold italic">{project.title}</span>
				</h1>
			</section>

			{/* VIDEOS */}
			<section className="py-10 px-6">
				<div className="max-w-7xl mx-auto">

					<div className="flex items-center gap-4 mb-12">
						<span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
							Video Editorial
						</span>
						<div className="h-[1px] flex-1 bg-white/10"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

					{videos.map((video, i) => (
						<div
							key={video.id || i}
							className="aspect-[2/3] bg-[#111] overflow-hidden border border-white/5 shadow-2xl relative cursor-pointer group"
							onClick={() => {
							if (video.youtube_url) setTrailerUrl(video.youtube_url)
						}}
							onMouseEnter={e => {
							const v = e.currentTarget.querySelector('video')
							if (v) v.play().catch(() => {})
						}}
							onMouseLeave={e => {
							const v = e.currentTarget.querySelector('video')
							if (v) { v.pause(); v.currentTime = 0 }
						}}
						>
							<video
								muted
								loop
								playsInline
								preload="metadata"
								className="w-full h-full object-cover pointer-events-none"
							>
								<source src={getMediaUrl(video.image_url)} type="video/mp4" />
							</video>
							<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-center pb-6">
								{video.youtube_url && (
									<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-5 py-2 bg-black/80 border border-gold text-gold text-xs uppercase tracking-widest">
										<svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z" />
										</svg>
										Watch Trailer
									</span>
								)}
							</div>
						</div>
					))}

					{Array.from({ length: Math.max(0, 3 - videos.length) }).map((_, index) => (
						<AddCard
							key={`video-add-${index}`}
							onClick={() => handleAddClick('video')}
						/>
					))}

					</div>

				</div>
			</section>

			{/* IMAGES */}
			<section className="py-24 px-6 bg-[#080808]">
				<div className="max-w-7xl mx-auto">

					<div className="flex items-center gap-4 mb-12">
						<span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
							Stills Gallery
						</span>
						<div className="h-[1px] flex-1 bg-white/10"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

						{images.map((img, i) => (
							<div key={i} className="aspect-[2/3] overflow-hidden group">
								<img
									src={getMediaUrl(img.image_url)}
									alt=""
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>
						))}

						{Array.from({ length: 3 - images.length }).map((_, index) => (
							<AddCard
								key={`img-add-${index}`}
								onClick={() => handleAddClick('image')}
							/>
						))}

					</div>

				</div>
			</section>
{trailerUrl && (
  <div
    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6"
    onClick={() => setTrailerUrl(null)}
  >
    <button
      onClick={() => setTrailerUrl(null)}
      className="absolute top-6 right-8 text-gold text-3xl hover:text-white transition"
    >
      ✕
    </button>
    
    {/* 
      Pro Tip: If you want Shorts to look "vertical", 
      you can change "aspect-video" to "aspect-[9/16] max-w-sm" 
      if trailerUrl.includes('shorts') 
    */}
    <div
      className={`w-full max-w-4xl ${trailerUrl.includes('shorts') ? 'aspect-[9/16] max-w-sm' : 'aspect-video'}`}
      onClick={e => e.stopPropagation()}
    >
      <iframe
        src={getEmbedUrl(trailerUrl)}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
    <p className="text-gray-500 text-[10px] mt-6 uppercase tracking-[0.3em]">Click outside to close</p>
  </div>
)}
			<Footer />
		</main>
	)
}



function AddCard({ onClick, label = "Add Content" }) {
    return (
        <div
            onClick={onClick}
            className="group relative flex items-center justify-center aspect-[2/3] border border-white/10 bg-[#111] cursor-pointer overflow-hidden transition-all duration-300 hover:border-gold/40"
        >
            <span className="text-5xl text-gold/20 group-hover:text-gold/50 group-hover:scale-110 transition-all duration-500 font-light">
                +
            </span>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-center pb-6">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-5 py-2 bg-black/80 border border-gold text-gold text-[10px] uppercase tracking-widest">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    {label}
                </span>
            </div>
        </div>
    )
}