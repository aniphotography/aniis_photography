const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const controller = require('../controllers/collectionController')

// Admin create collection
router.post('/', auth, controller.createCollection)

// Public get collections by category
router.get('/', controller.getCollectionsByCategory)

// Public get collection by slug
router.get('/:slug', controller.getCollectionBySlug)

module.exports = router