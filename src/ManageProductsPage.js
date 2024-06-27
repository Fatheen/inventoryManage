// src/ManageProductsPage.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

function ManageProductsPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      title,
      image,
      quantity
    });
    setTitle("");
    setImage("");
    setQuantity(0);
  };

  const deleteProduct = async () => {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    setProductId("");
  };

  return (
    <div>
      <h1>Manage Products</h1>
      <div>
        <h2>Add Product</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        <button onClick={addProduct}>Add</button>
      </div>
      <div>
        <h2>Delete Product</h2>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <button onClick={deleteProduct}>Delete</button>
      </div>
    </div>
  );
}

export default ManageProductsPage;
