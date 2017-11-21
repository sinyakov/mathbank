require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const user = require('./routes/user');
const category = require('./routes/category');
const cors = require('cors');
const morgan = require('morgan');

mongoose.connect(config.db.host).then(
  () => {
    console.log('Коннект');
  },
  (err) => {
    throw new Error(err);
  },
);

const app = express();

app.use(bodyParser());
app.use(morgan('dev'));
app.use(cors());
app.use('/user', user);
app.use('/category', category);

app.get('/', (req, res) => res.send('Hello API!'));

app.listen(3012, () => console.log('API app started'));
