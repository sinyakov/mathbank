import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Categories = ({ categoriesList }) => (
  <div className="filter">
    {categoriesList.map(cat => (
      <NavLink className="filter__item" key={cat.hash} to={`/category/${cat.hash}`}>
        {cat.name}
      </NavLink>
    ))}
  </div>
);

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categoriesList: categories.list,
});

export default connect(mapStateToProps, null, null, { pure: false })(Categories);
