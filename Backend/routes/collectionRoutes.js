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

router.get('/:id', controller.getCollectionById)


// ================= DELETE COLLECTION =================

router.delete('/:id', auth, controller.deleteCollection)


module.exports = router