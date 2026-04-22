const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TestimonialController = require('../controllers/testimonialsController');

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `testi-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// GET: Fetch all
router.get('/', async (req, res) => {
    try {
        const data = await TestimonialController.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create with Image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { author_name, quote } = req.body;
        // Construct the URL path for the database
        const image_url = req.file ? `uploads/${req.file.filename}` : null;

        const newTestimonial = await TestimonialController.create({
            author_name,
            quote,
            image_url
        });

        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Remove by ID
router.delete('/:id', async (req, res) => {
    try {
        await TestimonialController.delete(req.params.id);
        res.json({ message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;