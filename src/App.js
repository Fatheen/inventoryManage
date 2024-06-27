// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './MainPage';
import UpdateProductPage from './UpdateProductPage';
import ManageProductsPage from './ManageProductsPage';
import DailyShippingPage from './DailyShippingPage'; // Import the DailyShippingPage
import StatisticsPage from './StatisticsPage'; // Import the new component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Main Page</Link></li>
            <li><Link to="/update-product">Update Inventory -- USE THIS TO ADD PRODUCTS</Link></li>
            
            <li><Link to="/daily-shipping">Daily Shipping -- USE THIS TO SUBTRACT SHIPPED PRODUCTS</Link></li>
            <li><Link to="/statistics">Statistics</Link></li> 
            <li><Link to="/manage-products">Edit/Add New Product Items</Link></li>{/* Add link to new page */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/update-product" element={<UpdateProductPage />} />
          <Route path="/manage-products" element={<ManageProductsPage />} />
          <Route path="/daily-shipping" element={<DailyShippingPage />} />
          <Route path="/statistics" element={<StatisticsPage />} /> {/* Add route to new page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
