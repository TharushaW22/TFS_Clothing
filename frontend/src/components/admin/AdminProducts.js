import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { productService } from '../../services/productService';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedImages, setSelectedImages] = useState([]);
    const [breakpoint, setBreakpoint] = useState('desktop');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        sizes: [],
        stock: '',
        images: []
    });

    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width <= 480) setBreakpoint('smallMobile');
            else if (width <= 768) setBreakpoint('mobile');
            else if (width <= 1024) setBreakpoint('tablet');
            else setBreakpoint('desktop');
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productService.getProducts({});
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        console.log('Starting form submission...');
        
        const submitData = new FormData();
        
        // Append all form fields individually
        submitData.append('name', formData.name);
        submitData.append('description', formData.description);
        submitData.append('price', formData.price.toString());
        submitData.append('category', formData.category);
        submitData.append('stock', formData.stock.toString());
        
        // Handle sizes array
        if (formData.sizes && formData.sizes.length > 0) {
            submitData.append('sizes', JSON.stringify(formData.sizes));
        } else {
            submitData.append('sizes', JSON.stringify([]));
        }
        
        // Append each selected image
        if (selectedImages && selectedImages.length > 0) {
            selectedImages.forEach(image => {
                submitData.append('images', image);
            });
        }

        // Debug: Log form data contents
        console.log('FormData contents:');
        for (let [key, value] of submitData.entries()) {
            console.log(key, value);
        }

        if (editingProduct) {
            console.log('Updating product:', editingProduct._id);
            await productService.updateProduct(editingProduct._id, submitData);
            alert('Product updated successfully!');
        } else {
            console.log('Creating new product');
            await productService.createProduct(submitData);
            alert('Product created successfully!');
        }
        
        // Reset form
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            sizes: [],
            stock: '',
            images: []
        });
        setSelectedImages([]);
        fetchProducts();
        
    } catch (error) {
        console.error('Error saving product:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
        alert(`Error saving product: ${errorMessage}`);
    } finally {
        setLoading(false);
    }
};

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            sizes: product.sizes,
            stock: product.stock,
            images: product.images
        });
        setSelectedImages([]);
        setShowForm(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productService.deleteProduct(productId);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', 'Men', 'Women', 'Kids', 'Office', 'Accessories'];
    const totalProducts = products.length;
    const outOfStock = products.filter(p => p.stock === 0).length;

    const styles = {
        container: {
            marginLeft: '250px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '@media (max-width: 1024px)': {
                marginLeft: '0'
            }
        },
        main: {
            padding: '2rem',
            background: 'rgba(255,255,255,0.95)',
            minHeight: '100vh',
            '@media (max-width: 768px)': {
                padding: '1.5rem 1rem'
            },
            '@media (max-width: 480px)': {
                padding: '1rem 0.5rem'
            }
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                alignItems: 'stretch'
            }
        },
        title: {
            fontSize: '2.5rem',
            color: '#2c3e50',
            fontWeight: '700',
            margin: 0,
            '@media (max-width: 768px)': {
                fontSize: '2rem',
                textAlign: 'center'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.8rem'
            }
        },
        statsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
            '@media (max-width: 768px)': {
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
            },
            '@media (max-width: 480px)': {
                gridTemplateColumns: '1fr',
                gap: '0.75rem'
            }
        },
        statCard: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            '@media (max-width: 480px)': {
                padding: '1rem'
            }
        },
        statValue: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            '@media (max-width: 768px)': {
                fontSize: '2rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.8rem'
            }
        },
        statLabel: {
            color: '#7f8c8d',
            fontSize: '1rem',
            fontWeight: '600',
            '@media (max-width: 480px)': {
                fontSize: '0.9rem'
            }
        },
        controls: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                alignItems: 'stretch'
            }
        },
        searchBox: {
            padding: '0.75rem 1rem',
            border: '2px solid #e1e8ed',
            borderRadius: '25px',
            fontSize: '0.9rem',
            width: '300px',
            outline: 'none',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '@media (max-width: 768px)': {
                width: '100%'
            }
        },
        filterSelect: {
            padding: '0.75rem 1rem',
            border: '2px solid #e1e8ed',
            borderRadius: '25px',
            fontSize: '0.9rem',
            background: 'white',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '@media (max-width: 768px)': {
                width: '100%'
            }
        },
        addBtn: {
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            '@media (max-width: 768px)': {
                justifyContent: 'center',
                width: '100%'
            }
        },
        addBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        },
        productsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            '@media (max-width: 1024px)': {
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
            },
            '@media (max-width: 768px)': {
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem'
            },
            '@media (max-width: 480px)': {
                gridTemplateColumns: '1fr',
                gap: '1rem'
            }
        },
        productCard: {
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            '@media (max-width: 480px)': {
                borderRadius: '15px'
            }
        },
        productCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
        },
        productImage: {
            width: '100%',
            height: '220px',
            background: 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            '@media (max-width: 768px)': {
                height: '200px'
            },
            '@media (max-width: 480px)': {
                height: '180px'
            }
        },
        stockBadge: {
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '5px 12px',
            borderRadius: '15px',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: 'white',
            '@media (max-width: 480px)': {
                fontSize: '0.6rem',
                padding: '3px 8px'
            }
        },
        inStock: {
            background: '#27ae60'
        },
        outOfStock: {
            background: '#e74c3c'
        },
        productInfo: {
            padding: '1.5rem',
            '@media (max-width: 480px)': {
                padding: '1rem'
            }
        },
        productName: {
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#2c3e50',
            lineHeight: '1.3',
            '@media (max-width: 480px)': {
                fontSize: '1.2rem'
            }
        },
        productDescription: {
            color: '#7f8c8d',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '@media (max-width: 480px)': {
                fontSize: '0.85rem',
                WebkitLineClamp: 1
            }
        },
        productPrice: {
            fontSize: '1.4rem',
            color: '#2c3e50',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            '@media (max-width: 480px)': {
                fontSize: '1.3rem'
            }
        },
        productMeta: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            '@media (max-width: 480px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem'
            }
        },
        productCategory: {
            padding: '5px 12px',
            background: 'rgba(102, 126, 234, 0.1)',
            color: '#667eea',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600',
            '@media (max-width: 480px)': {
                fontSize: '0.75rem'
            }
        },
        productStock: {
            color: '#7f8c8d',
            fontSize: '0.9rem',
            fontWeight: '500',
            '@media (max-width: 480px)': {
                fontSize: '0.85rem'
            }
        },
        actions: {
            display: 'flex',
            gap: '0.75rem',
            '@media (max-width: 480px)': {
                flexDirection: 'column'
            }
        },
        actionBtn: {
            padding: '10px 16px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            '@media (max-width: 480px)': {
                padding: '8px 12px',
                fontSize: '0.75rem'
            }
        },
        editBtn: {
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            boxShadow: '0 2px 10px rgba(52, 152, 219, 0.3)'
        },
        deleteBtn: {
            background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            boxShadow: '0 2px 10px rgba(231, 76, 60, 0.3)'
        },
        actionBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        },
        formOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            padding: '1rem',
            '@media (max-width: 480px)': {
                padding: '0.5rem'
            }
        },
        form: {
            background: 'white',
            padding: '2.5rem',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)',
            '@media (max-width: 480px)': {
                width: '100%',
                maxHeight: '100vh',
                borderRadius: '0',
                padding: '1.5rem'
            }
        },
        formTitle: {
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2c3e50',
            textAlign: 'center',
            '@media (max-width: 480px)': {
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
            }
        },
        formGroup: {
            marginBottom: '1.5rem',
            '@media (max-width: 480px)': {
                marginBottom: '1rem'
            }
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '0.9rem',
            '@media (max-width: 480px)': {
                fontSize: '0.85rem'
            }
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '10px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
            background: 'white',
            '@media (max-width: 480px)': {
                padding: '10px 12px',
                fontSize: '16px'
            }
        },
        inputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
        },
        textarea: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '10px',
            fontSize: '16px',
            minHeight: '100px',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            '@media (max-width: 480px)': {
                minHeight: '80px',
                padding: '10px 12px'
            }
        },
        select: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '10px',
            fontSize: '16px',
            background: 'white',
            outline: 'none',
            cursor: 'pointer',
            '@media (max-width: 480px)': {
                padding: '10px 12px'
            }
        },
        formActions: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '2rem',
            '@media (max-width: 480px)': {
                flexDirection: 'column',
                gap: '0.75rem'
            }
        },
        cancelBtn: {
            padding: '12px 24px',
            background: 'transparent',
            color: '#7f8c8d',
            border: '2px solid #bdc3c7',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            '@media (max-width: 480px)': {
                width: '100%',
                padding: '10px'
            }
        },
        submitBtn: {
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            '@media (max-width: 480px)': {
                width: '100%',
                padding: '10px'
            }
        },
        cancelBtnHover: {
            background: '#f8f9fa',
            borderColor: '#95a5a6'
        },
        submitBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem',
            color: '#7f8c8d',
            '@media (max-width: 480px)': {
                padding: '2rem',
                fontSize: '1.1rem'
            }
        },
        noProducts: {
            textAlign: 'center',
            padding: '3rem',
            color: '#bdc3c7',
            gridColumn: '1 / -1',
            '@media (max-width: 480px)': {
                padding: '2rem'
            }
        },
        imageInfo: {
            fontSize: '0.8rem',
            color: '#667eea',
            marginTop: '0.5rem',
            '@media (max-width: 480px)': {
                fontSize: '0.75rem'
            }
        }
    };

    // Helper function to handle responsive styles
    const getResponsiveStyle = (styleObj, currentBreakpoint) => {
        let styles = { ...styleObj };

        // Remove media query keys
        const mediaKeys = Object.keys(styles).filter(key => key.startsWith('@media'));
        mediaKeys.forEach(key => delete styles[key]);

        // Apply progressively
        if (currentBreakpoint !== 'desktop' && styleObj['@media (max-width: 1024px)']) {
            Object.assign(styles, styleObj['@media (max-width: 1024px)']);
        }
        if ((currentBreakpoint === 'mobile' || currentBreakpoint === 'smallMobile') && styleObj['@media (max-width: 768px)']) {
            Object.assign(styles, styleObj['@media (max-width: 768px)']);
        }
        if (currentBreakpoint === 'smallMobile' && styleObj['@media (max-width: 480px)']) {
            Object.assign(styles, styleObj['@media (max-width: 480px)']);
        }

        return styles;
    };

    const [hoverStates, setHoverStates] = useState({
        productCards: {},
        actionBtns: {},
        addBtn: false,
        formBtns: {}
    });

    if (loading) {
        return (
            <div style={getResponsiveStyle(styles.container, breakpoint)}>
                <AdminSidebar />
                <AdminHeader />
                <div style={getResponsiveStyle(styles.loading, breakpoint)}>Loading products...</div>
            </div>
        );
    }

    return (
        <div style={getResponsiveStyle(styles.container, breakpoint)}>
            <AdminSidebar />
            <AdminHeader />

            <main style={getResponsiveStyle(styles.main, breakpoint)}>
                <div style={getResponsiveStyle(styles.header, breakpoint)}>
                    <h1 style={getResponsiveStyle(styles.title, breakpoint)}>🛍️ Product Management</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            ...getResponsiveStyle(styles.addBtn, breakpoint),
                            ...(hoverStates.addBtn ? styles.addBtnHover : {})
                        }}
                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, addBtn: true }))}
                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, addBtn: false }))}
                    >
                        ➕ Add New Product
                    </button>
                </div>

                {/* Stats Cards */}
                <div style={getResponsiveStyle(styles.statsContainer, breakpoint)}>
                    <div style={getResponsiveStyle(styles.statCard, breakpoint)}>
                        <div style={getResponsiveStyle(styles.statValue, breakpoint)}>{totalProducts}</div>
                        <div style={getResponsiveStyle(styles.statLabel, breakpoint)}>Total Products</div>
                    </div>
                    <div style={getResponsiveStyle(styles.statCard, breakpoint)}>
                        <div style={getResponsiveStyle(styles.statValue, breakpoint)}>{outOfStock}</div>
                        <div style={getResponsiveStyle(styles.statLabel, breakpoint)}>Out of Stock</div>
                    </div>
                    <div style={getResponsiveStyle(styles.statCard, breakpoint)}>
                        <div style={getResponsiveStyle(styles.statValue, breakpoint)}>
                            {categories.length - 1}
                        </div>
                        <div style={getResponsiveStyle(styles.statLabel, breakpoint)}>Categories</div>
                    </div>
                </div>

                {/* Controls */}
                <div style={getResponsiveStyle(styles.controls, breakpoint)}>
                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={getResponsiveStyle(styles.searchBox, breakpoint)}
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={getResponsiveStyle(styles.filterSelect, breakpoint)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Products Grid */}
                <div style={getResponsiveStyle(styles.productsGrid, breakpoint)}>
                    {filteredProducts.length === 0 ? (
                        <div style={getResponsiveStyle(styles.noProducts, breakpoint)}>
                            <h3>No products found</h3>
                            <p>Try changing your search or filters</p>
                        </div>
                    ) : (
                        filteredProducts.map(product => (
                            <div
                                key={product._id}
                                style={{
                                    ...getResponsiveStyle(styles.productCard, breakpoint),
                                    ...(hoverStates.productCards?.[product._id] ? styles.productCardHover : {})
                                }}
                                onMouseEnter={() => setHoverStates(prev => ({
                                    ...prev,
                                    productCards: { ...prev.productCards, [product._id]: true }
                                }))}
                                onMouseLeave={() => setHoverStates(prev => ({
                                    ...prev,
                                    productCards: { ...prev.productCards, [product._id]: false }
                                }))}
                            >
                                <div style={getResponsiveStyle(styles.productImage, breakpoint)}>
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${product.images[0]}`}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        '📷 No Image'
                                    )}
                                    <div style={{
                                        ...getResponsiveStyle(styles.stockBadge, breakpoint),
                                        ...(product.stock > 0 ? styles.inStock : styles.outOfStock)
                                    }}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </div>

                                <div style={getResponsiveStyle(styles.productInfo, breakpoint)}>
                                    <h3 style={getResponsiveStyle(styles.productName, breakpoint)}>{product.name}</h3>
                                    <p style={getResponsiveStyle(styles.productDescription, breakpoint)}>{product.description}</p>
                                    <p style={getResponsiveStyle(styles.productPrice, breakpoint)}>${product.price}</p>
                                    
                                    <div style={getResponsiveStyle(styles.productMeta, breakpoint)}>
                                        <span style={getResponsiveStyle(styles.productCategory, breakpoint)}>{product.category}</span>
                                        <span style={getResponsiveStyle(styles.productStock, breakpoint)}>Stock: {product.stock}</span>
                                    </div>

                                    <div style={getResponsiveStyle(styles.actions, breakpoint)}>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            style={{
                                                ...getResponsiveStyle(styles.actionBtn, breakpoint),
                                                ...styles.editBtn,
                                                ...(hoverStates.actionBtns?.[`edit-${product._id}`] ? styles.actionBtnHover : {})
                                            }}
                                            onMouseEnter={() => setHoverStates(prev => ({
                                                ...prev,
                                                actionBtns: { ...prev.actionBtns, [`edit-${product._id}`]: true }
                                            }))}
                                            onMouseLeave={() => setHoverStates(prev => ({
                                                ...prev,
                                                actionBtns: { ...prev.actionBtns, [`edit-${product._id}`]: false }
                                            }))}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            style={{
                                                ...getResponsiveStyle(styles.actionBtn, breakpoint),
                                                ...styles.deleteBtn,
                                                ...(hoverStates.actionBtns?.[`delete-${product._id}`] ? styles.actionBtnHover : {})
                                            }}
                                            onMouseEnter={() => setHoverStates(prev => ({
                                                ...prev,
                                                actionBtns: { ...prev.actionBtns, [`delete-${product._id}`]: true }
                                            }))}
                                            onMouseLeave={() => setHoverStates(prev => ({
                                                ...prev,
                                                actionBtns: { ...prev.actionBtns, [`delete-${product._id}`]: false }
                                            }))}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Product Form Modal */}
                {showForm && (
                    <div style={getResponsiveStyle(styles.formOverlay, breakpoint)}>
                        <form onSubmit={handleSubmit} style={getResponsiveStyle(styles.form, breakpoint)}>
                            <h2 style={getResponsiveStyle(styles.formTitle, breakpoint)}>
                                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                            </h2>

                            {[
                                { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name' },
                                { name: 'price', label: 'Price ($)', type: 'number', placeholder: 'Enter price', step: '0.01' },
                                { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: 'Enter stock quantity' }
                            ].map(field => (
                                <div key={field.name} style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                    <label style={getResponsiveStyle(styles.label, breakpoint)}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        required
                                        style={getResponsiveStyle(styles.input, breakpoint)}
                                        placeholder={field.placeholder}
                                        step={field.step}
                                    />
                                </div>
                            ))}

                            <div style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                <label style={getResponsiveStyle(styles.label, breakpoint)}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    style={getResponsiveStyle(styles.select, breakpoint)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Men">👔 Men</option>
                                    <option value="Women">👗 Women</option>
                                    <option value="Kids">👶 Kids</option>
                                    <option value="Office">💼 Office</option>
                                    <option value="Accessories">🕶️ Accessories</option>
                                </select>
                            </div>

                            <div style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                <label style={getResponsiveStyle(styles.label, breakpoint)}>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    style={getResponsiveStyle(styles.textarea, breakpoint)}
                                    placeholder="Enter product description..."
                                />
                            </div>

                            {/* Image Upload Field */}
                            <div style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                <label style={getResponsiveStyle(styles.label, breakpoint)}>Product Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={getResponsiveStyle(styles.input, breakpoint)}
                                />
                                {selectedImages.length > 0 && (
                                    <p style={getResponsiveStyle(styles.imageInfo, breakpoint)}>
                                        {selectedImages.length} image(s) selected
                                    </p>
                                )}
                                {editingProduct && formData.images && formData.images.length > 0 && (
                                    <p style={getResponsiveStyle(styles.imageInfo, breakpoint)}>
                                        Currently has {formData.images.length} image(s)
                                    </p>
                                )}
                            </div>

                            <div style={getResponsiveStyle(styles.formActions, breakpoint)}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                        setSelectedImages([]);
                                    }}
                                    style={{
                                        ...getResponsiveStyle(styles.cancelBtn, breakpoint),
                                        ...(hoverStates.formBtns?.cancel ? styles.cancelBtnHover : {})
                                    }}
                                    onMouseEnter={() => setHoverStates(prev => ({
                                        ...prev,
                                        formBtns: { ...prev.formBtns, cancel: true }
                                    }))}
                                    onMouseLeave={() => setHoverStates(prev => ({
                                        ...prev,
                                        formBtns: { ...prev.formBtns, cancel: false }
                                    }))}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    style={{
                                        ...getResponsiveStyle(styles.submitBtn, breakpoint),
                                        ...(hoverStates.formBtns?.submit ? styles.submitBtnHover : {})
                                    }}
                                    onMouseEnter={() => setHoverStates(prev => ({
                                        ...prev,
                                        formBtns: { ...prev.formBtns, submit: true }
                                    }))}
                                    onMouseLeave={() => setHoverStates(prev => ({
                                        ...prev,
                                        formBtns: { ...prev.formBtns, submit: false }
                                    }))}
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminProducts;