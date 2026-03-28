const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const homeController = require('../controllers/homeController');

// Multer Setup
const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: (req, file, cb) => {
    cb(null, `home-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/home-content', upload.single('image'), homeController.updateHomeContent);
router.get('/home-content', homeController.getHomeContent);

module.exports = router;