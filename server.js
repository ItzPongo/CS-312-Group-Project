// server.js
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',
  database: 'expensesdb',  
  password: 'KingPig2003', 
  port: 5432,
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API route: GET all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/expenses error:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
  }
});

// API route: POST a new expense
app.post('/api/expenses', async (req, res) => {
  const { amount, date, category, description } = req.body;
  try {
    await pool.query(
      'INSERT INTO expenses (amount, date, category, description) VALUES ($1, $2, $3, $4)',
      [amount, date, category, description]
    );
    res.status(201).json({ message: 'Expense added' });
  } catch (err) {
    console.error('POST /api/expenses error:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
  }
});

// API route: GET a single expense by ID
app.get('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`GET /api/expenses/${id} error:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route: UPDATE an expense by ID
app.put('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, date, category, description } = req.body;
  try {
    await pool.query(
      'UPDATE expenses SET amount = $1, date = $2, category = $3, description = $4 WHERE id = $5',
      [amount, date, category, description, id]
    );
    res.status(200).json({ message: 'Expense updated' });
  } catch (err) {
    console.error(`PUT /api/expenses/${id} error:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route: DELETE an expense by ID
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(`DELETE /api/expenses/${id} error:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
