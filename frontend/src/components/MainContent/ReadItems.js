
import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/CRUD.css';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';

const ReadItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();

    const addNotification = (type, message, duration) => {
        const id = Date.now();
        setNotification((prev) => [
            ...prev,
            { id, type, message: String(message), duration },
        ]);
    };

    const handleCloseNotification = (id) => {
        setNotification((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    const fetchItems = useCallback(async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    addNotification('error', "Your Session is Expired, Login Again", 5000);
                    navigate('/login');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const itemsData = await response.json();
            setItems(itemsData);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError(error.message);
        }
    }, [navigate]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <div>
            <div className='crud-list'>
                {notification.map((notification) => (
                    <Notification
                        key={notification.id}
                        message={notification.message}
                        type={notification.type}
                        duration={notification.duration}
                        onClose={() => handleCloseNotification(notification.id)}
                    />
                ))}
                <h1>Your Items</h1>
                {error && <p className="error-message">{error}</p>}
                <div className='crud-sub-list'>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="crud-item-card">
                                <h2>{item.itemName}</h2>
                                <p>Price: ₹{item.itemPrice}</p>
                                <p>Quantity: {item.itemQuantity}</p>
                                {item.itemImage && <img src={item.itemImage} alt={item.itemName} />}
                            </div>
                        ))
                    ) : (
                        <p>No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadItems;

