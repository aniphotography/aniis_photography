const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const auth = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')  // ← use Cloudinary upload

router.post('/home-content', auth, upload.single('image'), homeController.updateHomeContent)
router.get('/home-content', homeController.getHomeContent)

module.exports = router