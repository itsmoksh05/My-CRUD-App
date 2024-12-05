import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/CRUD.css';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import ConfirmationPopup from '../ConfirmationPopup';

const MyCrudApp = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const addNotification = (type, message, duration = 3000) => {
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
          alert("Your session has expired, please log in again");
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

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    if (itemToDelete) {
      deleteItem(itemToDelete);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setItemToDelete(null);
  };

  const deleteItem = async (item) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${item.id}?username=${username}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((currentItem) => currentItem.id !== item.id));
        addNotification('success', "Item deleted successfully!");
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.message);
      addNotification('error', "Failed to delete item.");
    }
  };

  return (
    <div>
      {notification.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => handleCloseNotification(notification.id)}
        />
      ))}
      <div className='crud-list'>
        <h1>Click on Delete to Delete Item</h1>
        {error && <p className="error-message">{error}</p>}
        <div className='crud-sub-list'>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="crud-item-card">
                <button onClick={() => handleDelete(item)} className='delete-btn'>Delete</button>
                <h2>{item.itemName}</h2>
                <p>Price: ₹{item.itemPrice}</p>
                <p>Quantity: {item.itemQuantity}</p>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
          {showConfirmation && (
            <ConfirmationPopup
              message="Are you sure you want to delete this item?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCrudApp;
