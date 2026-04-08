'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function VideoProductionDetailPage() {

	const params = useParams()
	const router = useRouter()

	const id = params.id

	const [project, setProject] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:5000/api/collections/${id}`)
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
							<div key={i} className="aspect-[2/3] bg-[#111] overflow-hidden border border-white/5 shadow-2xl">
								<video controls muted loop playsInline className="w-full h-full object-cover">
									<source src={`http://localhost:5000${video.image_url}`} type="video/mp4" />
								</video>
							</div>
						))}

						{Array.from({ length: 3 - videos.length }).map((_, index) => (
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
									src={`http://localhost:5000${img.image_url}`}
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

			<Footer />
		</main>
	)
}

function AddCard({ onClick }) {
	return (
		<div
			onClick={onClick}
			className="flex items-center justify-center aspect-[2/3] border-2 border-dashed border-gold rounded-[2rem] cursor-pointer hover:bg-white/5 transition"
		>
			<span className="text-5xl text-gold">+</span>
		</div>
	)
}

