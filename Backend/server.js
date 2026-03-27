require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

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

// API Routes

app.use('/api/auth', authRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/collections', collectionRoutes)

// Global error handler (must be last)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR CAUGHT:", err)
  res.status(500).json({
    message: err.message || "Internal Server Error"
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})