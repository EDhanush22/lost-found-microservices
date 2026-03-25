const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let users = [
  { id: 1, name: "Alice", email: "alice@example.com", phone: "555-0101" },
  { id: 2, name: "Bob", email: "bob@example.com", phone: "555-0202" }
];

app.get('/', (req, res) => {
  res.send('User Service is running! Please use /api/users to interact with the API.');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});