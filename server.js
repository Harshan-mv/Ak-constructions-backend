const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

//
// 🔥 CORS CONFIG (IMPORTANT)
//
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ak-construction-frontend.vercel.app"
  ],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploads)
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Arkitektur API is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});