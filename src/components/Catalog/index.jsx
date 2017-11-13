import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Categories from './Categories';
import ProblemsList from '../ProblemsList';

const Catalog = ({ problemsDict, categoriesList, categoryHash }) => {
  const category = categoriesList.find(cat => cat.alias === categoryHash);

  if (!category) {
    return (
      <header className="category-header">
        <h1 className="category-header__title">Категория отсутствует</h1>
      </header>
    );
  }

  return (
    <div>
      <header className="category-header">
        <h1 className="category-header__title">
          {category.name} — {problemsDict[categoryHash].length}
        </h1>
      </header>
      <Categories />
      <ProblemsList list={problemsDict[categoryHash]} />
    </div>
  );
};

Catalog.propTypes = {
  problemsDict: PropTypes.objectOf(PropTypes.array).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryHash: PropTypes.string.isRequired,
};

const mapStateToProps = ({ categories, problems }) => ({
  categoriesList: categories.list,
  problemsDict: problems.dict,
});

export default connect(mapStateToProps)(Catalog);
