const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose")
const authRoutes = require('./routes/authRoutes')

const app = express();
app.set('view engine', 'ejs');

const dbURI = "mongodb+srv://ujwal:testing123@banking.inzqyzd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/auth', authRoutes);


