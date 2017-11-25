const express = require('express');
const Category = require('../models/category');
const auth = require('../middleware/auth');
require('../models/problem');

const router = express.Router();

router.post('/entries/', auth, (request, response) => {
  const { hash, name } = request.body;

  Category.create({ hash, name }, (err, createdCategory) => {
    if (!err && createdCategory) {
      response.status(200).json(createdCategory);
    } else {
      response.status(500).send('Непредвиденная ошибка');
    }
  });
});

router.put('/entries/:id', auth, (request, response) => {
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
            category: problem.category,
            answer: problem.answer,
          })),
        });
      } else {
        response.status(404).send('Категория не найдена');
      }
    });
});

module.exports = router;
