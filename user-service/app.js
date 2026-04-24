const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let users = [
  { id: 1, name: "Dhanush", email: "dhanush22@gmail.com", phone: "9876543210" },
  { id: 2, name: "Gokul Chand Reddy", email: "gokulchand@gmail.com", phone: "9265874143" }
];

app.get('/', (req, res) => {
  res.send('User Service is running! Please use /api/users to interact with the API.');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = Object.assign({}, req.body, { id: Date.now() });
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.get('/status', (req, res) => {
  res.send('Service is running');
});

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});
