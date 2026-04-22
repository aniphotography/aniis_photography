const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // Import your cloudinary config
const TestimonialController = require('../controllers/testimonialsController');

// 1. SWITCH TO MEMORY STORAGE (No more ENOENT errors on Render)
const storage = multer.memoryStorage();
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

// POST: Create with Cloudinary Upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { author_name, quote } = req.body;
        let image_url = null;

        if (req.file) {
            // 2. UPLOAD DIRECTLY TO CLOUDINARY FROM RAM
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'nanii_testimonials' },
                    (error, uploadedFile) => {
                        if (error) reject(error);
                        else resolve(uploadedFile);
                    }
                );
                // Send the file buffer to Cloudinary
                uploadStream.end(req.file.buffer);
            });

            // 3. USE THE CLOUDINARY HTTPS URL
            image_url = result.secure_url;
        }

        const newTestimonial = await TestimonialController.create({
            author_name,
            quote,
            image_url
        });

        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error("Upload Error:", err);
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