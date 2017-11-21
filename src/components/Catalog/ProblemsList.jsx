import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProblemsByCategoryId } from '../../actions/catalog';
import Problem from '../Problem';
import Loader from '../Loader';

const fetchProblemsByCategory = (props) => {
  const {
    categoryHash, categories: { list }, problems, handleGetProblemsByCategoryId,
  } = props;
  const category = list.find(cat => cat.hash === categoryHash);
  if (!problems[category.id]) {
    handleGetProblemsByCategoryId(category.id);
  }
};

class ProblemsList extends Component {
  componentDidMount() {
    fetchProblemsByCategory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const isRouteChanged = nextProps.categoryHash !== this.props.categoryHash;
    if (isRouteChanged) {
      fetchProblemsByCategory(nextProps);
    }
  }

  render() {
    const { categoryHash, categories: { list }, problems } = this.props;
    const category = list.find(cat => cat.hash === categoryHash);

    const currentProblems = problems[category.id];

    if (!currentProblems) {
      return null;
    }

    if (currentProblems.isLoading) {
      return <Loader>Загрузка задач</Loader>;
    }

    if (currentProblems.list.length === 0) {
      return (
        <div className="catalog">
          <div className="catalog__info">
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="catalog">
        {currentProblems.list.map(({ id, statement, answer }, index) => (
          <Problem key={id} order={index + 1} id={id} statement={statement} answer={answer} />
        ))}
      </div>
    );
  }
}

ProblemsList.propTypes = {
  categoryHash: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsList);
