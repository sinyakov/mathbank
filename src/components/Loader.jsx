import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotateLoader = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const showLoader = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  margin: 80px auto;
  width: 80px;
  height: 80px;
  border: solid 8px rgba(150, 150, 150, 0);
  border-bottom-color: #fff;
  border-radius: 50%;
  font-size: 0;
  opacity: 0;
  animation: ${rotateLoader} 1s infinite linear, ${showLoader} 0.2s 1 ease-out 0.2s forwards;
`;

const Loader = ({ children }) => <Wrapper>{children}</Wrapper>;

Loader.defaultProps = {
  children: 'Загрузка',
};

Loader.propTypes = {
  children: PropTypes.string,
};

export default Loader;
