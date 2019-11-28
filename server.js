const dotenv = require('dotenv');

// Configure dotenv for pulling sensitive data from .env file
dotenv.config({ path: './config.env' });

const app = require('./server/app');

const port = process.env.PORT || 3000;

// Save server to a var for future use
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});