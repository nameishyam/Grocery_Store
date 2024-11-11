import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList({ cart, setCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }]);
    };

    return (
        <div className="product-list">
            <h2>Available Products</h2>
            <div className="products">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button 
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList; 