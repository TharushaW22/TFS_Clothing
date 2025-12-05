// Shop.js (Updated for Cloudinary + Auto-Retry)
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);  // FIX: New state to track auto-retry for subtle feedback
    const [error, setError] = useState(null);  // Track fetch errors
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();

    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    useEffect(() => {
        fetchProducts();
    }, [category, search]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);  // Reset error on retry
        setIsRetrying(false);  // FIX: Reset retry state
        try {
            const response = await productService.getProducts({ category, search });
            setProducts(response.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            if (err.code === 'ECONNABORTED') {
                setError('Service is starting up—please wait a moment and retry.');
                // FIX: Auto-retry once after 5s, but only if error matches (prevents loops)
                setIsRetrying(true);
                setTimeout(() => {
                    if (error === 'Service is starting up—please wait a moment and retry.') {  // Check current error state
                        fetchProducts();
                    }
                }, 5000);
            } else {
                setError('Failed to load products. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ search: searchTerm });
    };

    const handleViewDetails = (productId) => {
        console.log('Navigating to product:', productId);
        navigate(`/product/${productId}`);
    };

    const categories = ['All', 'Men', 'Women', 'Kids', 'Office', 'Accessories'];

    // Fallback SVG data URI for broken images
    const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

    const styles = {
        container: {
            width: '100%',
            margin: '0',
            padding: '4rem 0 2rem',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            minHeight: '100vh'
        },
        
        header: {
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'white',
            padding: '0 20px'
        },
        title: {
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '200',
            letterSpacing: '3px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            background: 'linear-gradient(45deg, #fff, #ccc)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        },
        subtitle: {
            fontSize: '1rem',
            fontWeight: '300',
            letterSpacing: '1px',
            opacity: 0.7,
            marginBottom: '2rem'
        },

        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            padding: '0 20px'
        },
        searchForm: {
            display: 'flex',
            gap: '1rem',
            maxWidth: '500px',
            width: '100%'
        },
        searchInput: {
            flex: 1,
            padding: '12px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50px',
            color: 'white',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
        },
        searchButton: {
            padding: '12px 25px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '400',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
        },

        categoryFilter: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            padding: '0 20px'
        },
        categoryButton: {
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.8rem',
            fontWeight: '300',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
        },
        activeCategory: {
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            borderColor: 'rgba(255,255,255,0.5)',
            transform: 'translateY(-2px)'
        },

        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            padding: '0 20px'
        },
        productCard: {
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            overflow: 'hidden',
            transition: 'all 0.4s ease',
            position: 'relative'
        },
        productCardHover: {
            transform: 'translateY(-8px)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
        },
        productImage: {
            width: '100%',
            height: '300px',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        productInfo: {
            padding: '1.5rem',
            color: 'white',
            position: 'relative'
        },
        productCategory: {
            fontSize: '0.7rem',
            fontWeight: '300',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '0.6rem'
        },
        productName: {
            fontSize: '1.1rem',
            fontWeight: '300',
            letterSpacing: '1px',
            marginBottom: '0.8rem',
            lineHeight: '1.4',
            color: 'white'
        },
        productPrice: {
            fontSize: '1.3rem',
            fontWeight: '200',
            letterSpacing: '1px',
            marginBottom: '1.2rem'
        },
        viewButton: {
            display: 'inline-block',
            padding: '10px 20px',
            background: 'transparent',
            color: 'white',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '400',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            width: '100%'
        },
        viewButtonHover: {
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)',
            transform: 'translateY(-2px)'
        },

        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.1rem',
            color: 'white'
        },
        noProducts: {
            textAlign: 'center',
            padding: '3rem',
            color: 'rgba(255,255,255,0.6)'
        },
        noProductsTitle: {
            fontSize: '1.3rem',
            marginBottom: '1rem',
            fontWeight: '300'
        },
        errorMessage: {  
            textAlign: 'center',
            padding: '2rem',
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,0,0,0.1)',
            border: '1px solid rgba(255,0,0,0.3)',
            borderRadius: '10px',
            margin: '2rem 20px'
        },
        retryButton: {
            ...styles.viewButton,
            width: 'auto',
            marginTop: '1rem',
            padding: '12px 25px',
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)'
        },
        retryingText: {  // FIX: New style for auto-retry feedback
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            marginTop: '0.5rem'
        }
    };

    const getProductStyle = (index) => {
        const baseStyle = styles.productCard;
        if (hoveredProduct === index) {
            return { ...baseStyle, ...styles.productCardHover };
        }
        return baseStyle;
    };

    const getImageStyle = (index) => {
        const baseStyle = { 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
        };
        if (hoveredProduct === index) {
            return { ...baseStyle, transform: 'scale(1.05)' };
        }
        return baseStyle;
    };

    const getButtonStyle = (index) => {
        const baseStyle = styles.viewButton;
        if (hoveredProduct === index) {
            return { ...baseStyle, ...styles.viewButtonHover };
        }
        return baseStyle;
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    {category || search ? `${category || 'SEARCH'}` : 'COLLECTION'}
                </h1>
                <p style={styles.subtitle}>
                    {category || search 
                        ? `DISCOVER OUR ${category?.toUpperCase() || 'SEARCH'} COLLECTION` 
                        : 'EXPLORE OUR COMPLETE COLLECTION'
                    }
                </p>
                
                <div style={styles.searchContainer}>
                    <form onSubmit={handleSearch} style={styles.searchForm}>
                        <input
                            type="text"
                            placeholder="SEARCH PRODUCTS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.1)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.05)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                        />
                        <button 
                            type="submit" 
                            style={styles.searchButton}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.15)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.1)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            SEARCH
                        </button>
                    </form>
                </div>
            </div>

            <div style={styles.categoryFilter}>
                <Link
                    to="/shop"
                    style={{
                        ...styles.categoryButton,
                        ...(!category && styles.activeCategory)
                    }}
                    onMouseEnter={(e) => {
                        if (!category) return;
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        if (!category) return;
                        e.target.style.background = 'rgba(255,255,255,0.03)';
                        e.target.style.color = 'rgba(255,255,255,0.7)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    ALL
                </Link>
                {categories.filter(cat => cat !== 'All').map(cat => (
                    <Link
                        key={cat}
                        to={`/shop?category=${cat}`}
                        style={{
                            ...styles.categoryButton,
                            ...(category === cat && styles.activeCategory)
                        }}
                        onMouseEnter={(e) => {
                            if (category !== cat) {
                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (category !== cat) {
                                e.target.style.background = 'rgba(255,255,255,0.03)';
                                e.target.style.color = 'rgba(255,255,255,0.7)';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {cat.toUpperCase()}
                    </Link>
                ))}
            </div>

            {loading ? (
                <div style={styles.loading}>LOADING PRODUCTS...</div>
            ) : error ? (
                <div style={styles.errorMessage}>
                    <p>{error}</p>
                    {isRetrying && <p style={styles.retryingText}>Retrying in a moment...</p>}  {/* FIX: Show subtle retry feedback */}
                    <button 
                        onClick={() => { setError(null); fetchProducts(); }}  // FIX: Clear error before retry to avoid loops
                        style={styles.retryButton}
                    >
                        Retry Now
                    </button>
                </div>
            ) : products.length === 0 ? (
                <div style={styles.noProducts}>
                    <h3 style={styles.noProductsTitle}>NO PRODUCTS FOUND</h3>
                    <p>TRY A DIFFERENT CATEGORY OR SEARCH TERM</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            style={getProductStyle(index)}
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div style={styles.productImage}>
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}  // Use full Cloudinary URL from API
                                        alt={product.name}
                                        style={getImageStyle(index)}
                                        loading="lazy"  // For performance
                                        onError={(e) => {
                                            e.target.src = FALLBACK_IMAGE;  // Set fallback SVG
                                            e.target.style.display = 'block';  // Keep visible
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        color: 'rgba(255,255,255,0.3)',
                                        fontSize: '0.8rem',
                                        letterSpacing: '1px'
                                    }}>
                                        NO IMAGE
                                    </div>
                                )}
                            </div>
                            <div style={styles.productInfo}>
                                <div style={styles.productCategory}>{product.category}</div>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <div style={styles.productPrice}>LKR {product.price}</div>
                                <button 
                                    style={getButtonStyle(index)}
                                    onMouseEnter={() => setHoveredProduct(index)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    onClick={() => handleViewDetails(product._id)}
                                >
                                    VIEW DETAILS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;