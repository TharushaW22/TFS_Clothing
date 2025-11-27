import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/contactService.js';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [breakpoint, setBreakpoint] = useState('desktop');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await contactService.createContact(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
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
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    const styles = {
        container: {
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            padding: '100px 20px 50px',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            '@media (max-width: 1024px)': {
                padding: '80px 15px 40px'
            },
            '@media (max-width: 768px)': {
                padding: '60px 10px 30px'
            },
            '@media (max-width: 480px)': {
                padding: '40px 5px 20px'
            }
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '60px',
            '@media (max-width: 768px)': {
                marginBottom: '40px'
            },
            '@media (max-width: 480px)': {
                marginBottom: '30px'
            }
        },
        title: {
            fontSize: '3.5rem',
            fontWeight: '300',
            letterSpacing: '3px',
            marginBottom: '15px',
            textTransform: 'uppercase',
            background: 'linear-gradient(45deg, #fff, #ccc)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            '@media (max-width: 1024px)': {
                fontSize: '3rem',
                letterSpacing: '2px'
            },
            '@media (max-width: 768px)': {
                fontSize: '2.5rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '2rem'
            }
        },
        subtitle: {
            fontSize: '1.2rem',
            fontWeight: '300',
            opacity: 0.8,
            letterSpacing: '1px',
            lineHeight: '1.6',
            '@media (max-width: 768px)': {
                fontSize: '1.1rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '1rem'
            }
        },
        contactContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'start',
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '30px'
            },
            '@media (max-width: 480px)': {
                gap: '20px'
            }
        },
        infoSection: {
            padding: '40px',
            '@media (max-width: 768px)': {
                padding: '30px'
            },
            '@media (max-width: 480px)': {
                padding: '20px'
            }
        },
        infoTitle: {
            fontSize: '1.8rem',
            fontWeight: '300',
            marginBottom: '30px',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.9)',
            '@media (max-width: 768px)': {
                fontSize: '1.6rem',
                marginBottom: '20px'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.4rem',
                marginBottom: '15px'
            }
        },
        contactItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            padding: '25px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '@media (max-width: 768px)': {
                padding: '20px',
                marginBottom: '20px'
            },
            '@media (max-width: 480px)': {
                padding: '15px',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '10px'
            }
        },
        contactItemHover: {
            background: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.2)',
            transform: 'translateY(-2px)'
        },
        contactIcon: {
            fontSize: '2.2rem',
            marginRight: '20px',
            opacity: 0.8,
            transition: 'all 0.3s ease',
            '@media (max-width: 480px)': {
                marginRight: '0',
                fontSize: '2rem'
            }
        },
        contactText: {
            flex: 1
        },
        contactLabel: {
            fontSize: '1rem',
            fontWeight: '500',
            marginBottom: '8px',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.5px',
            '@media (max-width: 480px)': {
                fontSize: '0.9rem'
            }
        },
        contactValue: {
            fontSize: '0.95rem',
            fontWeight: '300',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.5',
            '@media (max-width: 480px)': {
                fontSize: '0.85rem'
            }
        },
        formSection: {
            background: 'rgba(255,255,255,0.02)',
            padding: '40px',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            '@media (max-width: 768px)': {
                padding: '30px'
            },
            '@media (max-width: 480px)': {
                padding: '20px'
            }
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            '@media (max-width: 480px)': {
                gap: '20px'
            }
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '10px',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '1px',
            '@media (max-width: 480px)': {
                fontSize: '0.85rem',
                marginBottom: '8px'
            }
        },
        input: {
            padding: '16px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            fontSize: '1rem',
            color: 'white',
            transition: 'all 0.3s ease',
            outline: 'none',
            fontFamily: 'inherit',
            '@media (max-width: 480px)': {
                padding: '14px 16px',
                fontSize: '0.95rem'
            }
        },
        inputFocus: {
            borderColor: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.1)'
        },
        textarea: {
            padding: '16px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            fontSize: '1rem',
            color: 'white',
            minHeight: '140px',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            '@media (max-width: 480px)': {
                minHeight: '120px',
                padding: '14px 16px',
                fontSize: '0.95rem'
            }
        },
        textareaFocus: {
            borderColor: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.1)'
        },
        submitBtn: {
            padding: '18px 30px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            marginTop: '10px',
            fontFamily: 'inherit',
            '@media (max-width: 480px)': {
                padding: '16px 24px',
                fontSize: '0.95rem'
            }
        },
        submitBtnHover: {
            background: 'rgba(255,255,255,0.15)',
            borderColor: 'rgba(255,255,255,0.5)',
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        },
        submitBtnDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
            transform: 'none'
        },
        mapSection: {
            gridColumn: '1 / -1',
            marginTop: '50px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            '@media (max-width: 768px)': {
                marginTop: '30px'
            },
            '@media (max-width: 480px)': {
                marginTop: '20px'
            }
        },
        mapPlaceholder: {
            height: '300px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.1rem',
            fontWeight: '300',
            '@media (max-width: 768px)': {
                height: '250px',
                fontSize: '1rem'
            },
            '@media (max-width: 480px)': {
                height: '200px',
                fontSize: '0.9rem'
            }
        },
        successMessage: {
            background: 'rgba(46, 204, 113, 0.1)',
            border: '1px solid rgba(46, 204, 113, 0.3)',
            color: '#2ecc71',
            padding: '18px',
            borderRadius: '10px',
            marginBottom: '25px',
            textAlign: 'center',
            fontSize: '0.95rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            '@media (max-width: 480px)': {
                padding: '15px',
                fontSize: '0.9rem',
                marginBottom: '20px'
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
        contactItems: {},
        submitBtn: false,
        inputs: {}
    });

    const handleMouseEnter = (type, id) => {
        setHoverStates(prev => ({
            ...prev,
            [type]: { ...prev[type], [id]: true }
        }));
    };

    const handleMouseLeave = (type, id) => {
        setHoverStates(prev => ({
            ...prev,
            [type]: { ...prev[type], [id]: false }
        }));
    };

    const handleFocus = (field) => {
        setHoverStates(prev => ({
            ...prev,
            inputs: { ...prev.inputs, [field]: true }
        }));
    };

    const handleBlur = (field) => {
        setHoverStates(prev => ({
            ...prev,
            inputs: { ...prev.inputs, [field]: false }
        }));
    };

    return (
        <div style={getResponsiveStyle(styles.container, breakpoint)}>
            <div style={getResponsiveStyle(styles.content, breakpoint)}>
                <div style={getResponsiveStyle(styles.header, breakpoint)}>
                    <h1 style={getResponsiveStyle(styles.title, breakpoint)}>Contact Us</h1>
                    <p style={getResponsiveStyle(styles.subtitle, breakpoint)}>
                        Get in touch with our team - we're here to help you with any questions or concerns
                    </p>
                </div>

                <div style={getResponsiveStyle(styles.contactContainer, breakpoint)}>
                    {/* Contact Information */}
                    <div style={getResponsiveStyle(styles.infoSection, breakpoint)}>
                        <h2 style={getResponsiveStyle(styles.infoTitle, breakpoint)}>Get In Touch</h2>
                        
                        {[
                            {
                                id: 'address',
                                icon: '📍',
                                label: 'Our Address',
                                value: '123 Fashion Street\nNew York, NY 10001\nUnited States'
                            },
                            {
                                id: 'phone',
                                icon: '📞',
                                label: 'Phone Number',
                                value: '+1 (555) 123-4567\nMon-Fri: 9AM - 6PM EST'
                            },
                            {
                                id: 'email',
                                icon: '✉️',
                                label: 'Email Address',
                                value: 'info@fashionstore.com\nsupport@fashionstore.com'
                            },
                            {
                                id: 'hours',
                                icon: '🕒',
                                label: 'Business Hours',
                                value: 'Monday - Friday: 9AM - 6PM\nSaturday: 10AM - 4PM\nSunday: Closed'
                            }
                        ].map((item, index) => (
                            <div
                                key={item.id}
                                style={{
                                    ...getResponsiveStyle(styles.contactItem, breakpoint),
                                    ...(hoverStates.contactItems?.[item.id] ? styles.contactItemHover : {})
                                }}
                                onMouseEnter={() => handleMouseEnter('contactItems', item.id)}
                                onMouseLeave={() => handleMouseLeave('contactItems', item.id)}
                            >
                                <div 
                                    style={{
                                        ...getResponsiveStyle(styles.contactIcon, breakpoint),
                                        ...(hoverStates.contactItems?.[item.id] ? { transform: 'scale(1.1)' } : {})
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div style={getResponsiveStyle(styles.contactText, breakpoint)}>
                                    <div style={getResponsiveStyle(styles.contactLabel, breakpoint)}>{item.label}</div>
                                    <div style={getResponsiveStyle(styles.contactValue, breakpoint)}>
                                        {item.value.split('\n').map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div style={getResponsiveStyle(styles.formSection, breakpoint)}>
                        <h2 style={getResponsiveStyle(styles.infoTitle, breakpoint)}>Send us a Message</h2>
                        
                        {success && (
                            <div style={getResponsiveStyle(styles.successMessage, breakpoint)}>
                                ✅ Thank you! Your message has been sent successfully.
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} style={getResponsiveStyle(styles.form, breakpoint)}>
                            {[
                                { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Enter your full name' },
                                { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'Enter your email address' },
                                { name: 'subject', label: 'Subject *', type: 'text', placeholder: 'What is this regarding?' }
                            ].map(field => (
                                <div key={field.name} style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                    <label style={getResponsiveStyle(styles.label, breakpoint)}>{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus(field.name)}
                                        onBlur={() => handleBlur(field.name)}
                                        required
                                        style={{
                                            ...getResponsiveStyle(styles.input, breakpoint),
                                            ...(hoverStates.inputs?.[field.name] ? styles.inputFocus : {})
                                        }}
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            ))}
                            
                            <div style={getResponsiveStyle(styles.formGroup, breakpoint)}>
                                <label style={getResponsiveStyle(styles.label, breakpoint)}>Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={() => handleBlur('message')}
                                    required
                                    style={{
                                        ...getResponsiveStyle(styles.textarea, breakpoint),
                                        ...(hoverStates.inputs?.message ? styles.textareaFocus : {})
                                    }}
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                style={{
                                    ...getResponsiveStyle(styles.submitBtn, breakpoint),
                                    ...(hoverStates.submitBtn && !loading ? styles.submitBtnHover : {}),
                                    ...(loading ? styles.submitBtnDisabled : {})
                                }}
                                disabled={loading}
                                onMouseEnter={() => !loading && setHoverStates(prev => ({ ...prev, submitBtn: true }))}
                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, submitBtn: false }))}
                            >
                                {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div style={getResponsiveStyle(styles.mapSection, breakpoint)}>
                    <div style={getResponsiveStyle(styles.mapPlaceholder, breakpoint)}>
                        📍 Interactive Map - Store Location
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;