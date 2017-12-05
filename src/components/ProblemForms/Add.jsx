import React, { Component } from 'react';
import cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Preview from '../Problem/TexPreview';
import postProblem from '../../actions/postProblem';
import { TOKEN } from '../../actions/constants';
import Loader from '../Loader';

import { Wrapper, Statement, PreviewWrapper, Category, Answer, Buttons, Button } from './Styled';

class AddProblemForm extends Component {
  static defaultProps = {
    onToggle: null,
    onError: null,
    defaultCategory: '',
  };

  static propTypes = {
    handlePostProblem: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    onError: PropTypes.func,
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
    const { handlePostProblem, onToggle, onError } = this.props;

    e.preventDefault();
    handlePostProblem(cookies.get(TOKEN), this.state)
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
    const { categories, isHydrating } = this.props;

    if (isHydrating) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

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
            />
            <Category
              name="category"
              defaultValue={this.state.category}
              onChange={this.handleInputChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Category>
          </Wrapper>
          <Buttons>
            <Button type="submit">Добавить</Button>
          </Buttons>
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  categories: store.categories.list,
  isHydrating: store.postProblem.isHydrating,
});

const mapDispatchToProps = dispatch => ({
  handlePostProblem: (token, problem) => dispatch(postProblem(token, problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProblemForm);
