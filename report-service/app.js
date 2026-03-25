const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());

let reports = [
  { id: 1001, itemId: 101, userId: 2, claimMessage: "I saw this backpack near the front desk.", status: "open" },
  { id: 1002, itemId: 102, userId: 1, claimMessage: "This is my iPhone! I have the passcode.", status: "resolved" }
];

app.get('/', (req, res) => {
  res.send('Report Service is running! Please use /api/reports to interact with the API.');
});

app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.post('/api/reports', (req, res) => {
  const newReport = Object.assign({}, req.body, { id: Date.now() });
  reports.push(newReport);
  res.status(201).json(newReport);
});

app.get('/api/reports/:id', (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json(report);
});

app.get('/status', (req, res) => {
  res.send('Service is running');
});

app.listen(PORT, () => {
  console.log(`Report Service running on http://localhost:${PORT}`);
});