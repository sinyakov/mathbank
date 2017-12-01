const config = require('../config');
const consts = require('../consts');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (request, response, next) => {
  const token = request.headers[consts.TOKEN];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (!err && decoded.user) {
        User.findById(decoded.user._id, (err, user) => {
          if (err) {
            return response.status(500).send('Неверный формат токена');
          } else if (!user) {
            return response.status(404).send('Пользователь не найден');
          }
          request.userId = decoded.user._id;
          request.user = decoded.user;
          return next();
        });
      } else {
        return response.status(403).send('Токен недействителен');
      }
    });
  } else {
    return response.status(401).send('Токен не предоставлен');
  }
};
