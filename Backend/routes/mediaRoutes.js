const express = require('express')
const router = express.Router()

const auth = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const controller = require('../controllers/mediaController')

// Get all or category-based
router.get('/', controller.getMedia)

// Create (Admin only)
router.post(
  '/',
  auth,
  upload.single('image'),
  controller.createMedia
)

// Delete (Admin only)
router.delete('/:id', auth, controller.deleteMedia)

module.exports = router