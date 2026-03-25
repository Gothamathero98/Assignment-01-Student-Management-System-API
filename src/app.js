import 'dotenv/config';           // To load environment variables (from .env file)
import express from 'express';     // To import the Express Framework
import cors from 'cors';           // To allow requests from different origins (URLs)
import helmet from 'helmet';       // To increase app security (by setting HTTP headers)
import connectDB from './config/database.js';       // To connect to the Database
import studentRoutes from './routes/studentRoutes.js'; // To get the Student-related Routes
import errorHandler from './middleware/errorHandler.js'; // To handle errors (Error Management)
import logger from './middleware/logger.js';       // To record/log Request details
import rateLimiter from './middleware/rateLimiter.js'; // To limit the number of Requests


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(logger);
app.use(rateLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/students', studentRoutes);

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK...', message: 'Server is running...' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', ( _, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found...'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port :  ${process.env.PORT} ...`);
});

export default app;