const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

let items = [
  { id: 101, name: "Blue Backpack", status: "lost", location: "Library", date: "2024-03-20" },
  { id: 102, name: "iPhone 13", status: "found", location: "Cafeteria", date: "2024-03-24" }
];

app.get('/', (req, res) => {
  res.send('Item Service is running! Please use /api/items to interact with the API.');
});

app.get('/api/items', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(items.filter(i => i.status === status));
  }
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = Object.assign({}, req.body, { id: Date.now() });
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.get('/status', (req, res) => {
  res.send('Service is running');
});

app.listen(PORT, () => {
  console.log(`Item Service running on http://localhost:${PORT}`);
});