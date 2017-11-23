import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InlineTex } from 'react-tex';

import CheckAnswerForm from './CheckAnswerForm';
import PromlemAdmin from './ProblemAdmin';

class Problem extends Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const {
      order, id, statement, answer, solvedProblems, isAdmin,
    } = this.props;

    return this.state.hasError ? (
      <div> error </div>
    ) : (
      <div className="problem">
        <div className="problem__content">
          <div className="problem__statement">
            <span className="problem__order">#{order}. </span>
            <InlineTex texContent={statement} texSeperator="$" />
          </div>
          {answer && (
            <div className="problem__answer">
              {!solvedProblems.includes(id) ? (
                <CheckAnswerForm answer={answer} problemId={id} />
              ) : (
                <div className="problem__right-answer">Ответ: {answer}.</div>
              )}
            </div>
          )}
        </div>
        {isAdmin && <PromlemAdmin {...this.props} />}
      </div>
    );
  }
}

Problem.propTypes = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  answer: PropTypes.string,
  solvedProblems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

Problem.defaultProps = {
  answer: null,
};

const mapStateToProps = ({ solvedProblems, currentUser }) => ({
  solvedProblems,
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

export default connect(mapStateToProps)(Problem);
