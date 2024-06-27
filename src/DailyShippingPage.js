// src/DailyShippingPage.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import './DailyShippingPage.css'; // Import the CSS file for styling

function DailyShippingPage() {
  const [products, setProducts] = useState([]);
  const [shipments, setShipments] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const handleShipmentChange = (productId, value) => {
    setShipments(prevShipments => ({
      ...prevShipments,
      [productId]: value
    }));
  };

  const handleSave = async () => {
    const today = new Date().toISOString().split('T')[0];
    const shipmentData = { date: today, products: shipments };
    await addDoc(collection(db, "dailyShipments"), shipmentData);

    for (const productId in shipments) {
      const productRef = doc(db, "products", productId);
      const product = products.find(p => p.id === productId);
      const newQuantity = product.quantity - shipments[productId];
      await updateDoc(productRef, { quantity: newQuantity });
    }

    alert("Daily shipments saved/subtracted successfully!");
  };

  return (
    <div className="daily-shipping-page">
      <h1>Daily Shipping</h1>
      <form>
        {products.map(product => (
          <div key={product.id} className="product-shipping">
            <label>{product.title}</label>
            <input
              type="number"
              min="0"
              value={shipments[product.id] || ''}
              onChange={(e) => handleShipmentChange(product.id, parseInt(e.target.value) || 0)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave}>Save and subtract from inventory</button>
      </form>
    </div>
  );
}

export default DailyShippingPage;
