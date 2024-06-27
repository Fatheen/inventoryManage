// src/MainPage.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './MainPage.css'; // Import the CSS file for styling

function MainPage() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('title');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      sortProducts(productsList);
    };

    fetchProducts();
  }, []);

  const sortProducts = (productsList) => {
    productsList.sort((a, b) => {
      if (a.quantity === 0 && b.quantity !== 0) return 1;
      if (a.quantity !== 0 && b.quantity === 0) return -1;

      if (sortType === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortType === 'quantity') {
        return b.quantity - a.quantity;
      }
      return 0;
    });
    setProducts(productsList);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortProducts([...products]);
  };

  return (
    <div className="main-page">
      <h1>Inventory</h1>
      <div className="sort-container">
        <label>Sort by:</label>
        <select onChange={handleSortChange} value={sortType}>
          <option value="title">Title</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-quantity">Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
