const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  // console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection succesfull'));

const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  // console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // console.log(err);
  // console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
