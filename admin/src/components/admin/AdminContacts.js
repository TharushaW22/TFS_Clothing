import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/contactService';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await contactService.getAllContacts();
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError('Failed to load contacts');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (contactId) => {
        try {
            await contactService.markAsRead(contactId);
            setContacts(contacts.map(contact =>
                contact._id === contactId ? { ...contact, status: 'Read' } : contact
            ));
        } catch (error) {
            console.error('Error marking as read:', error);
            setError('Failed to mark as read');
        }
    };

    const deleteContact = async (contactId) => {
        try {
            await contactService.deleteContact(contactId);
            setContacts(contacts.filter(contact => contact._id !== contactId));
        } catch (error) {
            console.error('Error deleting contact:', error);
            setError('Failed to delete contact');
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: '#f8f9fa'
        },
        main: {
            padding: '2rem'
        },
        title: {
            fontSize: '2rem',
            marginBottom: '2rem',
            color: '#333'
        },
        contactsGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        contactCard: {
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        contactHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem'
        },
        contactInfo: {
            flex: 1
        },
        contactName: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        contactEmail: {
            color: '#666',
            marginBottom: '0.5rem'
        },
        contactDate: {
            color: '#999',
            fontSize: '0.9rem'
        },
        statusBadge: {
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
        },
        unread: {
            background: '#e74c3c',
            color: 'white'
        },
        read: {
            background: '#bdc3c7',
            color: 'white'
        },
        message: {
            marginBottom: '1rem',
            color: '#555',
            lineHeight: '1.5'
        },
        actions: {
            display: 'flex',
            gap: '0.5rem'
        },
        actionBtn: {
            padding: '0.25rem 0.75rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem'
        },
        markReadBtn: {
            background: '#3498db',
            color: 'white'
        },
        replyBtn: {
            background: '#27ae60',
            color: 'white'
        },
        deleteBtn: {
            background: '#e74c3c',
            color: 'white'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem',
            color: '#666'
        },
        error: {
            textAlign: 'center',
            padding: '3rem',
            color: '#e74c3c',
            fontSize: '1.2rem'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.main}>
                    <div style={styles.loading}>Loading contacts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.main}>
                    <div style={styles.error}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h1 style={styles.title}>📧 Manage Contacts ({contacts.length})</h1>
                <div style={styles.contactsGrid}>
                    {contacts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                            <h3>No contacts found</h3>
                            <p>Contacts will appear here when customers reach out.</p>
                        </div>
                    ) : (
                        contacts.map(contact => (
                            <div key={contact._id} style={styles.contactCard}>
                                <div style={styles.contactHeader}>
                                    <div style={styles.contactInfo}>
                                        <h3 style={styles.contactName}>{contact.name}</h3>
                                        <p style={styles.contactEmail}>{contact.email}</p>
                                        <p style={styles.contactDate}>
                                            {new Date(contact.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <span
                                        style={{
                                            ...styles.statusBadge,
                                            ...(contact.status === 'Unread' ? styles.unread : styles.read)
                                        }}
                                    >
                                        {contact.status}
                                    </span>
                                </div>

                                <div style={styles.message}>
                                    {contact.message}
                                </div>

                                <div style={styles.actions}>
                                    {contact.status === 'Unread' && (
                                        <button
                                            onClick={() => markAsRead(contact._id)}
                                            style={{ ...styles.actionBtn, ...styles.markReadBtn }}
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        style={{ ...styles.actionBtn, ...styles.replyBtn }}
                                        onClick={() => window.location.href = `mailto:${contact.email}`}
                                    >
                                        Reply via Email
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this contact?')) {
                                                deleteContact(contact._id);
                                            }
                                        }}
                                        style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminContacts;