import React from 'react';
import PropTypes from 'prop-types';
import Problem from './Problem';

const ProblemsList = ({ list, section }) => {
  if (list.length === 0) {
    return (
      <div className="catalog">
        <div className="catalog__info">
          Нет ни одной задачи&nbsp;
          <span role="img" aria-labelledby="sad">
            😔
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog">
      {list.map(({ id, statement, answer }, index) => (
        <Problem
          key={id}
          order={index + 1}
          id={id}
          statement={statement}
          answer={answer}
          section={section}
        />
      ))}
    </div>
  );
};

ProblemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  section: PropTypes.string.isRequired,
};

export default ProblemsList;
