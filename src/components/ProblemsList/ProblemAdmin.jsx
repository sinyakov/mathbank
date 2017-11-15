import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addProblemToSolved from '../../actions/addProblemToSolved';
import { addProblemToBasket, removeProblemFromBasket } from '../../actions/basket';

class ProblemAdmin extends Component {
  static propTypes = {
    basketList: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    addProblemToBasket: PropTypes.func.isRequired,
    removeProblemFromBasket: PropTypes.func.isRequired,
  };

  basketContainsProblem() {
    return this.props.basketList.find(problem => problem.id === this.props.id);
  }

  render() {
    const problem = {
      id: this.props.id,
      statement: this.props.statement,
      answer: this.props.answer,
    };

    return (
      <div className="problem__admin">
        {!this.basketContainsProblem(problem) ? (
          <button
            className="problem__btn problem__btn--add"
            type="button"
            onClick={() => this.props.addProblemToBasket(problem)}
            title="Добавить в корзину"
          >
            Добавить в корзину
          </button>
        ) : (
          <button
            className="problem__btn problem__btn--remove"
            type="button"
            onClick={() => this.props.removeProblemFromBasket(problem.id)}
            title="Удалить из корзины"
          >
            Удалить из корзины
          </button>
        )}
        <button
          className="problem__btn problem__btn--edit"
          type="button"
          title="Отредактировать задачу"
        >
          Отредактировать задачу
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ basket }) => ({
  basketList: basket.list,
});

const mapDispatchToProps = dispatch => ({
  addProblemToSolved: problemId => dispatch(addProblemToSolved(problemId)),
  addProblemToBasket: problem => dispatch(addProblemToBasket(problem)),
  removeProblemFromBasket: problem => dispatch(removeProblemFromBasket(problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemAdmin);
