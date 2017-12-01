import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategories } from '../../actions/catalog';
import Categories from './Categories';
import ProblemsList from './ProblemsList';
import Loader from '../Loader';
import Header from '../Header';

class Catalog extends Component {
  componentDidMount() {
    const { categories: { list: categoriesList }, handleGetCategories } = this.props;

    if (!categoriesList.length) {
      handleGetCategories();
    }
  }

  render() {
    const { categories: { list, isLoading }, match: { params } } = this.props;
    const categoryHash = params.category;
    const category = list.find(cat => cat.hash === categoryHash);

    if (isLoading) {
      return <Loader>Загрузка категорий</Loader>;
    }

    return (
      <div>
        <Header title={category ? category.name : 'Категория отсутствует'} showBasketCounter />
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
