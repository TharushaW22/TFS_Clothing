import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [error, setError] = useState(null);
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
        setError(null);
        setIsRetrying(false);

        try {
            const response = await productService.getProducts({ category, search });
            setProducts(response.data);
        } catch (err) {
            console.error('Error fetching products:', err);

            if (err.code === 'ECONNABORTED') {
                setError('Service is starting up — please wait a moment.');
                setIsRetrying(true);

                setTimeout(() => {
                    setIsRetrying(false);
                    fetchProducts();
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
        navigate(`/product/${productId}`);
    };

    const categories = ['All', 'Men', 'Women', 'Kids', 'Office', 'Accessories'];

    const FALLBACK_IMAGE =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

    // ---- STYLES (NO TDZ ERRORS) ----
    const viewButtonBase = {
        display: 'inline-block',
        padding: '10px 20px',
        background: 'transparent',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '50px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        width: '100%',
        transition: '0.3s',
        letterSpacing: '1px',
        fontSize: '0.75rem'
    };

    const styles = {
        container: {
            width: '100%',
            padding: '4rem 0 2rem',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            minHeight: '100vh'
        },
        header: {
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem'
        },
        title: {
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '300',
            letterSpacing: '3px'
        },
        subtitle: {
            opacity: 0.7,
            letterSpacing: '1px',
            fontSize: '1rem'
        },
        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '0 20px'
        },
        productCard: {
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: '0.4s'
        },
        productCardHover: {
            transform: 'translateY(-8px)',
            borderColor: 'rgba(255,255,255,0.4)',
            background: 'rgba(255,255,255,0.05)'
        },
        viewButton: viewButtonBase,
        viewButtonHover: {
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)'
        },
        retryButton: {
            ...viewButtonBase,
            width: 'auto',
            marginTop: '1rem',
            padding: '12px 25px',
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)'
        },
        errorMessage: {
            background: 'rgba(255,0,0,0.15)',
            border: '1px solid rgba(255,0,0,0.3)',
            padding: '2rem',
            margin: '2rem 20px',
            borderRadius: '10px',
            color: 'white',
            textAlign: 'center'
        }
    };

    const getProductStyle = (i) =>
        hoveredProduct === i
            ? { ...styles.productCard, ...styles.productCardHover }
            : styles.productCard;

    const getImageStyle = (i) => ({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: '0.4s',
        transform: hoveredProduct === i ? 'scale(1.05)' : 'scale(1)'
    });

    const getButtonStyle = (i) =>
        hoveredProduct === i
            ? { ...styles.viewButton, ...styles.viewButtonHover }
            : styles.viewButton;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{category || search ? category : 'COLLECTION'}</h1>
                <p style={styles.subtitle}>
                    {category || search
                        ? `DISCOVER OUR ${category.toUpperCase()} COLLECTION`
                        : 'EXPLORE OUR COMPLETE COLLECTION'}
                </p>

                {/* Search */}
                <div style={styles.searchContainer}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', width: '400px', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="SEARCH PRODUCTS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px 18px',
                                borderRadius: '50px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '12px 25px',
                                borderRadius: '50px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white',
                                letterSpacing: '2px'
                            }}
                        >
                            SEARCH
                        </button>
                    </form>
                </div>
            </div>

            {/* ERRORS */}
            {loading ? (
                <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>LOADING...</div>
            ) : error ? (
                <div style={styles.errorMessage}>
                    <p>{error}</p>
                    {isRetrying && <p>Retrying...</p>}
                    <button
                        onClick={() => fetchProducts()}
                        style={styles.retryButton}
                    >
                        Retry Now
                    </button>
                </div>
            ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
                    <h3>No Products Found</h3>
                </div>
            ) : (
                <div style={styles.grid}>
                    {products.map((product, i) => (
                        <div
                            key={product._id}
                            style={getProductStyle(i)}
                            onMouseEnter={() => setHoveredProduct(i)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div style={{ height: '300px', overflow: 'hidden' }}>
                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    style={getImageStyle(i)}
                                    onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                                />
                            </div>

                            <div style={{ padding: '1.5rem', color: 'white' }}>
                                <div style={{ opacity: 0.6 }}>{product.category}</div>
                                <h3>{product.name}</h3>
                                <div>LKR {product.price}</div>

                                <button
                                    style={getButtonStyle(i)}
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
