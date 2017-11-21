import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProblemToSolved } from '../../actions/solvedProblems';

class checkAnswerForm extends Component {
  static propTypes = {
    addProblemToSolved: PropTypes.func.isRequired,
    answer: PropTypes.string.isRequired,
    problemId: PropTypes.string.isRequired,
  };

  state = {
    answer: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.answer.toString() === this.state.answer) {
      this.props.addProblemToSolved(this.props.problemId);
    } else {
      // нужно как-то показать, что ответ неверный
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form className="check-answer" onSubmit={this.handleSubmit}>
        <input
          className="check-answer__input"
          type="text"
          name="answer"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="Ответ"
        />
        <button className="check-answer__button" type="submit" title="Проверить ответ">
          →
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProblemToSolved: problemId => dispatch(addProblemToSolved(problemId)),
});

export default connect(null, mapDispatchToProps)(checkAnswerForm);
