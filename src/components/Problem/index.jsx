import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TexPreview from './TexPreview';
import CheckAnswer from './CheckAnswerForm';
import PromlemAdmin from './ProblemAdmin';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 12px 0;
  padding: 4px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 1px #aaa;
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

const Problem = ({
  order, id, statement, answer, category, solvedProblems,
}) => (
  <Wrapper>
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
            <CheckAnswer answer={answer} problemId={id} />
          )}
        </Answer>
      )}
    </Content>
    <PromlemAdmin id={id} statement={statement} answer={answer} category={category} />
  </Wrapper>
);

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
