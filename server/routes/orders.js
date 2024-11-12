const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    console.log("Received order:", { userId, items, totalAmount });

    await db.query("START TRANSACTION");

    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price]
      );

      const [stockResult] = await db.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.productId]
      );

      if (stockResult.length === 0) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      const currentStock = stockResult[0].stock;
      if (currentStock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }

      await db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.productId,
      ]);
    }

    await db.query("COMMIT");
    res.status(201).json({ orderId });
  } catch (error) {
    console.error("Order error:", error);
    await db.query("ROLLBACK");
    res.status(500).json({
      message: error.message || "Error processing order",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
});

module.exports = router;
