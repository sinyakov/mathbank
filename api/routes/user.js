const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/entries/:id', (request, response) => {
  User.findById(request.params.id, '-password', (err, user) => {
    if (!err && user) {
      response.status(200).json({
        login: user.login,
        id: user._id,
        isAdmin: user.isAdmin,
      });
    } else {
      response.status(404).send('Пользователь не найден');
    }
  });
});

router.post('/signin', (request, response) => {
  const { login, password } = request.body;

  User.findOne({ login }, (err, user) => {
    if (!user) {
      response.status(404).send('Пользователь не найден');
      return;
    }

    if (user.password === password) {
      const token = jwt.sign(
        {
          user: {
            login: user.login,
            _id: user._id,
            isAdmin: user.isAdmin,
          },
        },
        config.secret,
        {
          expiresIn: 60 * 60 * 24 * 3,
        },
      );

      response.status(200).json({
        user: {
          login: user.login,
          id: user._id,
          isAdmin: user.isAdmin,
        },
        token,
      });
    } else {
      response.status(403).send('Неверный логин или пароль');
    }
  });
});

router.get('/verify', auth, (request, response) => {
  if (request.user.isAdmin) {
    response.status(200).json(request.user);
  } else {
    response.status(403).send('Недостаточно прав');
  }
});

module.exports = router;
