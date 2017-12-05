const express = require('express');
const Homework = require('../models/homework');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { check } = require('express-validator/check');

require('../models/problem');

const router = express.Router();

const validateCreation = [
  check('title')
    .exists()
    .withMessage('Не передано название домашнего задания'),
  check('list')
    .exists()
    .withMessage('Не передан список с заданиями'),
];

router.get('/entry/:id', (request, response) =>
  Homework.getHomework(response, request.params.id, homework =>
    response.status(200).json({
      id: homework._id,
      title: homework.title,
      list: homework.list.map(problem => ({
        id: problem._id,
        statement: problem.statement,
        category: problem.category,
        answer: problem.answer,
      })),
    })));

router.post('/entry', [auth, ...validateCreation], (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(406).json({
      errors: errors.mapped(),
    });
  }

  return Homework.createHomework(response, matchedData(request), createdHomework =>
    response.status(200).json({ id: createdHomework._id, list: createdHomework.list }));
});

module.exports = router;
