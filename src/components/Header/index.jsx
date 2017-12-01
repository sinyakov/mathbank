import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BackLink from './BackLink';
import BasketCounter from './BasketCounter';
import AuthLink from './AuthLink';

const Wrapper = styled.div`
  position: relative;
  margin: 5px 0;
  height: 38px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 840px) {
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.div`
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 8px;
  max-width: 100%;
  width: 100%;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: left;
`;

const Outer = styled.div`
  width: 100%;
  transition: all 0.3s ease-in-out;

  @media (max-width: 840px) {
    transform: translateX(50%);
  }
`;

const Inner = styled.h1`
  display: inline-block;
  margin: 0;
  font-weight: 500;
  font-size: 22px;
  line-height: 1;
  transition: all 0.3s ease-in-out;

  @media (max-width: 840px) {
    transform: translateX(-50%);
  }
`;

const Header = ({
  title, showBackLink, showBasketCounter, notShowAuthLink,
}) => (
  <Wrapper>
    {showBackLink && <BackLink />}
    {showBasketCounter && <BasketCounter />}
    {!notShowAuthLink && <AuthLink />}
    <Title>
      <Outer>
        <Inner>{title}</Inner>
      </Outer>
    </Title>
  </Wrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showBackLink: PropTypes.bool,
  showBasketCounter: PropTypes.bool,
  notShowAuthLink: PropTypes.bool,
};

Header.defaultProps = {
  showBackLink: false,
  showBasketCounter: false,
  notShowAuthLink: false,
};

export default Header;
