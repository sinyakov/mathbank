const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (token, onSuccess, onFail) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (!err) {
      return onSuccess(decoded.user);
    }
    return onFail(err);
  });
};
