// src/StatisticsPage.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './StatisticsPage.css'; // Import the CSS file for styling

function StatisticsPage() {
  const [shippingLogs, setShippingLogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchShippingLogs = async () => {
      const shippingCollection = collection(db, "dailyShipments");
      const shippingSnapshot = await getDocs(shippingCollection);
      const logs = shippingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShippingLogs(logs);
    };

    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchShippingLogs();
    fetchProducts();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedMonth('');
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDate('');
  };

  const getMonthlyAggregatedData = (month) => {
    const monthlyLogs = shippingLogs.filter(log => log.date.startsWith(month));
    const aggregatedData = {};

    monthlyLogs.forEach(log => {
      for (const [productId, quantity] of Object.entries(log.products)) {
        if (!aggregatedData[productId]) {
          aggregatedData[productId] = 0;
        }
        aggregatedData[productId] += quantity;
      }
    });

    return aggregatedData;
  };

  const selectedLog = shippingLogs.find(log => log.date === selectedDate);
  const aggregatedData = selectedMonth ? getMonthlyAggregatedData(selectedMonth) : null;

  return (
    <div className="statistics-page">
      <h1>Statistics</h1>
      <div className="date-selector">
        <label htmlFor="date-select">Select Date:</label>
        <select id="date-select" onChange={handleDateChange} value={selectedDate}>
          <option value="">Select a date</option>
          {shippingLogs.map(log => (
            <option key={log.id} value={log.date}>{log.date}</option>
          ))}
        </select>
      </div>
      {selectedLog && (
        <table className="shipping-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Shipped</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedLog.products).map(([productId, quantity]) => {
              const product = products.find(p => p.id === productId);
              const productName = product ? product.title : productId; // Default to ID if product not found
              return (
                <tr key={productId}>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="month-selector">
        <label htmlFor="month-select">Select Month:</label>
        <select id="month-select" onChange={handleMonthChange} value={selectedMonth}>
          <option value="">Select a month</option>
          {[...new Set(shippingLogs.map(log => log.date.substring(0, 7)))].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      {aggregatedData && (
        <table className="shipping-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Quantity Shipped</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(aggregatedData).map(([productId, quantity]) => {
              const product = products.find(p => p.id === productId);
              const productName = product ? product.title : productId; // Default to ID if product not found
              return (
                <tr key={productId}>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StatisticsPage;
