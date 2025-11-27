import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { productService } from '../../services/productService';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        sizes: [],
        stock: '',
        images: []
    });
    const [hoverStates, setHoverStates] = useState({
        productCards: {},
        actionBtns: {},
        addBtn: false,
        formBtns: {}
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productService.getProducts({});
            console.log('Fetched products response:', response.data); // DEBUG: Log full response
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
        try {
            const submitData = new FormData();

            // Append all form fields
            Object.keys(formData).forEach(key => {
                if (key !== 'images') {
                    submitData.append(key, formData[key]);
                }
            });

            // Append each selected image
            selectedImages.forEach(image => {
                submitData.append('images', image);
            });
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, submitData);
            } else {
                await productService.createProduct(submitData);
            }

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
            alert('Error saving product: ' + error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            sizes: product.sizes || [],
            stock: product.stock,
            images: product.images || []
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
                alert('Error deleting product: ' + error.message);
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

    // Image URL helper with error handling - UPDATED
    const getImageUrl = (imageName) => {
        if (!imageName) return null;
        // If it's already a full URL (from backend), use it directly
        if (typeof imageName === 'string' && imageName.startsWith('http')) {
            return imageName;
        }
        // Otherwise, assume filename and construct URL
        const url = `https://tfs-clothing.onrender.com/uploads/${imageName}`;
        console.log('Generated image URL:', url, 'for input:', imageName); // DEBUG: Log URL generation
        return url;
    };

    const handleImageError = (e, productName) => {
        console.error('Image load failed for:', productName, 'URL:', e.target.src); // DEBUG: Log failed URL
        // Create a dynamic base64 SVG placeholder with the product name
        const svgContent = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dy=".3em">${productName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')} No Image</text></svg>`;
        e.target.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
        e.target.alt = `${productName} - No Image Available`;
    };

    const styles = {
        container: {
            marginLeft: '0px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        main: {
            padding: '2rem',
            background: 'rgba(255,255,255,0.95)',
            minHeight: '100vh'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        title: {
            fontSize: '2.5rem',
            color: '#2c3e50',
            fontWeight: '700',
            margin: 0
        },
        statsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        statCard: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
        },
        statValue: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
        },
        statLabel: {
            color: '#7f8c8d',
            fontSize: '1rem',
            fontWeight: '600'
        },
        controls: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
        },
        searchBox: {
            padding: '0.75rem 1rem',
            border: '2px solid #e1e8ed',
            borderRadius: '25px',
            fontSize: '0.9rem',
            width: '300px',
            outline: 'none',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        filterSelect: {
            padding: '0.75rem 1rem',
            border: '2px solid #e1e8ed',
            borderRadius: '25px',
            fontSize: '0.9rem',
            background: 'white',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
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
            gap: '8px'
        },
        addBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        },
        productsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
        },
        productCard: {
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '10px'
        },
        mainImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '5px'
        },
        imageThumbs: {
            display: 'flex',
            gap: '5px',
            overflowX: 'auto',
            padding: '5px 0',
            width: '100%'
        },
        thumbImage: {
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px',
            flexShrink: 0,
            cursor: 'pointer',
            border: '2px solid transparent'
        },
        thumbImageActive: {
            borderColor: '#667eea'
        },
        stockBadge: {
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '5px 12px',
            borderRadius: '15px',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: 'white'
        },
        inStock: {
            background: '#27ae60'
        },
        outOfStock: {
            background: '#e74c3c'
        },
        productInfo: {
            padding: '1.5rem'
        },
        productName: {
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#2c3e50',
            lineHeight: '1.3'
        },
        productDescription: {
            color: '#7f8c8d',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        },
        productPrice: {
            fontSize: '1.4rem',
            color: '#2c3e50',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        productMeta: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
        },
        productCategory: {
            padding: '5px 12px',
            background: 'rgba(102, 126, 234, 0.1)',
            color: '#667eea',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600'
        },
        productStock: {
            color: '#7f8c8d',
            fontSize: '0.9rem',
            fontWeight: '500'
        },
        actions: {
            display: 'flex',
            gap: '0.75rem'
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
            gap: '5px'
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
            backdropFilter: 'blur(5px)'
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
            border: '1px solid rgba(255,255,255,0.2)'
        },
        formTitle: {
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2c3e50',
            textAlign: 'center'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '0.9rem'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '10px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
            background: 'white'
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
            lineHeight: '1.5'
        },
        select: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '10px',
            fontSize: '16px',
            background: 'white',
            outline: 'none',
            cursor: 'pointer'
        },
        formActions: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '2rem'
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
            transition: 'all 0.3s ease'
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
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
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
            color: '#7f8c8d'
        },
        noProducts: {
            textAlign: 'center',
            padding: '3rem',
            color: '#bdc3c7',
            gridColumn: '1 / -1'
        },
        imageInfo: {
            fontSize: '0.8rem',
            color: '#667eea',
            marginTop: '0.5rem',
            fontWeight: '500'
        },
        imagePreview: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px'
        },
        previewImage: {
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '8px',
            border: '2px solid #e1e8ed'
        },
        noImagePlaceholder: {
            width: '100%',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
            color: '#999',
            fontSize: '1rem',
            textAlign: 'center',
            borderRadius: '10px'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <AdminSidebar />
                <div style={styles.loading}>Loading products...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <AdminSidebar />
            <main style={styles.main}>
                <div style={styles.header}>
                    <h1 style={styles.title}>🛍️ Product Management</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            ...styles.addBtn,
                            ...(hoverStates.addBtn ? styles.addBtnHover : {})
                        }}
                        onMouseEnter={() => setHoverStates(prev => ({ ...prev, addBtn: true }))}
                        onMouseLeave={() => setHoverStates(prev => ({ ...prev, addBtn: false }))}
                    >
                        ➕ Add New Product
                    </button>
                </div>
                {/* Stats Cards */}
                <div style={styles.statsContainer}>
                    <div style={styles.statCard}>
                        <div style={styles.statValue}>{totalProducts}</div>
                        <div style={styles.statLabel}>Total Products</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statValue}>{outOfStock}</div>
                        <div style={styles.statLabel}>Out of Stock</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statValue}>
                            {categories.length - 1}
                        </div>
                        <div style={styles.statLabel}>Categories</div>
                    </div>
                </div>
                {/* Controls */}
                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchBox}
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={styles.filterSelect}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Products Grid */}
                <div style={styles.productsGrid}>
                    {filteredProducts.length === 0 ? (
                        <div style={styles.noProducts}>
                            <h3>No products found</h3>
                            <p>Try changing your search or filters</p>
                        </div>
                    ) : (
                        filteredProducts.map(product => {
                            console.log('Rendering product:', product._id, 'Raw images array:', product.images); // DEBUG: Log raw images per product
                            return (
                                <div
                                    key={product._id}
                                    style={{
                                        ...styles.productCard,
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
                                    <div style={styles.productImage}>
                                        {product.images && product.images.length > 0 ? (
                                            <>
                                                <img
                                                    src={getImageUrl(product.images[0])}
                                                    alt={product.name}
                                                    style={styles.mainImage}
                                                    onError={(e) => handleImageError(e, product.name)}
                                                // REMOVED loading="lazy" temporarily to avoid deferral issues
                                                />
                                                <div style={styles.imageThumbs}>
                                                    {product.images.slice(0, 4).map((image, index) => (  // Limit to 4 thumbs
                                                        <img
                                                            key={index}
                                                            src={getImageUrl(image)}
                                                            alt={`${product.name} thumb ${index + 1}`}
                                                            style={{
                                                                ...styles.thumbImage,
                                                                ...(index === 0 ? styles.thumbImageActive : {})
                                                            }}
                                                            onError={(e) => handleImageError(e, `${product.name} thumb`)}
                                                        // REMOVED loading="lazy" temporarily to avoid deferral issues
                                                        />
                                                    ))}
                                                    {product.images.length > 4 && (
                                                        <div style={{ ...styles.thumbImage, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#999' }}>
                                                            +{product.images.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div style={styles.noImagePlaceholder}>
                                                📷 No Image Available
                                                <br />
                                                <small>{product.name}</small>
                                            </div>
                                        )}
                                        <div style={{
                                            ...styles.stockBadge,
                                            ...(product.stock > 0 ? styles.inStock : styles.outOfStock)
                                        }}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                    </div>
                                    <div style={styles.productInfo}>
                                        <h3 style={styles.productName}>{product.name}</h3>
                                        <p style={styles.productDescription}>{product.description}</p>
                                        <p style={styles.productPrice}>LKR {product.price}</p>

                                        <div style={styles.productMeta}>
                                            <span style={styles.productCategory}>{product.category}</span>
                                            <span style={styles.productStock}>Stock: {product.stock}</span>
                                        </div>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => handleEdit(product)}
                                                style={{
                                                    ...styles.actionBtn,
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
                                                    ...styles.actionBtn,
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
                            );
                        })
                    )}
                </div>
                {/* Product Form Modal */}
                {showForm && (
                    <div style={styles.formOverlay}>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <h2 style={styles.formTitle}>
                                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                            </h2>
                            {[
                                { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name' },
                                { name: 'price', label: 'Price (LKR)', type: 'number', placeholder: 'Enter price', step: '0.01' },
                                { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: 'Enter stock quantity' }
                            ].map(field => (
                                <div key={field.name} style={styles.formGroup}>
                                    <label style={styles.label}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        required
                                        style={styles.input}
                                        placeholder={field.placeholder}
                                        step={field.step}
                                    />
                                </div>
                            ))}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.select}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Men">👔 Men</option>
                                    <option value="Women">👗 Women</option>
                                    <option value="Kids">👶 Kids</option>
                                    <option value="Office">💼 Office</option>
                                    <option value="Accessories">🕶️ Accessories</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.textarea}
                                    placeholder="Enter product description..."
                                />
                            </div>
                            {/* IMAGE UPLOAD FIELD - ADDED THIS */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Product Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={styles.input}
                                />
                                {selectedImages.length > 0 && (
                                    <div>
                                        <p style={styles.imageInfo}>
                                            📸 {selectedImages.length} image(s) selected
                                        </p>
                                        <div style={styles.imagePreview}>
                                            {selectedImages.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    style={styles.previewImage}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {editingProduct && formData.images && formData.images.length > 0 && (
                                    <p style={styles.imageInfo}>
                                        📁 Currently has {formData.images.length} image(s)
                                    </p>
                                )}
                            </div>
                            <div style={styles.formActions}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                        setSelectedImages([]);
                                    }}
                                    style={{
                                        ...styles.cancelBtn,
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
                                        ...styles.submitBtn,
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