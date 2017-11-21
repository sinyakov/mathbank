const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const consts = require('../consts');
const verifyToken = require('../utils/verify');

const router = express.Router();

const { TOKEN } = consts;

router.post('/entries/', (request, response) => {
  const { login, password } = request.body;

  User.create(
    {
      login,
      password,
      isAdmin: false,
    },
    (err, createdUser) => {
      if (!err && createdUser) {
        response.status(204).json(createdUser);
      } else {
        response.status(500).send('Ошибка сервера');
      }
    },
  );
});

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
    if (user.password === password) {
      const token = jwt.sign({ user }, config.secret, {
        expiresIn: 60 * 60 * 24 * 3,
      });

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

router.get('/verify', (request, response) => {
  const token = request.headers[TOKEN] || false;

  verifyToken(
    token,
    (user) => {
      if (user.isAdmin) {
        response.status(200).json(user);
      } else {
        response.status(403).send('Недостаточно прав');
      }
    },
    () => {
      response.status(401).send('Доступ запрещён');
    },
  );
});

module.exports = router;
