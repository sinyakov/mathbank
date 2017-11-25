import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProblemToBasket, removeProblemFromBasket } from '../../actions/basket';
import Modal from '../Modal';
import UpdateProblemForm from '../ProblemForms/Update';

const renderUpdateProblemModalHandler = () => (
  <button className="problem__btn problem__btn--edit" type="button" title="Отредактировать задачу">
    Отредактировать задачу
  </button>
);

class ProblemAdmin extends Component {
  static propTypes = {
    basketList: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    answer: PropTypes.string,
    addProblemToBasket: PropTypes.func.isRequired,
    removeProblemFromBasket: PropTypes.func.isRequired,
  };

  static defaultProps = {
    answer: null,
  };

  basketContainsProblem() {
    return this.props.basketList.find(problem => problem.id === this.props.id);
  }

  render() {
    const problem = {
      id: this.props.id,
      statement: this.props.statement,
      answer: this.props.answer,
      category: this.props.category,
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
        <Modal title="Редактировать задачу" handler={renderUpdateProblemModalHandler()}>
          <UpdateProblemForm
            problemId={problem.id}
            defaultStatement={problem.statement}
            defaultAnswer={problem.answer}
            defaultCategory={problem.category}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ basket }) => ({
  basketList: basket.list,
});

const mapDispatchToProps = dispatch => ({
  addProblemToBasket: problem => dispatch(addProblemToBasket(problem)),
  removeProblemFromBasket: problem => dispatch(removeProblemFromBasket(problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemAdmin);
