import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import TexPreview from './TexPreview';
import CheckAnswer from './CheckAnswerForm';
import PromlemAdmin from './ProblemAdmin';

const wrongAnswer = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(3px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-6px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(6px, 0, 0);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 12px 0;
  padding: 4px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 1px #aaa;

  animation: ${props =>
    (props.solved === 'pending'
      ? 'none'
      : `${props.solved === 'wrongAnswer' ? `${wrongAnswer} 1s ease-in-out 1` : 'none'}`)};
`;

const Content = styled.div`
  flex: 1 0;
  padding: 4px;
`;

const Statement = styled.div``;

const Order = styled.span`
  font-weight: 900;
`;

const Answer = styled.div`
  flex: 1 0;
  margin-top: 8px;
  align-items: center;
  min-height: 27px;
`;

const ShowAnswer = styled.span`
  line-height: 27px;
`;

const isProblemSolved = (id, solvedProblems) => solvedProblems.includes(id);

class Problem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      solved: 'pending',
    };
  }

  checkAnswer = (result) => {
    this.setState({ solved: result });
    setTimeout(() => {
      this.setState({ solved: 'pending' });
    }, 1000);
  };

  render() {
    const {
      order, id, statement, answer, category, solvedProblems,
    } = this.props;

    return (
      <Wrapper solved={this.state.solved}>
        <Content>
          <Statement>
            <Order>#{order}. </Order>
            <TexPreview text={statement} />
          </Statement>
          {answer && (
            <Answer>
              {isProblemSolved(id, solvedProblems) ? (
                <ShowAnswer>Ответ: {answer}.</ShowAnswer>
              ) : (
                <CheckAnswer answer={answer} problemId={id} onCheck={this.checkAnswer} />
              )}
            </Answer>
          )}
        </Content>
        <PromlemAdmin id={id} statement={statement} answer={answer} category={category} />
      </Wrapper>
    );
  }
}

Problem.propTypes = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  answer: PropTypes.string,
  solvedProblems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Problem.defaultProps = {
  answer: null,
};

const mapStateToProps = ({ solvedProblems }) => ({
  solvedProblems,
});

export default connect(mapStateToProps)(Problem);
