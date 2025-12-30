const express = require('express');
const dotenv =require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://real-estate-property-analysis.vercel.app",
    process.env.FRONTEND_URL        
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', cors());
app.use(express.json());
app.use('/api/properties', require('./src/routes/propertyRoutes'));
const errorHandler = require('./src/middleware/errorMiddleware');
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('API is running...');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

