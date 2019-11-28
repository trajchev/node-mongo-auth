const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configure dotenv for pulling sensitive data from .env file
dotenv.config({ path: './config.env' });

const app = require('./server/app');

// Get password for deployment env
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

// Save server to a var for future use
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});