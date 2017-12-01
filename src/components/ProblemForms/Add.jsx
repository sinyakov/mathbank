import React, { Component } from 'react';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Preview from '../Problem/TexPreview';
import postProblem from '../../actions/postProblem';
import { TOKEN } from '../../actions/constants';
import Loader from '../Loader';

class AddProblemForm extends Component {
  static defaultProps = {
    onToggle: null,
    error: '',
    defaultCategory: '',
  };

  static propTypes = {
    handlePostProblem: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    error: PropTypes.string,
    defaultCategory: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isHydrating: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      statement: '',
      answer: '',
      category: props.defaultCategory,
    };
  }

  handleSubmit = (e) => {
    const { handlePostProblem, onToggle } = this.props;

    e.preventDefault();
    handlePostProblem(cookies.get(TOKEN), this.state).then(() => {
      if (onToggle) {
        onToggle();
      }
    });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { categories, error, isHydrating } = this.props;

    if (isHydrating) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

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
            <button type="submit" className="primary-button">
              Добавить
            </button>
          </div>
        </form>
        {error && <p className="auth__error">{error}</p>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  categories: store.categories.list,
  error: store.postProblem.error,
  isHydrating: store.postProblem.isHydrating,
});

const mapDispatchToProps = dispatch => ({
  handlePostProblem: (token, problem) => dispatch(postProblem(token, problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProblemForm);
