import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderLink = styled(NavLink)`
  position: absolute;
  top: 0;
  left: ${props => (props.left ? '-46px' : 'auto')};
  right: ${props => (props.right ? '-46px' : 'auto')};
  z-index: 1000;
  display: block;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 3px;
  background: white;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  text-decoration: none;
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 840px) {
    left: ${props => (props.left ? '0' : 'auto')};
    right: ${props => (props.right ? '0' : 'auto')};
    border-radius: 0;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: none;

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const HeaderButton = styled.button`
  position: absolute;
  top: 0;
  right: -46px;
  z-index: 1000;
  display: block;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 3px;
  background: white;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  text-decoration: none;
  text-decoration: none;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 840px) {
    right: 0;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: none;

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
`;
