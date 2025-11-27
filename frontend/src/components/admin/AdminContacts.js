import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data - replace with actual API call
    useEffect(() => {
        setTimeout(() => {
            setContacts([
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    message: 'I have a question about sizing.',
                    status: 'Unread',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    message: 'When will the new collection be available?',
                    status: 'Read',
                    createdAt: new Date(Date.now() - 86400000).toISOString()
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const markAsRead = (contactId) => {
        setContacts(contacts.map(contact =>
            contact._id === contactId ? { ...contact, status: 'Read' } : contact
        ));
    };

    const deleteContact = (contactId) => {
        setContacts(contacts.filter(contact => contact._id !== contactId));
    };

    const styles = {
        container: {
            marginLeft: '250px',
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
            padding: '3px 8px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
        },
        unread: {
            background: '#e74c3c',
            color: 'white'
        },
        read: {
            background: '#27ae60',
            color: 'white'
        },
        message: {
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            borderLeft: '3px solid #000'
        },
        actions: {
            display: 'flex',
            gap: '1rem'
        },
        actionBtn: {
            padding: '5px 10px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '0.8rem'
        },
        markReadBtn: {
            background: '#3498db',
            color: 'white'
        },
        deleteBtn: {
            background: '#e74c3c',
            color: 'white'
        },
        replyBtn: {
            background: '#27ae60',
            color: 'white'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem'
        },
        noContacts: {
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <AdminSidebar />
                <AdminHeader />
                <div style={styles.loading}>Loading contact queries...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <AdminSidebar />
            <AdminHeader />

            <main style={styles.main}>
                <h1 style={styles.title}>Contact Queries</h1>

                <div style={styles.contactsGrid}>
                    {contacts.length === 0 ? (
                        <div style={styles.noContacts}>
                            <h3>No contact queries</h3>
                            <p>Customer queries will appear here.</p>
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
                                        onClick={() => deleteContact(contact._id)}
                                        style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminContacts;