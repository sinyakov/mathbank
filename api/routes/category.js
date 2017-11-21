const express = require('express');
const Category = require('../models/category');
const consts = require('../consts');
const verifyToken = require('../utils/verify');

const router = express.Router();

// я хз, как эта шутка работает
require('../models/Problem');

const { TOKEN } = consts;

router.post('/', (request, response) => {
  const { hash, name } = request.body;
  const token = request.headers[TOKEN] || false;

  verifyToken(
    token,
    () => {
      Category.create({ hash, name }, (err, createdCategory) => {
        if (!err && createdCategory) {
          response.status(204).json(createdCategory);
        } else {
          response.status(500).send('Непредвиденная ошибка');
        }
      });
    },
    () => {
      response.status(401).send('Неверный токен');
    },
  );
});

router.get('/entries', (request, response) => {
  Category.find({}, (err, categories) => {
    if (!err && categories) {
      response.status(200).json(categories.map(category => ({
        id: category._id,
        name: category.name,
        hash: category.hash,
      })));
    } else {
      response.status(404).send('Ничего не найдено');
    }
  });
});

router.get('/entries/:id', (request, response) => {
  console.log(request.params.id);

  Category.findById(request.params.id)
    .populate('list')
    .exec((err, category) => {
      if (!err && category) {
        response.status(200).json({
          id: category._id,
          name: category.name,
          hash: category.hash,
          list: category.list.map(problem => ({
            id: problem._id,
            statement: problem.statement,
            answer: problem.answer,
          })),
        });
      } else {
        response.status(404).send('Категория не найдена');
      }
    });
});

module.exports = router;
