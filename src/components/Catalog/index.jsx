import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Categories from './Categories';
import BasketCounter from './BasketCounter';
import ProblemsList from '../ProblemsList';

const Catalog = (props) => {
  const { problemsDict, categoriesList } = props;
  const categoryHash = props.match.params.category;
  const category = categoriesList.find(cat => cat.alias === categoryHash);

  if (!category) {
    return (
      <header className="category-header">
        <h1 className="category-header__title">
          <div className="category-header__title-outer">
            <div className="category-header__title-inner">Категория отсутствует</div>
          </div>
        </h1>
        <BasketCounter />
      </header>
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
      <ProblemsList list={problemsDict[categoryHash]} section="catalog" />
    </div>
  );
};

Catalog.propTypes = {
  problemsDict: PropTypes.objectOf(PropTypes.array).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = ({ categories, problems }) => ({
  categoriesList: categories.list,
  problemsDict: problems.dict,
});

export default connect(mapStateToProps)(Catalog);
