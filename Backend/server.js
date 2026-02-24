require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const mediaRoutes = require('./routes/mediaRoutes')
const blogRoutes = require('./routes/blogRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/contact', contactRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})