// require('dotenv').config()

// const express = require('express')
// const cors = require('cors')
// const path = require('path')


// const homeRoutes = require('./routes/homeRoutes');
// const authRoutes = require('./routes/authRoutes')
// const mediaRoutes = require('./routes/mediaRoutes')
// const blogRoutes = require('./routes/blogRoutes')
// const contactRoutes = require('./routes/contactRoutes')
// const collectionRoutes = require('./routes/collectionRoutes')


// const app = express()

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Serve uploaded images (local storage fallback)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// // Health check route
// app.get('/', (req, res) => {
//   res.send('Backend API is running 🚀')
// })

// // API Routes
// app.use('/api', homeRoutes);
// app.use('/api/auth', authRoutes)
// app.use('/api/media', mediaRoutes)
// app.use('/api/blogs', blogRoutes)
// app.use('/api/contact', contactRoutes)
// app.use('/api/collections', collectionRoutes)

// // Global error handler (must be last)
// app.use((err, req, res, next) => {
//   console.error("GLOBAL ERROR CAUGHT:", err)
//   res.status(500).json({
//     message: err.message || "Internal Server Error"
//   })
// })
// // Add this at the bottom of server.js
// setInterval(() => {
//   fetch('https://aniis-photography.onrender.com/api/health')
//     .catch(() => {})
// }, 14 * 60 * 1000) // ping every 14 minutes
// app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
// })
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes')
const mediaRoutes = require('./routes/mediaRoutes')
const blogRoutes = require('./routes/blogRoutes')
const contactRoutes = require('./routes/contactRoutes')
const collectionRoutes = require('./routes/collectionRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve uploaded images (local storage fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Health check route
app.get('/', (req, res) => {
  res.send('Backend API is running 🚀')
})

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// API Routes
app.use('/api', homeRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/collections', collectionRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR CAUGHT:", err)
  res.status(500).json({
    message: err.message || "Internal Server Error"
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)

  // Keep Render awake - ping every 14 minutes
  setInterval(() => {
    fetch('https://aniis-photography.onrender.com/api/health')
      .catch(() => {})
  }, 14 * 60 * 1000)
})