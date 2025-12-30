const express = require('express');
const dotenv =require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(cors({
  origin: ["http://localhost:5173", process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());
app.use('/api/properties', require('./src/routes/propertyRoutes'));
const errorHandler = require('./src/middleware/errorMiddleware');
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

