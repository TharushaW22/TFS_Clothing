const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;  // NEW: Import for uploads
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// NEW: Multer with MEMORY storage (buffers files for Cloudinary—no disk write)
const storage = multer.memoryStorage();  // CHANGED: From diskStorage to memoryStorage

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,  // UPDATED
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Routes (unchanged, but now Multer uses memory for Cloudinary in controllers)
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.array('images', 5), createProduct); // Handle up to 5 images
router.put('/:id', upload.array('images', 5), updateProduct); // Handle up to 5 images
router.delete('/:id', deleteProduct);

module.exports = router;