const Product = require('../models/Product');

// Get all products
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

// Get single product by ID
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

// Create product - FIXED VERSION
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

        // Handle images if uploaded
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.filename);
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

// Update product - FIXED VERSION
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

        // Handle images
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.filename);
        } else {
            // Keep existing images if no new images uploaded
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

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
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