'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

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
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}
export default function AboutPage() {
  
  const team = [
  {
    id: 1,
    name: 'Aniruddha Das (Anii)',
    role: 'Founder & Director',
    image: '/images/team/anii.jpg.jpeg', // Replace with actual paths
    expertise: ['Photography', 'Cinematography', 'Editing']
  },
  {
    id: 2,
    name: 'Ritisha Banerjee',
    role: 'Creative Manager & MakeUp Artist',
    image: '/images/team/ritisha.jpg.jpeg',
    expertise: ['MakeUp', 'Styling', 'Art']
  },
  {
    id: 3,
    name: 'Sarbojit Sen',
    role: 'Photographer',
    image: '/images/team/sarbojit.jpg.jpeg',
    expertise: ['Photography', 'Management']
  },
  {
    id: 4,
    name: 'Ayush Thakur',
    role: 'Video Editor & Cinematographer',
    image: '/images/team/Ayush.jpg.jpeg',
    expertise: ['Editing', 'Cinematography']
  },
  {
    id: 5,
    name: 'Rohit Patra',
    role: 'Photographer',
    image: '/images/team/RohitPatra.jpeg',
    expertise: ['Photography', 'Design']
  },
  {
    id: 6,
    name: 'Pratisruti Sil',
    role: 'Cinematographer',
    image: '/images/team/proti.jpg.jpeg',
    expertise: ['Cinematography', 'Creative']
  },
  {
    id: 7,
    name: 'Pradumna Das',
    role: 'Cinematographer',
    image: '/images/team/adi.jpg.jpeg',
    expertise: ['Cinematography', 'Editing', 'Creative']
  },
  {
    id: 8,
    name: 'Sayak Mukherjee',
    role: 'Assistant Photographer',
    image: '/images/team/sayak.jpg.jpeg',
    expertise: ['Assist', 'Photography', 'Lights']
  },
  {
    id: 9,
    name: 'Rishiraj Sen',
    role: 'Assistant Photographer',
    image: '/images/team/rishi.jpg.jpeg',
    expertise: ['Assist', 'Photography']
  },
  {
    id: 10,
    name: 'Shambhu Kamat',
    role: 'Assistant Cinematographer',
    image: '/images/team/shambhu.jpg.jpeg',
    expertise: ['Lights', 'Assist']
  },
  {
    id: 11,
    name: 'Prithendu Sam',
    role: 'Cinematographer',
    image: '/images/team/Prithendu.jpg.jpeg',
    expertise: ['Cinematography', 'Lights']
  }
];

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
   <main className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden">
  {/* Your content */}

      <Navbar />

      {/* Hero Section */}
 <section 
  className="relative min-h-[36vh] flex flex-col items-center justify-center text-center overflow-hidden"
>
        <div className="relative z-15 px-2 w-full max-w-5xl">
    <h1 className="text-4xl md:text-7xl font-display mb-4 text-white">
      About <span className="text-gold">ANII</span>
    </h1>

    <p className="text-gray-100 font-lato text-sm md:text-xl px-4">
      Meet the passionate team behind the lens dedicated to capturing your timeless moments
    </p>
  </div>
  </section>
{/* <section 
  className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden"
> */}

  {/* Background Image Layer */}
{/* <div 
  className="absolute inset-0 z-0 bg-no-repeat bg-contain md:bg-cover "
  style={{ 
    backgroundImage: "url('/images/teamPhoto.jpeg')",
    backgroundColor: "#000" 
  }}
/> */}
  
  {/* Dark Tint Overlay (Optional, helps text readability) */}
  

  {/* Content Layer */}
<section className="w-full">
  <img
    src="/images/teamPhoto.jpeg"
    alt="ANII Team"
    className="w-full h-auto object-cover"
  />
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
      {/* <section className="py-20 px-6 bg-black/50">
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
      </section> */}
    <section className="py-20 px-6 bg-black/50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-display text-center mb-12 text-white">
      Meet The <span className="text-gold">Team</span>
    </h2>
    
    {/* Grid: 2 columns on tablet/desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {team.map((member) => (
        <div key={member.id} className="group cursor-pointer">
          
          {/* Image Container with Rounded Corners */}
          <div className="relative overflow-hidden h-80 mb-6 rounded-xl">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out 
                         grayscale group-hover:grayscale-0 group-hover:scale-110"
            />
            
            {/* Dark Overlay that clears on hover/click */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-500" />
          </div>

          {/* Text Content */}
          <h3 className="text-2xl font-display text-white mb-1">{member.name}</h3>
          
          {/* Role: Original casing (not uppercase) */}
          <p className="text-gold font-lato font-bold mb-4 text-sm">
            {member.role}
          </p>
          
          {/* Expertise: No changes on hover */}
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
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
      
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
      <div > {/* Centers on mobile/tablet if needed */}
        <p className="text-5xl font-display text-gold mb-2">
          <CountUp end={99} />%
        </p>
        <p className="text-gray-300 font-lato uppercase tracking-widest text-sm">
          Client Satisfaction
        </p>
      </div>
      {/* Fashion & Brands */}
      <div > {/* Centers on mobile/tablet if needed */}
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
