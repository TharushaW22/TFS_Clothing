import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../video/tfsv.mp4';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        setIsLoaded(true);
        
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sectionRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const styles = {
        container: {
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease',
        },

        // Hero Section
        heroSection: {
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        },
        videoBackground: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            filter: 'brightness(0.7) contrast(1.1)',
        },
        canvasOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        },
        heroContent: {
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '0 20px'
        },
        mainTitle: {
            fontSize: 'clamp(4rem, 12vw, 14rem)',
            fontWeight: '200',
            letterSpacing: '15px',
            marginBottom: '2rem',
            background: 'linear-gradient(45deg, #fff, #ccc)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(100px)',
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)',
            textTransform: 'uppercase'
        },
        subtitle: {
            fontSize: '1.1rem',
            fontWeight: '300',
            letterSpacing: '8px',
            marginBottom: '4rem',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
            textTransform: 'uppercase'
        },
        ctaContainer: {
            display: 'flex',
            gap: '2rem',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.6s'
        },
        ctaButton: {
            padding: '20px 45px',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: '400',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            position: 'relative',
            overflow: 'hidden'
        },

        // Collections Section
        collectionsSection: {
            padding: '150px 20px',
            background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
            color: 'white',
            position: 'relative'
        },
        sectionHeader: {
            textAlign: 'center',
            marginBottom: '100px',
            opacity: 0,
            transform: 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
        },
        sectionTitle: {
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '200',
            letterSpacing: '8px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
        },
        sectionSubtitle: {
            fontSize: '0.9rem',
            fontWeight: '300',
            letterSpacing: '4px',
            opacity: 0.5,
            textTransform: 'uppercase'
        },
        collectionsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            maxWidth: '1400px',
            margin: '0 auto'
        },
        collectionCard: {
            position: 'relative',
            height: '600px',
            overflow: 'hidden',
            background: '#000',
            opacity: 0,
            transform: 'translateY(80px)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
        },
        collectionImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        },
        collectionInfo: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '50px 40px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        },
        collectionName: {
            fontSize: '1.8rem',
            fontWeight: '300',
            letterSpacing: '3px',
            marginBottom: '15px',
            textTransform: 'uppercase',
            transform: 'translateY(0)',
            transition: 'all 0.6s ease'
        },
        collectionLink: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            opacity: 0.8,
            transition: 'all 0.4s ease',
            textTransform: 'uppercase',
            display: 'inline-block',
            transform: 'translateY(0)',
            position: 'relative'
        },

        // Final CTA
        finalCta: {
            padding: '200px 20px',
            background: 'linear-gradient(135deg, #000 0%, #0a0a0a 100%)',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        },
        finalCtaContent: {
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0,
            transform: 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
        },
        finalCtaTitle: {
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '200',
            letterSpacing: '6px',
            marginBottom: '2rem',
            textTransform: 'uppercase'
        },
        finalCtaSubtitle: {
            fontSize: '1rem',
            fontWeight: '300',
            letterSpacing: '2px',
            marginBottom: '3rem',
            opacity: 0.7,
            lineHeight: '1.8'
        }
    };

    const collections = [
        {
            name: "Essentials",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            path: "/shop?category=Essentials",
            color: '#8B4513'
        },
        {
            name: "Collection '24",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            path: "/shop?category=New",
            color: '#2F4F4F'
        },
        {
            name: "Accessories",
            image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            path: "/shop?category=Accessories",
            color: '#800020'
        }
    ];

    const stats = [
        {
            number: "24h",
            label: "Delivery",
            description: "Free next day delivery on all orders"
        },
        {
            number: "100%",
            label: "Quality", 
            description: "Premium materials and craftsmanship"
        },
        {
            number: "Exclusive",
            label: "Access",
            description: "Early access to new collections"
        }
    ];

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.heroSection}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={styles.videoBackground}
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>

                <div style={styles.canvasOverlay} />
                
                <div style={styles.heroContent}>
                    <h1 style={styles.mainTitle}>ELEVATE</h1>
                    <p style={styles.subtitle}>Redefining Modern Luxury</p>
                    <div style={styles.ctaContainer}>
                        <Link 
                            to="/shop"
                            style={styles.ctaButton}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'white';
                                e.target.style.color = 'black';
                                e.target.style.borderColor = 'white';
                                e.target.style.transform = 'translateY(-5px)';
                                e.target.style.letterSpacing = '4px';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.letterSpacing = '3px';
                            }}
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section 
                ref={addToRefs}
                style={styles.collectionsSection}
            >
                <div 
                    ref={addToRefs}
                    style={styles.sectionHeader}
                >
                    <h2 style={styles.sectionTitle}>Curated Selections</h2>
                    <p style={styles.sectionSubtitle}>Essential pieces for the modern wardrobe</p>
                </div>
                
                <div style={styles.collectionsGrid}>
                    {collections.map((collection, index) => (
                        <div 
                            key={index}
                            ref={addToRefs}
                            style={{
                                ...styles.collectionCard,
                                transitionDelay: `${index * 0.2}s`
                            }}
                            onMouseEnter={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                const info = e.currentTarget.querySelector('.collection-info');
                                const name = e.currentTarget.querySelector('.collection-name');
                                const link = e.currentTarget.querySelector('.collection-link');
                                
                                if (img) {
                                    img.style.transform = 'scale(1.1)';
                                    img.style.filter = 'brightness(1.2) saturate(1.2)';
                                }
                                if (info) {
                                    info.style.background = `linear-gradient(transparent, ${collection.color}99)`;
                                }
                                if (name) {
                                    name.style.transform = 'translateY(-5px)';
                                    name.style.letterSpacing = '4px';
                                }
                                if (link) {
                                    link.style.opacity = '1';
                                    link.style.letterSpacing = '3px';
                                    link.style.transform = 'translateY(-2px)';
                                    link.style.paddingLeft = '20px';
                                    link.style.borderLeft = `2px solid ${collection.color}`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                const info = e.currentTarget.querySelector('.collection-info');
                                const name = e.currentTarget.querySelector('.collection-name');
                                const link = e.currentTarget.querySelector('.collection-link');
                                
                                if (img) {
                                    img.style.transform = 'scale(1)';
                                    img.style.filter = 'brightness(1) saturate(1)';
                                }
                                if (info) {
                                    info.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.7))';
                                }
                                if (name) {
                                    name.style.transform = 'translateY(0)';
                                    name.style.letterSpacing = '3px';
                                }
                                if (link) {
                                    link.style.opacity = '0.8';
                                    link.style.letterSpacing = '2px';
                                    link.style.transform = 'translateY(0)';
                                    link.style.paddingLeft = '0';
                                    link.style.borderLeft = 'none';
                                }
                            }}
                        >
                            <img 
                                src={collection.image} 
                                alt={collection.name}
                                style={styles.collectionImage}
                            />
                            <div className="collection-info" style={styles.collectionInfo}>
                                <h3 style={styles.collectionName}>{collection.name}</h3>
                                <Link 
                                    to={collection.path} 
                                    style={styles.collectionLink}
                                >
                                    Discover ›
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section - Replaced Features */}
            <section 
                ref={addToRefs}
                style={{
                    padding: '120px 20px',
                    background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 100%)',
                    position: 'relative'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '60px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            ref={addToRefs}
                            style={{
                                textAlign: 'center',
                                padding: '50px 30px',
                                opacity: 0,
                                transform: 'translateY(50px)',
                                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                                transitionDelay: `${index * 0.3}s`
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-10px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '200',
                                color: 'rgba(255,255,255,0.9)',
                                marginBottom: '1rem',
                                letterSpacing: '2px'
                            }}>
                                {stat.number}
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: '400',
                                letterSpacing: '3px',
                                marginBottom: '1rem',
                                color: 'white',
                                textTransform: 'uppercase'
                            }}>
                                {stat.label}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                opacity: 0.6,
                                color: 'white',
                                letterSpacing: '1px',
                                lineHeight: '1.6'
                            }}>
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section 
                ref={addToRefs}
                style={styles.finalCta}
            >
                <div 
                    ref={addToRefs}
                    style={styles.finalCtaContent}
                >
                    <h2 style={styles.finalCtaTitle}>Ready to Elevate?</h2>
                    <p style={styles.finalCtaSubtitle}>
                        Experience the pinnacle of modern luxury and craftsmanship. 
                        Join thousands of discerning customers who have chosen excellence.
                    </p>
                    <Link 
                        to="/shop"
                        style={styles.ctaButton}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.color = 'black';
                            e.target.style.borderColor = 'white';
                            e.target.style.transform = 'translateY(-5px)';
                            e.target.style.letterSpacing = '4px';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'white';
                            e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.letterSpacing = '3px';
                        }}
                    >
                        Begin Your Journey
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;