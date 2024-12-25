const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require("./routes/TaskRoutes");
const cors=require("cors");
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();



app.use(express.json());
app.use(cors());
// Routes
app.use('/api', taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Connection Failed:', error));

// Start Server


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


