import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Customer, Photo } from './types';

const API_KEY = 'YOUR_UNSPLASH_API_KEY'; // Replace with your Unsplash API key
const PHOTOS_API = `https://api.unsplash.com/photos/random?count=9&client_id=${API_KEY}`;

const customersData: Customer[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Customer ${index + 1}`,
  title: `Title ${index + 1}`,
  address: `Address ${index + 1}`,
}));

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCustomer) {
      const fetchPhotos = async () => {
        try {
          const response = await axios.get(PHOTOS_API);
          setPhotos(response.data);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };
      fetchPhotos();
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(PHOTOS_API);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }, 10000);

    return () => clearInterval(intervalId);

  }, [selectedCustomer]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedId(customer.id);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <h2>Customer List</h2>
        {customersData.map((customer) => (
          <div
            key={customer.id}
            className={`customer-card ${selectedId === customer.id ? 'selected' : ''}`}
            onClick={() => handleCustomerClick(customer)}
          >
            <h3>{customer.name}</h3>
            <p>{customer.title}</p>
          </div>
        ))}
      </div>
      <div className="right-panel">
        {selectedCustomer ? (
          <div>
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Title:</strong> {selectedCustomer.title}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <div className="photo-grid">
              {photos.map((photo) => (
                <img key={photo.id} src={photo.urls.small} alt="Customer" />
              ))}
            </div>
          </div>
        ) : (
          <p>Select a customer to view details</p>
        )}
      </div>
    </div>
  );
};

export default App;
