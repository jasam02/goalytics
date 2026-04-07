require('dotenv').config();

const express = require('express');
const cors = require('cors');
const matchesRoutes = require('./routes/matches.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', matchesRoutes);

app.get('/health', (_, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});