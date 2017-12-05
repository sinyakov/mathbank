import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 12px 0;
  width: 100%;
`;

const Link = styled(NavLink)`
  margin: 4px;
  margin-left: 0;
  margin-right: 8px;
  padding: 3px 8px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 1px #aaa;
  color: #000;
  text-decoration: none;
  font-size: 13px;

  &.active {
    background: #fea;
  }

  &:hover {
    background: #fea;
  }
`;

const Categories = ({ categoriesList }) => (
  <List>
    {categoriesList.map(category => (
      <Link key={category.hash} to={`/category/${category.hash}`}>
        {category.name}
      </Link>
    ))}
  </List>
);

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categoriesList: categories.list,
});

export default withRouter(connect(mapStateToProps)(Categories));
