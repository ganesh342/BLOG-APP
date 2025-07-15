const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1); // Exit the app if DB connection fails
});


app.use('/api/blogs', blogRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
