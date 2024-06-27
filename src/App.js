// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './MainPage';
import UpdateProductPage from './UpdateProductPage';
import ManageProductsPage from './ManageProductsPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/update-product">Update Product</Link>
            </li>
            <li>
              <Link to="/manage-products">Manage Products</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/update-product" element={<UpdateProductPage />} />
          <Route path="/manage-products" element={<ManageProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
