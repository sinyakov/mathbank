import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Categories = ({ categoriesList }) => (
  <div className="filter">
    {categoriesList.map(cat => (
      <a className="filter__item" key={cat.alias} href={`/category/${cat.alias}`}>
        {cat.name}
      </a>
    ))}
  </div>
);

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categoriesList: categories.list,
});

export default connect(mapStateToProps)(Categories);
