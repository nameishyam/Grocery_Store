import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', product);
            setProduct({ name: '', price: '', stock: '' });
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({...product, name: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({...product, price: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) => setProduct({...product, stock: e.target.value})}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct; 