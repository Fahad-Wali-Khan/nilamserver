const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://nilambagnirman.com' }));
app.use(express.json());

// ─── DB Connection ───────────────────────────────────────────
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ztdmgkqq_admin',     // e.g. ztdmgkqq_dbuser
  password: 'Nilam@123',
  database: 'ztdmgkqq_nilamdb'  // e.g. ztdmgkqq_nilamdb
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL Connected!');
});

// ─── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'API is running ✅' });
});

// ─── CREATE — Add a product ───────────────────────────────────
app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
  db.query(sql, [name, price, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  });
});

// ─── READ ALL — Get all products ──────────────────────────────
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ─── READ ONE — Get single product by ID ─────────────────────
app.get('/api/products/:id', (req, res) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

// ─── UPDATE — Update a product by ID ─────────────────────────
app.put('/api/products/:id', (req, res) => {
  const { name, price, description } = req.body;

  const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
  db.query(sql, [name, price, description, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  });
});

// ─── DELETE — Delete a product by ID ─────────────────────────
app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  });
});

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
