import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getProblemsByCategoryId } from '../../actions/catalog';
import Problem from '../Problem';
import Loader from '../Loader';

const fetchProblemsByCategory = (props) => {
  const {
    match: { params },
    categories: { list },
    problems,
    handleGetProblemsByCategoryId,
  } = props;

  const category = list.find(cat => cat.hash === params.category);
  if (!problems[category.id]) {
    handleGetProblemsByCategoryId(category.id);
  }
};

class ProblemsList extends Component {
  componentDidMount() {
    fetchProblemsByCategory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = this.props;
    const { match: { params: nextParams } } = nextProps;

    const isRouteChanged = params.category !== nextParams.category;
    if (isRouteChanged) {
      fetchProblemsByCategory(nextProps);
    }
  }

  render() {
    const { match: { params }, categories: { list }, problems } = this.props;
    const category = list.find(cat => cat.hash === params.category);

    const currentProblems = problems[category.id];

    if (!currentProblems) {
      return null;
    }

    if (currentProblems.isLoading) {
      return <Loader>Загрузка задач</Loader>;
    }

    return (
      <div className="catalog">
        <div className="catalog__admin">
          <button type="button">Редактировать категорию</button>
          <button type="button">Изменить порядок </button>
          <button className="edit-btn edit-btn--add" type="button">
            Добавить задачу
          </button>
        </div>
        {currentProblems.list.length === 0 ? (
          <div className="catalog__info">
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </div>
        ) : (
          currentProblems.list.map(({ id, statement, answer }, index) => (
            <Problem key={id} order={index + 1} id={id} statement={statement} answer={answer} />
          ))
        )}
      </div>
    );
  }
}

ProblemsList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  problems: PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  categories: PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ problems, categories }) => ({
  problems,
  categories,
});

const mapDispatchToProps = dispatch => ({
  handleGetProblemsByCategoryId: id => dispatch(getProblemsByCategoryId(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemsList));
