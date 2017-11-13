import React from 'react';
import PropTypes from 'prop-types';
import Problem from './Problem';

const ProblemsList = ({ list }) => (
  <div className="catalog">
    {list.map(({ id, statement, answer }, index) => (
      <Problem key={id} order={index + 1} id={id} statement={statement} answer={answer} />
    ))}
  </div>
);

ProblemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProblemsList;
