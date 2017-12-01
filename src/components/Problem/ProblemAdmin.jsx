import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { addProblemToBasket, removeProblemFromBasket } from '../../actions/basket';
import UpdateProblemForm from '../ProblemForms/Update';

import cart from './img/cart.svg';
import remove from './img/remove.svg';
import pen from './img/pen.svg';

import Modal from '../Modal';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 9px;
  padding: 4px;
  padding-left: 9px;
  min-height: 48px;
  border-left: 1px solid #ddd;
`;

const Button = styled.button`
  display: flex;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.backgroundColor};
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-size: 12px;
  background-repeat: no-repeat;
  font-size: 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px #999;
  }
`;

const renderUpdateProblemModalHandler = () => (
  <Button
    type="button"
    title="Отредактировать задачу"
    backgroundColor="rgb(165, 165, 165)"
    backgroundImage={pen}
  >
    Отредактировать задачу
  </Button>
);

const basketContainsProblem = (list, id) => list.find(problem => problem.id === id);

const ProblemAdmin = (props) => {
  const problem = {
    id: props.id,
    statement: props.statement,
    category: props.category,
    answer: props.answer,
  };

  if (!props.isAdmin) {
    return null;
  }

  return (
    <Panel>
      {!basketContainsProblem(props.basketList, problem.id) ? (
        <Button
          type="button"
          onClick={() => props.addProblemToBasket(problem)}
          title="Добавить в корзину"
          backgroundColor="rgb(88, 203, 115)"
          backgroundImage={cart}
        >
          Добавить в корзину
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => props.removeProblemFromBasket(problem.id)}
          title="Удалить из корзины"
          backgroundColor="rgb(228, 100, 100)"
          backgroundImage={remove}
        >
          Удалить из корзины
        </Button>
      )}
      <Modal title="Редактировать задачу" handler={renderUpdateProblemModalHandler()}>
        <UpdateProblemForm
          problemId={problem.id}
          defaultStatement={problem.statement}
          defaultAnswer={problem.answer}
          defaultCategory={problem.category}
        />
      </Modal>
    </Panel>
  );
};

ProblemAdmin.propTypes = {
  basketList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  statement: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  answer: PropTypes.string,
  addProblemToBasket: PropTypes.func.isRequired,
  removeProblemFromBasket: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

ProblemAdmin.defaultProps = {
  answer: null,
};

const mapStateToProps = ({ basket, currentUser }) => ({
  basketList: basket.list,
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

const mapDispatchToProps = dispatch => ({
  addProblemToBasket: problem => dispatch(addProblemToBasket(problem)),
  removeProblemFromBasket: problem => dispatch(removeProblemFromBasket(problem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemAdmin);
