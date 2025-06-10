const app = require('./app');
const connectDB = require('./config/db.config');
require('dotenv').config();
const logger = require('./utils/logger.util');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();