const express = require('express')
const router = express.Router()

const auth = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const controller = require('../controllers/mediaController')

/* GET MEDIA */
router.get('/', controller.getMedia)

/* SINGLE IMAGE UPLOAD */
router.post(
  '/',
  auth,
  upload.single('image'),
  controller.createMedia
)

/* MULTIPLE IMAGE UPLOAD */
router.post(
  '/multiple',
  auth,
  upload.array('images', 50),
  controller.uploadMultiple
)

/* DELETE IMAGE */
router.delete('/:id', auth, controller.deleteMedia)

module.exports = router