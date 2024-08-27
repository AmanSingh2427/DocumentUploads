// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const authRoutes = require('./routes/userRoutes');

const app = express();

// Enable CORS for all origins or specify particular origins
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Allow credentials like cookies, authorization headers, etc.
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});