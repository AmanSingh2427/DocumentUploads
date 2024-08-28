// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const authRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/uploadRoutes');
const excelRoutes = require('./routes/excelRoutes');
const userRoutes = require('./routes/navRoutes');


const app = express();

// Enable CORS for all origins or specify particular origins
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Allow credentials like cookies, authorization headers, etc.
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', fileRoutes);
app.use('/api', excelRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
