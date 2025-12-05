const Product = require('../models/Product');

// Helper to convert image filenames to full URLs
const mapImagesToURL = (req, images) => {
    const host = req.protocol + '://' + req.get('host');
    return images.map(img => `${host}/uploads/${img}`);
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category && category !== 'All') query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const products = await Product.find(query);

        // Map images to full URLs
        const productsWithFullImages = products.map(p => ({
            ...p.toObject(),
            images: mapImagesToURL(req, p.images || [])
        }));

        res.json(productsWithFullImages);
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

        // Map images to full URLs
        const productWithFullImages = {
            ...product.toObject(),
            images: mapImagesToURL(req, product.images || [])
        };

        res.json(productWithFullImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ 
                message: 'All fields (name, description, price, category, stock) are required' 
            });
        }

        let productData = {
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            sizes: [],
            images: []
        };

        if (req.body.sizes) {
            try {
                productData.sizes = typeof req.body.sizes === 'string' 
                    ? JSON.parse(req.body.sizes) 
                    : req.body.sizes;
            } catch (error) {
                productData.sizes = [];
            }
        }

        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.filename);
        }

        const product = new Product(productData);
        await product.save();

        // Return product with full image URLs
        res.status(201).json({
            ...product.toObject(),
            images: mapImagesToURL(req, product.images || [])
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let updateData = {};

        if (req.body.name) updateData.name = req.body.name;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.price) updateData.price = parseFloat(req.body.price);
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.stock) updateData.stock = parseInt(req.body.stock);

        if (req.body.sizes) {
            try {
                updateData.sizes = typeof req.body.sizes === 'string' 
                    ? JSON.parse(req.body.sizes) 
                    : req.body.sizes;
            } catch {
                updateData.sizes = existingProduct.sizes;
            }
        } else {
            updateData.sizes = existingProduct.sizes;
        }

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.filename);
        } else {
            updateData.images = existingProduct.images;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            ...updatedProduct.toObject(),
            images: mapImagesToURL(req, updatedProduct.images || [])
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
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
