import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/CRUD.css';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';

const MyCrudApp = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [id, setId] = useState('');
  const [itemName, setName] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [itemQuantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);

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

  const handleEdit = (item) => {
    setEditingItem(item);
    setId(item.id);
    setName(item.itemName);
    setPrice(item.itemPrice);
    setQuantity(item.itemQuantity);
  };

  const handleCancel = () => {
    setEditingItem(null);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedItem = { id, itemName, itemPrice, itemQuantity };
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');


    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?username=${username}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedItems = items.map((item) =>
          item.id === editingItem.id ? { ...item, ...updatedItem } : item
        );
        setItems(updatedItems);
        setEditingItem(null);
        setName(''); setPrice(''); setQuantity('');
        addNotification('success', "Item Updated Successfully !!", 5000);
      }
    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <div className='edit-card'>

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
        <h1>Click on Edit to Update</h1>
        {error && <p className="error-message">{error}</p>}
        <div className='crud-sub-list'>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="crud-item-card">
                <button onClick={() => handleEdit(item)} className='update-btn'>Edit</button>
                <h2>{item.itemName}</h2>
                <p>Price: ₹{item.itemPrice}</p>
                <p>Quantity: {item.itemQuantity}</p>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>


      {editingItem && (
        <div className='crud-form'>
          <form onSubmit={handleSave} className='crud-form'>
            {error && <p className="error-message">{error}</p>}
            <h2>Edit Item</h2>
            <label name="Name">Name: </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item Name"
            />
            <label name="Price"> Price : </label>
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            <label name="Quantity"> Quantity: </label>
            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <div className='btn-list'>
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCrudApp;
