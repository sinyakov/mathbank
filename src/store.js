import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reducers from './reducers';

const defaultState = {
  // user: {
  //   name: null,
  //   isAdmin: false,
  // },
  categories: {
    isLoading: false,
    errors: [],
    list: [
      { id: '1', alias: 'proportions', name: 'Пропорции' },
      { id: '2', alias: 'last-digit', name: 'Последняя цифра' },
      { id: '3', alias: 'sets', name: 'Множества' },
    ],
  },
  homeworks: {
    isLoading: false,
    errors: [],
    list: [{ id: '1', alias: 'hw1', name: 'Домашнее задание #1' }],
  },
  problems: {
    isLoading: false,
    errors: [],
    dict: {
      proportions: [
        {
          id: '3',
          statement: 'Масса 21 литра нефти составляет 16,8 кг. Какова масса 35 литров нефти?',
          answer: '25',
          category_id: '1',
        },
      ],
      'last-digit': [
        {
          id: '2',
          statement:
            'Насколько сумма всех четных чисел первой сотни больше суммы всех нечетных чисел первой сотни?',
          answer: '50',
          category_id: '2',
        },
        {
          id: '38',
          statement: 'Четно или нечетно число $101 + 102 + ... + 199 + 200$?',
          answer: '',
          category_id: '2',
        },
      ],
      sets: [],
      hw1: [
        {
          id: '2',
          statement:
            'Насколько сумма всех четных чисел первой сотни больше суммы всех нечетных чисел первой сотни?',
          answer: '50',
          category_id: '2',
        },
      ],
    },
  },
  solvedProblems: ['3', '38'],
  // basket: {
  //   name: 'Домашнее задание #1',
  //   list: [{ id: '3', order: 0 }, { id: '38', order: 1 }, { id: '2', order: 2 }],
  // },
};

export default createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(thunk)));
