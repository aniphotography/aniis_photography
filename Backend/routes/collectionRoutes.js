// console.log("COLLECTION ROUTES LOADED")

// const express = require('express')
// const router = express.Router()

// const auth = require('../middleware/authMiddleware')
// const controller = require('../controllers/collectionController')
// const upload = require('../middleware/upload')
// const { updateFeaturedStatus, getFeaturedCollections } = require('../controllers/collectionController')

// router.post(
//   '/',

//   (req, res, next) => {
//     console.log("STEP 1 → Route hit")
//     next()
//   },

//   (req, res, next) => {
//     console.log("STEP 2 → Before auth")
//     next()
//   },

//   auth,

//   (req, res, next) => {
//     console.log("STEP 3 → After auth")
//     next()
//   },

//   upload.fields([
//     { name: 'cover', maxCount: 1 },
//     { name: 'video', maxCount: 1 },
//     { name: 'coverVideo', maxCount: 1 }
//   ]),

//   (req, res, next) => {
//     console.log("STEP 4 → After multer")
//     console.log("Files:", req.files)
//     console.log("Body:", req.body)
//     next()
//   },

//   controller.createCollection
// )


// // ================= PUBLIC ROUTES =================

// router.get('/', controller.getCollectionsByCategory)

// router.get('/:id', controller.getCollectionById)


// // ================= DELETE COLLECTION =================

// router.delete('/:id', auth, controller.deleteCollection)


// // Add these routes before module.exports
// router.get('/featured', getFeaturedCollections)
// router.patch('/:id/featured', auth, updateFeaturedStatus)

// module.exports = router


console.log("COLLECTION ROUTES LOADED")

const express = require('express')
const router = express.Router()

const auth = require('../middleware/authMiddleware')
const controller = require('../controllers/collectionController')
const upload = require('../middleware/upload')

router.post(
  '/',

  (req, res, next) => {
    console.log("STEP 1 → Route hit")
    next()
  },

  (req, res, next) => {
    console.log("STEP 2 → Before auth")
    next()
  },

  auth,

  (req, res, next) => {
    console.log("STEP 3 → After auth")
    next()
  },

  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'coverVideo', maxCount: 1 }
  ]),

  (req, res, next) => {
    console.log("STEP 4 → After multer")
    console.log("Files:", req.files)
    console.log("Body:", req.body)
    next()
  },

  controller.createCollection
)

// ================= PUBLIC ROUTES =================

router.get('/', controller.getCollectionsByCategory)
router.get('/featured', controller.getFeaturedCollections)
router.get('/:id', controller.getCollectionById)

// ================= FEATURED STATUS =================

router.patch('/:id/featured', auth, controller.updateFeaturedStatus)

// ================= DELETE COLLECTION =================

router.delete('/:id', auth, controller.deleteCollection)

router.patch('/:id/youtube', auth, controller.updateYoutubeUrl)
router.patch('/:id/cover', auth, controller.updateCollectionCover)
module.exports = router