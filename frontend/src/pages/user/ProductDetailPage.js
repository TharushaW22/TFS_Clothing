import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (id) {
            fetchProduct();
        } else {
            setLoading(false);
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productService.getProductById(id);
            if (response.data) {
                setProduct(response.data);
                const defaultSize = response.data.sizes && response.data.sizes.length > 0 
                    ? (response.data.sizes.includes('M') ? 'M' : response.data.sizes[0])
                    : 'M';
                setSelectedSize(defaultSize);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }
        if (product && selectedSize) {
            addToCart({...product, selectedSize}, quantity);
            alert('Product added to cart!');
        } else {
            alert('Please select a size!');
        }
    };

    const handleAddToFav = () => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }
        alert('Product added to favorites!');
    };

    const handleBuyNow = () => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }
        if (product && selectedSize) {
            addToCart({...product, selectedSize}, quantity);
            navigate('/cart');
        } else {
            alert('Please select a size!');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const increaseQuantity = () => {
        if (quantity < (product?.stock || 10)) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const availableSizes = product?.sizes && product.sizes.length > 0 ? product.sizes : clothingSizes;

    // Styles - Pure black and white theme
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '80px 15px 30px' : '100px 30px 50px',
            minHeight: '100vh',
            background: '#ffffff'
        },
        productLayout: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '30px' : '60px',
            alignItems: 'start'
        },
        imageSection: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'column',
            gap: '20px'
        },
        mainImageContainer: {
            width: '100%',
            background: '#fafafa',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            minHeight: '500px',
            position: 'relative'
        },
        mainImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            padding: '20px'
        },
        thumbnails: {
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            padding: '10px 0'
        },
        thumbnail: {
            width: '70px',
            height: '70px',
            background: '#fafafa',
            borderRadius: '6px',
            cursor: 'pointer',
            border: '2px solid transparent',
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        activeThumbnail: {
            border: '2px solid #000000'
        },
        thumbnailImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        infoSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        productHeader: {
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '20px'
        },
        productName: {
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#000000',
            lineHeight: '1.3'
        },
        productPrice: {
            fontSize: isMobile ? '22px' : '26px',
            color: '#000000',
            fontWeight: '700',
            marginBottom: '16px'
        },
        productDescription: {
            color: '#666666',
            lineHeight: '1.6',
            fontSize: '15px',
            fontWeight: '400'
        },
        selectionSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        sizeSelector: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        sectionLabel: {
            fontWeight: '600',
            color: '#000000',
            fontSize: '15px'
        },
        sizeOptions: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
        },
        sizeOption: {
            padding: '12px 18px',
            border: '2px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            background: 'white',
            color: '#000000',
            transition: 'all 0.2s ease',
            fontSize: '14px',
            fontWeight: '500',
            minWidth: '55px',
            textAlign: 'center'
        },
        selectedSize: {
            background: '#000000',
            color: 'white',
            borderColor: '#000000'
        },
        quantitySelector: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '6px',
            padding: '8px',
            width: 'fit-content'
        },
        quantityButton: {
            width: '38px',
            height: '38px',
            border: 'none',
            background: '#f5f5f5',
            color: '#000000',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
        },
        quantityDisplay: {
            minWidth: '45px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: '#000000'
        },
        actionSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid #e0e0e0'
        },
        primaryButton: {
            padding: '16px 24px',
            background: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            width: '100%'
        },
        secondaryButton: {
            padding: '16px 24px',
            background: 'transparent',
            color: '#000000',
            border: '2px solid #000000',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            width: '100%'
        },
        favoriteButton: {
            padding: '16px 24px',
            background: 'transparent',
            color: '#666666',
            border: '2px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        productMeta: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            background: '#fafafa',
            borderRadius: '6px',
            border: '1px solid #e0e0e0'
        },
        metaItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #e0e0e0'
        },
        metaLabel: {
            color: '#666666',
            fontSize: '14px',
            fontWeight: '500'
        },
        metaValue: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '600'
        },
        loginPrompt: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            zIndex: 1000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            width: '90%',
            maxWidth: '380px'
        },
        loginText: {
            fontSize: '15px',
            marginBottom: '20px',
            color: '#000000',
            fontWeight: '500',
            lineHeight: '1.5'
        },
        loginButtons: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
        },
        loginBtn: {
            padding: '12px 20px',
            border: '2px solid #e0e0e0',
            borderRadius: '4px',
            background: 'white',
            color: '#000000',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: '600',
            flex: 1
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
        },
        loading: {
            textAlign: 'center',
            padding: '120px 20px',
            fontSize: '16px',
            color: '#000000',
            fontWeight: '500'
        },
        backButton: {
            padding: '12px 20px',
            background: 'white',
            color: '#000000',
            border: '2px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        },
        stockInfo: {
            color: '#666666',
            fontSize: '14px',
            marginTop: '4px'
        }
    };

    // Add hover effects
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .size-option:hover {
                background: #f5f5f5;
                border-color: #000000;
            }
            .quantity-btn:hover {
                background: #e0e0e0;
            }
            .primary-btn:hover {
                background: #333333;
                transform: translateY(-1px);
            }
            .secondary-btn:hover {
                background: #000000;
                color: white;
                transform: translateY(-1px);
            }
            .favorite-btn:hover {
                border-color: #000000;
                color: #000000;
                transform: translateY(-1px);
            }
            .back-btn:hover {
                background: #f5f5f5;
                border-color: #000000;
            }
            .login-btn:hover {
                background: #000000;
                color: white;
                border-color: #000000;
            }
            .thumbnail:hover {
                border-color: #b0b0b0;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <h2>Loading Product Details...</h2>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={styles.container}>
                <button 
                    style={styles.backButton}
                    onClick={() => navigate('/shop')}
                    className="back-btn"
                >
                    ← Back to Shop
                </button>
                <div style={styles.loading}>
                    <h2>Product Not Found</h2>
                    <p>Could not find the requested product</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <button 
                style={styles.backButton}
                onClick={() => navigate('/shop')}
                className="back-btn"
            >
                ← BACK TO SHOP
            </button>

            <div style={styles.productLayout}>
                {/* Image Section */}
                <div style={styles.imageSection}>
                    <div style={styles.mainImageContainer}>
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={`http://localhost:5000/uploads/${product.images[selectedImage]}`}
                                alt={product.name}
                                style={styles.mainImage}
                                onLoad={(e) => {
                                    // Dynamic image adjustment
                                    const img = e.target;
                                    const container = img.parentElement;
                                    if (img.naturalWidth > img.naturalHeight) {
                                        // Landscape image
                                        img.style.width = '90%';
                                        img.style.height = 'auto';
                                    } else {
                                        // Portrait image
                                        img.style.width = 'auto';
                                        img.style.height = '90%';
                                    }
                                }}
                            />
                        ) : (
                            <div style={{
                                color: '#666666',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}>
                                NO IMAGE AVAILABLE
                            </div>
                        )}
                    </div>
                    
                    {product.images && product.images.length > 1 && (
                        <div style={styles.thumbnails}>
                            {product.images.map((image, index) => (
                                <div 
                                    key={index} 
                                    style={{
                                        ...styles.thumbnail,
                                        ...(selectedImage === index && styles.activeThumbnail)
                                    }}
                                    onClick={() => setSelectedImage(index)}
                                    className="thumbnail"
                                >
                                    <img
                                        src={`http://localhost:5000/uploads/${image}`}
                                        alt={`${product.name} ${index + 1}`}
                                        style={styles.thumbnailImage}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div style={styles.infoSection}>
                    <div style={styles.productHeader}>
                        <h1 style={styles.productName}>{product.name}</h1>
                        <p style={styles.productPrice}>LKR {product.price}</p>
                        <p style={styles.productDescription}>{product.description}</p>
                    </div>

                    <div style={styles.selectionSection}>
                        {/* Size Selection */}
                        <div style={styles.sizeSelector}>
                            <label style={styles.sectionLabel}>Select Size</label>
                            <div style={styles.sizeOptions}>
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        style={{
                                            ...styles.sizeOption,
                                            ...(selectedSize === size && styles.selectedSize)
                                        }}
                                        onClick={() => setSelectedSize(size)}
                                        className="size-option"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div style={styles.quantitySelector}>
                            <label style={styles.sectionLabel}>Quantity</label>
                            <div style={styles.quantityControls}>
                                <button 
                                    style={styles.quantityButton}
                                    onClick={decreaseQuantity}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span style={styles.quantityDisplay}>{quantity}</span>
                                <button 
                                    style={styles.quantityButton}
                                    onClick={increaseQuantity}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                            <div style={styles.stockInfo}>
                                {product.stock} units available
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actionSection}>
                        <button
                            style={styles.primaryButton}
                            onClick={handleBuyNow}
                            className="primary-btn"
                        >
                            Buy Now
                        </button>
                        
                        <button
                            style={styles.secondaryButton}
                            onClick={handleAddToCart}
                            className="secondary-btn"
                        >
                            Add to Cart
                        </button>

                        <button
                            style={styles.favoriteButton}
                            onClick={handleAddToFav}
                            className="favorite-btn"
                        >
                            ♡ Add to Favorites
                        </button>
                    </div>

                    {/* Product Meta Information */}
                    <div style={styles.productMeta}>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>Category</span>
                            <span style={styles.metaValue}>{product.category}</span>
                        </div>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>Selected Size</span>
                            <span style={styles.metaValue}>{selectedSize}</span>
                        </div>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>Availability</span>
                            <span style={styles.metaValue}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Prompt Modal */}
            {showLoginPrompt && (
                <>
                    <div style={styles.overlay} onClick={() => setShowLoginPrompt(false)} />
                    <div style={styles.loginPrompt}>
                        <div style={styles.loginText}>
                            Please login or register to continue with your purchase
                        </div>
                        <div style={styles.loginButtons}>
                            <button 
                                style={styles.loginBtn}
                                onClick={handleLogin}
                                className="login-btn"
                            >
                                Login
                            </button>
                            <button 
                                style={styles.loginBtn}
                                onClick={handleRegister}
                                className="login-btn"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetailPage;