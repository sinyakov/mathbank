import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addProblemToSolved from '../../actions/addProblemToSolved';

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
    if (this.props.answer === this.state.answer) {
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
      <form onSubmit={this.handleSubmit}>
        <input
          className="problem__answer-input"
          type="text"
          name="answer"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="Ответ"
        />
        <button type="submit">Проверить</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProblemToSolved: problemId => dispatch(addProblemToSolved(problemId)),
});

export default connect(null, mapDispatchToProps)(checkAnswerForm);
