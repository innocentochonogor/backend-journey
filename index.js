const jwt = require('jsonwebtoken');

require('dotenv').config();

const bcrypt = require('bcryptjs');

const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(express.json());

const db = new DatabaseSync('users.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    password TEXT NOT NULL
  )
`);

// GET all users
app.get('/users', (req, res) => {
  const rows = db.prepare('SELECT id, name, age FROM users').all();
  res.json(rows);
});

// GET one user
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = db.prepare('SELECT id, name, age FROM users WHERE id = ?').get(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// POST create user
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  const insert = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
  const result = insert.run(name, age);

  const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newUser);
});

app.post('/register', (req, res) => {
  const { name, age, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const insert = db.prepare('INSERT INTO users (name, age, password) VALUES (?, ?, ?)');
  const result = insert.run(name, age, hashedPassword);

  const newUser = db.prepare('SELECT id, name, age FROM users WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newUser);
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE name = ?').get(name);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordMatches = bcrypt.compareSync(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: "Login successful", token });
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, age } = req.body;

  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: "User not found" });
  }

  db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?').run(name, age, id);
  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  res.json(updated);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);

  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: "User not found" });
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  res.json({ message: "User deleted" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

