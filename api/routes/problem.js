const Problem = require('../models/problem');
const express = require('express');
const Category = require('../models/category');
const consts = require('../consts');
const auth = require('../middleware/auth');
require('../models/problem');

const router = express.Router();

const { TOKEN } = consts;

router.post('/entries', auth, (request, response) => {
  const { answer, statement, category } = request.body.problem;

  Problem.create(
    {
      answer,
      statement,
      category,
    },
    (err, createdProblem) => {
      if (!err && createdProblem) {
        Category.update(
          { _id: createdProblem.category },
          {
            $push: {
              list: createdProblem._id,
            },
          },
          (err, mongo) => {
            if (!err && mongo) {
              response.status(200).json({
                id: createdProblem._id,
                answer: createdProblem.answer,
                statement: createdProblem.statement,
                category: createdProblem.category,
              });
            } else {
              response.status(500).json({
                message: 'Ошибка сервера',
                error: err,
              });
            }
          },
        );
      } else {
        response.status(500).send({
          message: 'Ошибка сервера',
          error: err,
        });
      }
    },
  );
});

router.put('/entries/:id', auth, (request, response) => {
  Problem.findOneAndUpdate(
    { _id: request.params.id },
    {
      $set: request.body,
    },
    (err, updatedProblem) => {
      if (updatedProblem.category === request.body.category) {
        if (!err && updatedProblem) {
          response.status(200).json({
            id: updatedProblem._id,
            answer: updatedProblem.answer,
            statement: updatedProblem.statement,
            category: updatedProblem.category,
          });
        } else {
          response.status(500).json({
            message: 'Ошибка сервера',
            error: err,
          });
        }
      } else {
        Category.update(
          { _id: updatedProblem.category },
          {
            $pull: {
              list: request.params.id,
            },
          },
        ).exec((err) => {
          if (!err) {
            Category.update(
              { _id: request.body.category },
              {
                $push: {
                  list: request.params.id,
                },
              },
              (err) => {
                if (!err) {
                  Problem.findById(request.params.id, (err, problem) => {
                    if (!err && problem) {
                      response.status(200).json({
                        id: problem._id,
                        answer: problem.answer,
                        statement: problem.statement,
                        category: problem.category,
                      });
                    } else {
                      response.status(404).send('Не найдено');
                    }
                  });
                } else {
                  response.status(500).json({
                    message: 'Ошибка сервера',
                    error: err,
                  });
                }
              },
            );
          } else {
            response.status(500).json({
              message: 'Ошибка сервера',
              error: err,
            });
          }
        });
      }
    },
  );
});

router.delete('/entries/:id', (request, response) => {
  Category.update(
    { list: { $in: [request.params.id] } },
    {
      $pull: {
        list: request.params.id,
      },
    },
    (err, mongo) => {
      if (!err && mongo) {
        Problem.remove({ _id: request.params.id }, (err) => {
          if (!err) {
            response.status(200).send('Готово');
          } else {
            response.status(500).send('Внутренняя ошибка');
          }
        });
      } else {
        response.status(500).json({
          message: 'Ошибка сервера',
          error: err,
        });
      }
    },
  );
});

module.exports = router;
