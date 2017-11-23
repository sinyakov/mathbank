import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategories } from '../../actions/catalog';
import Categories from './Categories';
import BasketCounter from '../BasketCounter';
import ProblemsList from './ProblemsList';
import Loader from '../Loader';

class Catalog extends Component {
  componentDidMount() {
    const { categories: { list: categoriesList }, handleGetCategories } = this.props;

    if (!categoriesList.length) {
      handleGetCategories();
    }
  }

  renderHeader = category => (
    <div>
      <header className="category-header">
        <h1 className="category-header__title">
          <div className="category-header__title-outer">
            <div className="category-header__title-inner">
              {category ? category.name : 'Категория отсутствует'}
            </div>
          </div>
        </h1>
        <BasketCounter />
      </header>
    </div>
  );

  render() {
    const { categories: { list, isLoading }, match: { params } } = this.props;
    const categoryHash = params.category;
    const category = list.find(cat => cat.hash === categoryHash);

    if (isLoading) {
      return <Loader>Загрузка категорий</Loader>;
    }

    return (
      <div>
        {this.renderHeader(category)}
        <Categories />
        <ProblemsList />
      </div>
    );
  }
}

Catalog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  categories: PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,

  handleGetCategories: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = dispatch => ({
  handleGetCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
