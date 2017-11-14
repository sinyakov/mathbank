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
  basket: {
    name: 'Домашнее задание #1',
    list: [
      {
        id: '18',
        statement: 'Сколько чисел от 1 до 239 делятся на 8?',
        answer: '',
        category_id: '5',
      },
      {
        id: '19',
        statement: 'Сколько чисел от 1 до 900 не делятся на 30?',
        answer: '',
        category_id: '5',
      },
      {
        id: '20',
        statement: 'Сколько чисел, больших 59 и меньших 1001, делятся на 7?',
        answer: '',
        category_id: '5',
      },
      {
        id: '21',
        statement:
          'Сколько существует целых положительных чисел, меньших 100, которые: а) делятся и на 2, и на 3; б) делятся на 2, но не на 3; в) делятся на 3, но не на 2; г) делятся на 3 или на 2; д) не делятся ни на 2, ни на 3?',
        answer: '',
        category_id: '5',
      },
      {
        id: '22',
        statement:
          'Сколько существует чисел от 115 до 265, которые: а) делятся и на 3, и на 5; б) делятся на 5, но не на 3; в) делятся на 3, но не на 5; г) делятся на 3 или на 5; д) не делятся ни на 3, ни на 5?',
        answer: '',
        category_id: '5',
      },
      {
        id: '83',
        statement: 'Сколько чисел от 159 до 241 содержат в своей записи хотя бы одну тройку?',
        answer: '',
        category_id: '5',
      },
      {
        id: '88',
        statement:
          '3. На доске выписали в порядке возрастания все числа от 1 до 10000, а потом стерли те, которые не делятся ни на 4, ни на 11. Какое число окажется 1994-ым?',
        answer: '',
        category_id: '5',
      },
    ],
  },
};

export default createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(thunk)));
