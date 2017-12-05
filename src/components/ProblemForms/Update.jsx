import React, { Component } from 'react';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Preview from '../Problem/TexPreview';
import putProblem from '../../actions/putProblem';
import deleteProblem from '../../actions/deleteProblem';
import { TOKEN } from '../../actions/constants';

import { Wrapper, Statement, PreviewWrapper, Category, Answer, Buttons, Button } from './Styled';

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
      ...this.state,
      id: this.props.problemId,
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
        <form onSubmit={e => this.handleSubmit(e)}>
          <Wrapper>
            <Statement
              value={this.state.statement}
              onChange={this.handleInputChange}
              name="statement"
              cols="30"
              rows="5"
              className="problem-form__statement"
            />
            <PreviewWrapper>
              <Preview text={this.state.statement} />
            </PreviewWrapper>
            <Answer
              value={this.state.answer}
              type="text"
              name="answer"
              placeholder="Ответ"
              onChange={this.handleInputChange}
              className="problem-form__answer"
            />
            <Category
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
            </Category>
          </Wrapper>
          <Buttons>
            <Button warn type="button" onClick={e => this.handleDelete(e)}>
              Удалить
            </Button>
            <Button type="submit" className="primary-button">
              Сохранить
            </Button>
          </Buttons>
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
