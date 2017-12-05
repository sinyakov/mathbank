import React, { Component } from 'react';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Preview from '../Problem/TexPreview';
import putProblem from '../../actions/putProblem';
import deleteProblem from '../../actions/deleteProblem';
import { TOKEN } from '../../actions/constants';

class AddProblemForm extends Component {
  static defaultProps = {
    defaultAnswer: null,
    onToggle: null,
    onError: null,
  };

  static propTypes = {
    handlePutProblem: PropTypes.func.isRequired,
    handleDeleteProblem: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    onError: PropTypes.func,
    problemId: PropTypes.string.isRequired,
    defaultStatement: PropTypes.string.isRequired,
    defaultCategory: PropTypes.string.isRequired,
    defaultAnswer: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      statement: props.defaultStatement,
      answer: props.defaultAnswer,
      category: props.defaultCategory,
    };
  }

  handleSubmit = (e) => {
    const {
      handlePutProblem, onToggle, onError, defaultCategory,
    } = this.props;

    e.preventDefault();

    const problem = {
      id: this.props.problemId,
      ...this.state,
    };

    handlePutProblem(cookies.get(TOKEN), problem, defaultCategory)
      .then(() => {
        if (onToggle) {
          onToggle();
        }
      })
      .catch(() => {
        if (onError) {
          onError();
        }
      });
  };

  handleDelete = (e) => {
    e.preventDefault();

    const {
      handleDeleteProblem, onToggle, onError, problemId, defaultCategory,
    } = this.props;
    const problem = { id: problemId, category: defaultCategory };

    handleDeleteProblem(cookies.get(TOKEN), problem)
      .then(() => {
        if (onToggle) {
          onToggle();
        }
      })
      .catch(() => {
        if (onError) {
          onError();
        }
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { categories } = this.props;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)} className="problem-form">
          <div className="problem-form__inner">
            <textarea
              value={this.state.statement}
              onChange={this.handleInputChange}
              name="statement"
              cols="30"
              rows="5"
              className="problem-form__statement"
            />
            <div className="problem-form__preview">
              <Preview text={this.state.statement} />
            </div>
            <input
              value={this.state.answer}
              type="text"
              name="answer"
              placeholder="Ответ"
              onChange={this.handleInputChange}
              className="problem-form__answer"
            />
            <select
              name="category"
              defaultValue={this.state.category}
              onChange={this.handleInputChange}
              className="problem-form__category"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="problem-form__buttons">
            <button
              type="button"
              className="primary-button primary-button--warn"
              onClick={e => this.handleDelete(e)}
            >
              Удалить
            </button>
            <button type="submit" className="primary-button">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.list,
});

const mapDispatchToProps = dispatch => ({
  handlePutProblem: (token, problem, prevCategoryId) =>
    dispatch(putProblem(token, problem, prevCategoryId)),
  handleDeleteProblem: (token, problem) => dispatch(deleteProblem(token, problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProblemForm);
