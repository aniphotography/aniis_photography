'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react';
export default function AboutPage() {
  const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};
  const team = [
    {
      id: 1,
      name: 'Alexandra Sterling',
      role: 'Founder & Lead Photographer',
      bio: 'With over 12 years of experience, Alexandra specializes in capturing emotional moments with artistic vision. She has won numerous international photography awards.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      expertise: ['Wedding Photography', 'Cinematic Direction', 'Creative Vision']
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Senior Photographer',
      bio: 'Marcus brings 8 years of professional expertise in wedding and commercial photography. His technical precision and creative eye ensure every shot is perfection.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      expertise: ['Technical Precision', 'Commercial Work', 'Lighting']
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Creative Director & Editor',
      bio: 'Elena transforms raw footage into masterpieces. With expertise in color grading and editing, she ensures every image tells a compelling story.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      expertise: ['Post-Production', 'Color Grading', 'Video Editing']
    },
    {
      id: 4,
      name: 'James Patterson',
      role: 'Videographer & Drone Specialist',
      bio: 'James captures stunning aerial perspectives and cinematic videos. His drone work and videography add a unique dimension to every project.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      expertise: ['Drone Photography', 'Cinematic Video', 'Aerial Work']
    },
  ]

  const values = [
    {
      title: 'Artistry',
      description: 'We believe photography is art. Every frame is carefully composed to tell your story with elegance and emotion.',
      icon: '🎨'
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in quality, creativity, and professionalism in every project we undertake.',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'We stay at the forefront of photography technology and techniques to deliver cutting-edge results.',
      icon: '💡'
    },
    {
      title: 'Connection',
      description: 'We build meaningful relationships with our clients, understanding their vision and bringing it to life.',
      icon: '❤️'
    },
  ]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-display mb-4">
          About <span className="text-gold">ANII</span>
        </h1>
        <p className="text-gray-400 font-lato max-w-2xl mx-auto text-lg">
          Meet the passionate team behind the lens dedicated to capturing your timeless moments
        </p>
      </section>

      {/* Our Story Section */}
     
 <section className="py-20 px-6 bg-black/50">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-display text-center mb-8">
      Our <span className="text-gold">Story</span>
    </h2>
    
    <p className="text-gray-300 font-lato text-lg leading-relaxed mb-6 text-center">
      It all started with a Master’s degree, a steady job, and a nagging feeling that life needed a little more creative flair. After completion of Masters from <strong>National Institute of Technology (NIT) Durgapur</strong>, Aniruddha realized the traditional path wasn't his jam. His true calling? Freezing time.
    </p>

    <p className="text-gray-300 font-lato text-lg leading-relaxed mb-6 text-center">
      What began as a one-man freelance gig fueled by a love for capturing raw, unfiltered moments officially leveled up into <strong>Anii Photography</strong> in 2018. Fast forward to today, and he is no longer just a solo act. He has built a powerhouse team of visual storytellers who take their craft seriously—but never themselves.
    </p>

    <p className="text-gray-300 font-lato text-lg leading-relaxed mb-6 text-center">
      From the cinematic magic of weddings and pre-weddings to high-end fashion, brand campaigns, dynamic influencer content, dazzling jewellery and striking product shoots, we bring passion, precision, and a whole lot of fun to every single set. Each project teaches us something new, and we apply that knowledge to make every client's experience extraordinary.
    </p>

    <p className="text-gray-300 font-lato text-lg leading-relaxed text-center">
      Today, Anii Photography stands as a testament to the power of creativity, dedication, and genuine connection with our clients. We don't just take photographs – we create memories that will be cherished for generations to come.
    </p>
  </div>
</section>

      {/* Core Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Our <span className="text-gold">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="border border-gold/30 p-8 hover:border-gold transition-colors duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-display text-gold mb-3">{value.title}</h3>
                <p className="text-gray-300 font-lato">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-12">
            Meet The <span className="text-gold">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="relative overflow-hidden h-80 mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-display text-white mb-2">{member.name}</h3>
                <p className="text-gold font-lato font-bold mb-3">{member.role}</p>
                <p className="text-gray-300 font-lato text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-lato bg-gold/20 border border-gold/50 text-gold px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
     <section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    {/* Updated from md:grid-cols-4 to md:grid-cols-3 to center the 3 items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
      
      {/* Weddings */}
      <div>
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={500} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Weddings Captured
        </p>
      </div>

      {/* Years Experience */}
      <div>
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={10} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Years Experience
        </p>
      </div>

      {/* Satisfaction */}
      <div className="sm:col-span-2 md:col-span-1"> {/* Centers on mobile/tablet if needed */}
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={99} />%
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Client Satisfaction
        </p>
      </div>
      {/* Fashion & Brands */}
      <div className="sm:col-span-2 md:col-span-1"> {/* Centers on mobile/tablet if needed */}
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={250} />+
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Fashion & brands
        </p>
      </div>
      
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black/50 text-center">
        <h2 className="text-4xl font-display mb-6">
          Ready to Work with <span className="text-gold">Us?</span>
        </h2>
        <p className="text-gray-300 font-lato max-w-2xl mx-auto text-lg mb-8">
          Let's create something extraordinary together. Get in touch with our team to discuss your vision.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-gold text-black font-lato font-bold hover:bg-yellow-400 transition-colors duration-300"
        >
          Start Your Project
        </Link>
      </section>

      <Footer />
    </main>
  )
}
