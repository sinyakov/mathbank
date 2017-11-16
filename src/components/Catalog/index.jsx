import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategories, getProblemsByCategoryId } from '../../actions/catalog';
import Categories from './Categories';
import BasketCounter from './BasketCounter';
import ProblemsList from '../ProblemsList';
import Loader from '../Loader';

class Catalog extends Component {
  componentDidMount() {
    const {
      match: { params },
      categories: { list },
      problems,
      handleGetCategories,
      handleGetProblemsByCategoryId,
    } = this.props;

    if (list.length && problems[params.category]) {
      return;
    }

    const fetchProblemsByCategory = (categoriesList, catagoryHash) => {
      const category = categoriesList.find(cat => cat.alias === catagoryHash);
      if (category) {
        const { id, alias } = category;
        handleGetProblemsByCategoryId(id, alias);
      }
    };

    if (list.length && !problems[params.category]) {
      fetchProblemsByCategory(list, params.category);
      return;
    }

    handleGetCategories().then((data) => {
      fetchProblemsByCategory(data, params.category);
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params: newParams },
      categories: { list },
      handleGetProblemsByCategoryId,
    } = nextProps;

    const { match: { params: oldParams }, problems } = this.props;

    const isRouteChanged = oldParams.category !== newParams.category;

    if (!problems[newParams.category] && isRouteChanged) {
      const { id, alias } = list.find(cat => cat.alias === newParams.category);
      handleGetProblemsByCategoryId(id, alias);
    }
  }

  render() {
    const { problems, categories: { list, isLoading }, match: { params } } = this.props;
    const categoryHash = params.category;
    const category = list.find(cat => cat.alias === categoryHash);

    if (isLoading) {
      return <Loader>Загрузка категорий</Loader>;
    }

    if (!category) {
      return (
        <div>
          <header className="category-header">
            <h1 className="category-header__title">
              <div className="category-header__title-outer">
                <div className="category-header__title-inner">Категория отсутствует</div>
              </div>
            </h1>
            <BasketCounter />
          </header>
          <Categories />
        </div>
      );
    }

    return (
      <div>
        <header className="category-header">
          <div className="category-header__title">
            <div className="category-header__title-outer">
              <div className="category-header__title-inner">{category.name}</div>
            </div>
          </div>
          <BasketCounter />
        </header>
        <Categories />
        {!problems[categoryHash] || problems[categoryHash].isLoading ? (
          <Loader>Загрузка задач</Loader>
        ) : (
          <ProblemsList list={problems[categoryHash].list} section="catalog" />
        )}
      </div>
    );
  }
}

Catalog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  problems: PropTypes.shape({
    list: PropTypes.array,
    isLoading: PropTypes.bool,
  }).isRequired,
  categories: PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,

  handleGetCategories: PropTypes.func.isRequired,
  handleGetProblemsByCategoryId: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories, problems }) => ({
  categories,
  problems,
  isLoadingCategories: categories.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleGetCategories: () => dispatch(getCategories()),
  handleGetProblemsByCategoryId: (id, hash) => dispatch(getProblemsByCategoryId(id, hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
