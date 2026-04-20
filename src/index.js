require('dotenv/config');
const express = require('express');
const cors = require('cors');

const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin/content', authMiddleware, contentRoutes);
app.use('/api/admin/upload', authMiddleware, uploadRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
