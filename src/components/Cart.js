import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Cart({ cart, setCart }) {
    const history = useHistory();
    
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const checkout = async () => {
        try {
            console.log('Sending order data:', {
                userId: 1,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: calculateTotal()
            });

            const response = await axios.post('http://localhost:5000/api/orders', {
                userId: 1,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: calculateTotal()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Server response:', response);
            
            if (response.status === 201) {
                setCart([]);
                history.push('/purchase-success');
            }
        } catch (error) {
            console.error('Error details:', error.response || error);
            alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart">
                <h2>Shopping Cart</h2>
                <p>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price * item.quantity}</p>
                </div>
            ))}
            <div className="cart-total">
                <h3>Total: ${calculateTotal()}</h3>
                <button onClick={checkout}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart; 