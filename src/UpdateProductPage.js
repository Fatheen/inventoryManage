// src/UpdateProductPage.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './UpdateProductPage.css'; // Import the CSS file for styling

function UpdateProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const updateQuantity = async (productId, change) => {
    const productRef = doc(db, "products", productId);
    const newQuantity = selectedProduct.quantity + change;
    await updateDoc(productRef, {
      quantity: newQuantity
    });
    setSelectedProduct({ ...selectedProduct, quantity: newQuantity });
  };

  const handleProductSelect = (e) => {
    const selected = products.find(p => p.id === e.target.value);
    setSelectedProduct(selected);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? '' : value);
  };

  return (
    <div className="update-product-page">
      <h1>Update Product</h1>
      <h4>If you want to subtract shipped items ONLY use Daily Shipping Page</h4>
      {!selectedProduct && (
        <select onChange={handleProductSelect}>
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.title}</option>
          ))}
        </select>
      )}
      {selectedProduct && (
        <div className="product-card">
          <img src={selectedProduct.image} alt={selectedProduct.title} className="product-image" />
          <h2 className="product-title">{selectedProduct.title}</h2>
          <p className="product-quantity">Quantity: {selectedProduct.quantity}</p>
          <div className="numpad">
            <button 
              className="numpad-button minus" 
              onClick={() => updateQuantity(selectedProduct.id, -quantity)}
            >-</button>
            <input 
              type="number" 
              className="numpad-input" 
              value={quantity} 
              onChange={handleQuantityChange} 
              placeholder="1"
            />
            <button 
              className="numpad-button plus" 
              onClick={() => updateQuantity(selectedProduct.id, quantity)}
            >+</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProductPage;
