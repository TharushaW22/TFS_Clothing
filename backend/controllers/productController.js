const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;  // NEW: For uploading to Cloudinary

// NEW: Helper to upload a single image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { 
                folder: 'tfs-clothing',  // Organize in your app's folder
                transformation: [{ width: 800, height: 800, crop: 'limit' }]  // Optional: Auto-resize
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve(result.secure_url);  // Full CDN URL (e.g., https://res.cloudinary.com/d10uevj/image/upload/...)
                }
            }
        ).end(buffer);  // Stream the buffer
    });
};

// Get all products (unchanged)
const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category && category !== 'All') query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product by ID (unchanged)
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product - UPDATED: Upload images to Cloudinary
const createProduct = async (req, res) => {
    try {
        console.log('=== CREATE PRODUCT REQUEST ===');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        
        // Validate required fields
        const { name, description, price, category, stock } = req.body;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ 
                message: 'All fields (name, description, price, category, stock) are required' 
            });
        }

        let productData = {
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            stock: parseInt(req.body.stock),
            sizes: []
        };

        // Handle sizes if provided
        if (req.body.sizes) {
            try {
                productData.sizes = typeof req.body.sizes === 'string' 
                    ? JSON.parse(req.body.sizes) 
                    : req.body.sizes;
            } catch (error) {
                console.error('Error parsing sizes:', error);
                productData.sizes = [];
            }
        }

        // NEW: Handle images - Upload to Cloudinary if files provided
        if (req.files && req.files.length > 0) {
            console.log(`Uploading ${req.files.length} images to Cloudinary...`);
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const imageUrls = await Promise.all(uploadPromises);
            productData.images = imageUrls;  // Save array of full URLs
            console.log('Cloudinary URLs:', imageUrls);
        } else {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        console.log('Final product data:', productData);

        const product = new Product(productData);
        await product.save();
        
        console.log('Product created successfully:', product);
        res.status(201).json(product);
        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ 
            message: 'Error creating product',
            error: error.message 
        });
    }
};

// Update product - UPDATED: Upload new images to Cloudinary
const updateProduct = async (req, res) => {
    try {
        console.log('=== UPDATE PRODUCT REQUEST ===');
        console.log('Product ID:', req.params.id);
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        
        const productId = req.params.id;
        
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Check if product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let updateData = {};

        // Update only provided fields
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.price) updateData.price = parseFloat(req.body.price);
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.stock) updateData.stock = parseInt(req.body.stock);

        // Handle sizes
        if (req.body.sizes) {
            try {
                updateData.sizes = typeof req.body.sizes === 'string' 
                    ? JSON.parse(req.body.sizes) 
                    : req.body.sizes;
            } catch (error) {
                console.error('Error parsing sizes:', error);
                updateData.sizes = existingProduct.sizes;
            }
        } else {
            updateData.sizes = existingProduct.sizes;
        }

        // NEW: Handle new images - Upload to Cloudinary and append/replace
        if (req.files && req.files.length > 0) {
            console.log(`Uploading ${req.files.length} new images to Cloudinary...`);
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const newImageUrls = await Promise.all(uploadPromises);
            console.log('New Cloudinary URLs:', newImageUrls);
            updateData.images = [...existingProduct.images, ...newImageUrls];  // Append new ones; change to = newImageUrls to replace
        } else {
            // Keep existing images if no new ones
            updateData.images = existingProduct.images;
        }

        console.log('Final update data:', updateData);

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found after update' });
        }

        console.log('Product updated successfully:', updatedProduct);
        res.json(updatedProduct);

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete product (unchanged, but optional Cloudinary cleanup commented)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // OPTIONAL: Delete images from Cloudinary (uncomment if needed)
        // for (let url of product.images) {
        //     const publicId = cloudinary.utils.extractPublicId(url);
        //     await cloudinary.uploader.destroy(publicId);
        // }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};