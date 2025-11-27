import React, { useState, useEffect } from 'react';

const About = () => {
    const [breakpoint, setBreakpoint] = useState('desktop');
    const [isVisible, setIsVisible] = useState(false);

    // Realistic clothing store images
    const images = {
        hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        quality: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        shipping: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        design: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80'
    };

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
        
        setIsVisible(true);
        
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    const fadeInUp = {
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s ease-out'
    };

    const staggerAnimation = (delay) => ({
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: `all 0.8s ease-out ${delay}s`
    });

    const styles = {
        container: {
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            padding: '100px 20px 50px',
            color: 'white',
            overflow: 'hidden'
        },
        content: {
            maxWidth: '1400px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '100px'
        },
        title: {
            fontSize: '5rem',
            fontWeight: '200',
            letterSpacing: '8px',
            marginBottom: '30px',
            textTransform: 'uppercase',
            background: 'linear-gradient(45deg, #fff, #888)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: '1.1'
        },
        subtitle: {
            fontSize: '1.6rem',
            fontWeight: '300',
            opacity: 0.7,
            letterSpacing: '3px',
            marginBottom: '50px'
        },
        heroSection: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            marginBottom: '120px',
            alignItems: 'center'
        },
        heroImage: {
            width: '100%',
            height: '600px',
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
        },
        heroContent: {
            padding: '40px'
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: '200',
            marginBottom: '35px',
            letterSpacing: '3px',
            lineHeight: '1.2'
        },
        heroText: {
            fontSize: '1.3rem',
            lineHeight: '1.8',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '35px',
            fontWeight: '300'
        },
        statsSection: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            marginBottom: '120px'
        },
        statCard: {
            textAlign: 'center',
            padding: '50px 30px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
        },
        statNumber: {
            fontSize: '4rem',
            fontWeight: '100',
            marginBottom: '15px',
            background: 'linear-gradient(45deg, #fff, #aaa)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: '1'
        },
        statLabel: {
            fontSize: '1.1rem',
            fontWeight: '300',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '2px',
            textTransform: 'uppercase'
        },
        featuresSection: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            marginBottom: '120px'
        },
        featureCard: {
            padding: '40px 30px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            transition: 'all 0.4s ease',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
        },
        featureImage: {
            width: '100%',
            height: '250px',
            borderRadius: '15px',
            marginBottom: '35px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
        },
        featureTitle: {
            fontSize: '1.8rem',
            fontWeight: '300',
            marginBottom: '20px',
            letterSpacing: '2px'
        },
        featureText: {
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: '300'
        },
        missionSection: {
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            padding: '100px 60px',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            marginBottom: '120px',
            backdropFilter: 'blur(15px)',
            position: 'relative',
            overflow: 'hidden'
        },
        missionTitle: {
            fontSize: '4rem',
            fontWeight: '200',
            marginBottom: '40px',
            letterSpacing: '4px',
            background: 'linear-gradient(45deg, #fff, #888)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        },
        missionText: {
            fontSize: '1.4rem',
            lineHeight: '1.8',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '900px',
            margin: '0 auto',
            fontWeight: '300'
        },

        // Responsive styles
        mobile: {
            title: { fontSize: '3rem', letterSpacing: '4px', marginBottom: '20px' },
            subtitle: { fontSize: '1.2rem', marginBottom: '30px' },
            heroSection: { gridTemplateColumns: '1fr', gap: '40px', marginBottom: '80px' },
            heroImage: { height: '400px' },
            heroContent: { padding: '0' },
            heroTitle: { fontSize: '2.5rem', marginBottom: '25px' },
            heroText: { fontSize: '1.1rem', marginBottom: '25px' },
            statsSection: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', marginBottom: '80px' },
            statCard: { padding: '30px 20px' },
            statNumber: { fontSize: '3rem' },
            featuresSection: { gridTemplateColumns: '1fr', gap: '30px', marginBottom: '80px' },
            featureCard: { padding: '40px 25px' },
            featureImage: { height: '200px', marginBottom: '25px' },
            missionSection: { padding: '60px 30px', marginBottom: '80px' },
            missionTitle: { fontSize: '3rem', marginBottom: '30px' },
            missionText: { fontSize: '1.2rem' }
        },

        smallMobile: {
            title: { fontSize: '2.2rem', letterSpacing: '2px' },
            subtitle: { fontSize: '1rem' },
            statsSection: { gridTemplateColumns: '1fr', gap: '20px' },
            statCard: { padding: '25px 15px' },
            statNumber: { fontSize: '2.5rem' },
            featureCard: { padding: '30px 20px' },
            missionSection: { padding: '40px 20px' },
            missionTitle: { fontSize: '2.5rem' },
            missionText: { fontSize: '1.1rem' }
        }
    };

    const getResponsiveStyle = (baseStyle, mobileStyle = {}, smallMobileStyle = {}) => {
        let style = { ...baseStyle };
        
        if (breakpoint === 'mobile' || breakpoint === 'smallMobile') {
            style = { ...style, ...mobileStyle };
        }
        if (breakpoint === 'smallMobile') {
            style = { ...style, ...smallMobileStyle };
        }
        
        return style;
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header */}
                <div style={{ ...getResponsiveStyle(styles.header), ...fadeInUp }}>
                    <h1 style={{ ...getResponsiveStyle(styles.title, styles.mobile.title, styles.smallMobile.title), ...fadeInUp }}>
                        ABOUT OUR STORE
                    </h1>
                    <p style={{ ...getResponsiveStyle(styles.subtitle, styles.mobile.subtitle, styles.smallMobile.subtitle), ...fadeInUp }}>
                        Quality Fashion Since 2020
                    </p>
                </div>

                {/* Hero Section */}
                <div style={{ ...getResponsiveStyle(styles.heroSection, styles.mobile.heroSection), ...fadeInUp }}>
                    <div style={{ ...getResponsiveStyle(styles.heroImage, styles.mobile.heroImage) }}>
                        <img 
                            src={images.hero} 
                            alt="Fashion store interior" 
                            style={styles.image}
                        />
                    </div>
                    <div style={getResponsiveStyle(styles.heroContent, styles.mobile.heroContent)}>
                        <h2 style={{ ...getResponsiveStyle(styles.heroTitle, styles.mobile.heroTitle), ...staggerAnimation(0.2) }}>
                            Our Story
                        </h2>
                        <p style={{ ...getResponsiveStyle(styles.heroText, styles.mobile.heroText), ...staggerAnimation(0.4) }}>
                            We started as a local boutique focused on bringing quality fashion to our community. 
                            Our commitment to excellent materials and customer service has been our foundation from day one.
                        </p>
                        <p style={{ ...getResponsiveStyle(styles.heroText, styles.mobile.heroText), ...staggerAnimation(0.6) }}>
                            Today we continue to focus on what matters: well-made clothing that lasts, fair prices, 
                            and treating every customer with respect.
                        </p>
                    </div>
                </div>

                {/* Stats Section - REALISTIC NUMBERS */}
                <div style={getResponsiveStyle(styles.statsSection, styles.mobile.statsSection, styles.smallMobile.statsSection)}>
                    {[
                        { number: '10K+', label: 'Items Sold' },
                        { number: '98%', label: 'Satisfaction Rate' },
                        { number: '24h', label: 'Support Response' },
                        { number: '5★', label: 'Quality Rating' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            style={{
                                ...getResponsiveStyle(styles.statCard, styles.mobile.statCard, styles.smallMobile.statCard),
                                ...staggerAnimation(index * 0.1)
                            }}
                        >
                            <div style={getResponsiveStyle(styles.statNumber, styles.mobile.statNumber, styles.smallMobile.statNumber)}>
                                {stat.number}
                            </div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Section - PROPER IMAGES */}
                <div style={getResponsiveStyle(styles.featuresSection, styles.mobile.featuresSection, styles.smallMobile.featuresSection)}>
                    {[
                        { 
                            title: 'Premium Quality', 
                            text: 'Every piece is crafted with the finest materials and attention to detail, ensuring exceptional quality and durability.',
                            image: images.quality,
                            alt: 'High quality clothing materials'
                        },
                        { 
                            title: 'Fast Shipping', 
                            text: 'Free shipping with express options available. Most orders delivered within 3-7 business days.',
                            image: images.shipping,
                            alt: 'Clothing packaging and delivery'
                        },
                        { 
                            title: 'Modern Design', 
                            text: 'Our designs blend contemporary trends with timeless elegance for everyday wear.',
                            image: images.design,
                            alt: 'Fashion design and styling'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                ...getResponsiveStyle(styles.featureCard, styles.mobile.featureCard, styles.smallMobile.featureCard),
                                ...staggerAnimation(index * 0.15)
                            }}
                        >
                            <div style={getResponsiveStyle(styles.featureImage, styles.mobile.featureImage)}>
                                <img 
                                    src={feature.image} 
                                    alt={feature.alt}
                                    style={styles.image}
                                />
                            </div>
                            <h3 style={styles.featureTitle}>{feature.title}</h3>
                            <p style={styles.featureText}>{feature.text}</p>
                        </div>
                    ))}
                </div>

                {/* Mission Section */}
                <div style={{ ...getResponsiveStyle(styles.missionSection, styles.mobile.missionSection, styles.smallMobile.missionSection), ...fadeInUp }}>
                    <h2 style={{ ...getResponsiveStyle(styles.missionTitle, styles.mobile.missionTitle, styles.smallMobile.missionTitle), ...staggerAnimation(0.2) }}>
                        Our Promise
                    </h2>
                    <p style={{ ...getResponsiveStyle(styles.missionText, styles.mobile.missionText, styles.smallMobile.missionText), ...staggerAnimation(0.4) }}>
                        We're committed to providing honest value - quality clothing at fair prices, clear communication, 
                        and standing behind every item we sell. No exaggerations, just real quality you can trust.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;