require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const user = require('./routes/user');
const category = require('./routes/category');
const problem = require('./routes/problem');
const homework = require('./routes/homework');
const cors = require('cors');
const morgan = require('morgan');

mongoose
  .connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${
    config.db.name
  }`)
  .then(
    () => {
      console.log('Коннект');
    },
    (err) => {
      throw new Error(err);
    },
  );

const app = express();

const prefix = '/api';

app.use(bodyParser());
app.use(morgan('dev'));
app.use(cors());
app.use(`${prefix}/user`, user);
app.use(`${prefix}/category`, category);
app.use(`${prefix}/problem`, problem);
app.use(`${prefix}/homework`, homework);

app.get('/', (req, res) => res.send('Hello API!'));

app.listen(3012, () => console.log('API app started'));
