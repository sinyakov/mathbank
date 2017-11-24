const config = require('../config');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const token = request.headers[consts.TOKEN];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (!err && decoded.user) {
        request.userId = decoded.user.userId;
        request.user = decoded.user;
        next();
      } else {
        response.status(403).send('Токен недействителен');
      }
    });
  } else {
    response.status(401).send('Токен не предоставлен');
  }
};
