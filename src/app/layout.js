import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daniel Rodrigues - Software Engineer',
  description: 'Software Engineer based in São Paulo, Brasil. I build web applications with JavaScript, React, and Node.js. I also write about software development and career growth.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
