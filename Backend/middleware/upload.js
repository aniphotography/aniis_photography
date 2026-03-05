const fs = require('fs')
const path = require('path')
const multer = require('multer')

// ✅ Absolute path to uploads folder
const uploadPath = path.join(__dirname, '../uploads')

// ✅ Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

// ✅ Allowed extensions
const allowedExtensions = [
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
  '.mp4',
  '.mov',
  '.avi'
]

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  const isValidExt = allowedExtensions.includes(ext)

  const isValidMime =
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')

  if (isValidExt && isValidMime) {
    cb(null, true)
  } else {
    cb(new Error('Only image and video files are allowed'))
  }
}

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9)

    cb(null, uniqueName + path.extname(file.originalname))
  }
})

// ✅ Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max
  }
})

module.exports = upload
// const multer = require('multer')
// const path = require('path')

// // Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(null, uniqueName + path.extname(file.originalname))
//   }
// })

// // File filter (images + videos)
// const fileFilter = (req, file, cb) => {
//   console.log("Original name:", file.originalname)
//   console.log("Extension:", path.extname(file.originalname))
//   console.log("Mimetype:", file.mimetype)

//   const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi/

//   const ext = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   )

//   const mime =
//     file.mimetype.startsWith('image/') ||
//     file.mimetype.startsWith('video/')

//   console.log("EXT:", ext)
//   console.log("MIME:", mime)

//   if (ext && mime) {
//     cb(null, true)
//   } else {
//     cb(new Error('Only image and video files are allowed'))
//   }
// }
// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi/

// //   const ext = allowedTypes.test(
// //     path.extname(file.originalname).toLowerCase()
// //   )
// //   const mime =
// //     file.mimetype.startsWith('image/') ||
// //     file.mimetype.startsWith('video/')

// //   if (ext && mime) {
// //     cb(null, true)
// //   } else {
// //     cb(new Error('Only image and video files are allowed'))
// //   }
// // }

// const upload = multer({
//   storage,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for videos
//   fileFilter
// })

// module.exports = upload