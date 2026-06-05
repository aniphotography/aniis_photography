import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import BookSessionModal from '@/components/BookSessionModal'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900']
})

const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700']
})

// export const metadata = {
//   title: 'Anii Photography - Capturing Timeless Moments',
//   description: 'Elegant Photography That Tells Your Story with Artistry and Sophistication',
//   applicationName: "Anii Photography",

//   generator: 'v0.app',
// }
export const metadata = {
  title: 'Anii Photography - Capturing Timeless Moments',
  description: 'Elegant Photography That Tells Your Story with Artistry and Sophistication',
  applicationName: "Anii Photography",
  generator: 'v0.app',
  //  icons: {
  //   icon: "/favicon.ico",
  // },
  // Add this OpenGraph block 👇
  openGraph: {
    title: 'Anii Photography',
    description: 'Elegant Photography That Tells Your Story with Artistry and Sophistication',
    siteName: 'Anii Photography',
    url: 'https://www.aniiphotography.com',
    type: 'website',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-[#1a1a1a] text-white">
        {children}
        <BookSessionModal />
      </body>
    </html>
  )
}
