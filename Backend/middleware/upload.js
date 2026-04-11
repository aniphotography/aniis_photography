const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

// Allowed extensions (kept for validation like before)
const allowedExtensions = [
  '.jpeg', '.jpg', '.png', '.webp',
  '.mp4', '.mov', '.avi',
  '.txt', '.pdf' // ✅ added for blog/text support (optional use)
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const validExt = allowedExtensions.includes(ext);

  const validMime =
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/') ||
    file.mimetype === 'text/plain' ||
    file.mimetype === 'application/pdf';

  if (validExt && validMime) {
    cb(null, true);
  } else {
    cb(new Error('Only images, videos, and supported files allowed'));
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = 'image';

    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (
      file.mimetype === 'text/plain' ||
      file.mimetype === 'application/pdf'
    ) {
      resourceType = 'raw'; // ✅ for text/pdf files
    }

    return {
      folder: 'photography',
      resource_type: resourceType,
      public_id: Date.now() + '-' + Math.round(Math.random() * 1e9),
    };
  },
});

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});