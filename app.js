const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose")
const defaultRoutes = require('./routes/defaultRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.set('view engine', 'ejs');

const dbURI = "mongodb+srv://ujwal:testing123@banking.inzqyzd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'node-banking',
})
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', defaultRoutes);
app.use('/transaction',transactionRoutes);
app.use('/user',userRoutes);