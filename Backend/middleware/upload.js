const multer = require('multer')
const path = require('path')

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueName + path.extname(file.originalname))
  }
})

// File filter (images + videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi/

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mime =
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')

  if (ext && mime) {
    cb(null, true)
  } else {
    cb(new Error('Only image and video files are allowed'))
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for videos
  fileFilter
})

module.exports = upload