import React from "react";
import { Link } from "react-router-dom";

function PurchaseSuccess() {
  return (
    <div className="purchase-success">
      <div className="success-content">
        <h1>🎉 Thank You for Your Purchase! 🎉</h1>
        <p>Your order has been successfully placed.</p>
        <p>We'll process your order soon.</p>
        <div className="success-actions">
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
