const express = require('express');
const Category = require('../models/category');
const consts = require('../consts');
const verifyToken = require('../utils/verify');
require('../models/problem');

const router = express.Router();

const { TOKEN } = consts;

router.post('/entries/', (request, response) => {
  const { hash, name } = request.body;
  const token = request.headers[TOKEN] || false;

  verifyToken(
    token,
    () => {
      Category.create({ hash, name }, (err, createdCategory) => {
        if (!err && createdCategory) {
          response.status(200).json(createdCategory);
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

router.put('/entries/:id', (request, response) => {
  const token = request.headers[TOKEN];

  verifyToken(
    token,
    () => {
      Category.findOneAndUpdate(
        { _id: request.params.id },
        {
          $set: request.body,
        },
        {
          new: true,
        },
        (err, updatedCategory) => {
          if (!err && updatedCategory) {
            response.status(200).json({
              id: updatedCategory._id,
              name: updatedCategory.name,
              hash: updatedCategory.hash,
            });
          }
        },
      );
    },
    () => response.status(401).send('Неверный токен'),
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
