import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InlineTex } from 'react-tex';

import CheckAnswerForm from './CheckAnswerForm';

const Problem = ({
  order, id, statement, answer, solvedProblems,
}) => (
  <div className="problem">
    <div className="problem__statement">
      <span className="problem__order">#{order}. </span>
      <InlineTex texContent={statement} texSeperator="$" />
    </div>
    <div className="problem__info">
      {answer && (
        <div className="problem__answer">
          {!solvedProblems.includes(id) ? (
            <CheckAnswerForm answer={answer} problemId={id} />
          ) : (
            <div className="problem__right-answer">Ответ: {answer}.</div>
          )}
        </div>
      )}
      <span className="problem__id">Задача #{id}</span>
    </div>
  </div>
);

Problem.propTypes = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  solvedProblems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ solvedProblems }) => ({
  solvedProblems,
});

export default connect(mapStateToProps)(Problem);
