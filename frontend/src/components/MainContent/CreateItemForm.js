
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import '../../styles/CRUD.css';

const CreateItem = () => {
  const [notification, setNotification] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: '',
    itemPrice: '',
    itemQuantity: ''
  });
  const navigate = useNavigate();

  const addNotification = (type, message, duration) => {
    const id = Date.now();
    setNotification((prev) => [
      ...prev,
      { id, type, message: String(message), duration },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData)
      });

      if (response.ok) {
        addNotification('success', 'Item Created Successfully !!');
        setItemData({
          itemName: '',
          itemPrice: '',
          itemQuantity: ''
        });
        navigate('/home');
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        addNotification('warning', errorText, 5000);
      }
    } catch (error) {
      console.error('Error creating item:', error);
      addNotification('Error While Creating Item');
    }
  };

  const handleCloseNotification = (id) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div >
      {notification.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => handleCloseNotification(notification.id)}
        />
      ))}
      <form onSubmit={handleSubmit} className='crud-form'>
        <h2>Create New Item</h2>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={itemData.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="itemPrice"
          placeholder="Item Price"
          value={itemData.itemPrice}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="itemQuantity"
          placeholder="Item Quantity"
          value={itemData.itemQuantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateItem;

