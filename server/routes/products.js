const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, price, stock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
