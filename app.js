const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//path to .env file
dotenv.config({ path: './config/config.env' });

//connect to  database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`MongoDB Connected`);
};
connectDB();

//middlewares
app.use(bodyParser.json());

//starting server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${3000}!`);
});