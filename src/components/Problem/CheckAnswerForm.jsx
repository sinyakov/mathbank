import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addProblemToSolved } from '../../actions/solvedProblems';

const Form = styled.form`
  display: flex;
  overflow: hidden;
  max-width: 240px;
  border: 1px solid rgba(194, 194, 194, 0.45);
  border-radius: 3px;

  @media (max-width: 450px) {
    max-width: 100%;
  }
`;

const Input = styled.input`
  flex: 1 0;
  margin: 0;
  padding: 0px 8px;
  border: none;
  font-size: 14px;
`;

const Button = styled.button`
  margin: 0;
  border: none;
  background: rgba(194, 194, 194, 0.25);
  font-size: 20px;
  line-height: 1;
`;

class checkAnswerForm extends Component {
  static propTypes = {
    addProblemToSolved: PropTypes.func.isRequired,
    answer: PropTypes.string.isRequired,
    problemId: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
  };

  state = {
    answer: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.answer.toString() === this.state.answer) {
      this.props.addProblemToSolved(this.props.problemId);
      this.props.onCheck('rightAnswer');
    } else {
      this.props.onCheck('wrongAnswer');
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} novalidate autocomplete="off">
        <Input
          type="text"
          name="answer"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="Ответ"
          autocomplete="off"
        />
        <Button type="submit" title="Проверить ответ">
          →
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProblemToSolved: problemId => dispatch(addProblemToSolved(problemId)),
});

export default connect(null, mapDispatchToProps)(checkAnswerForm);
