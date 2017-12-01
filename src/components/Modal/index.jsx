import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import remove from './img/remove.svg';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

const Window = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: auto;
  padding: 16px;
  max-width: 640px;
  width: 100%;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

const Header = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  font-weight: 400;
  font-size: 1.6em;
`;

const Close = styled.button`
  position: absolute;
  top: 18px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 2px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #eee;
  background-image: url(${remove});
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  font-size: 0;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: rotate(180deg);
  }
`;

const Content = styled.div`
  margin-top: 8px;
`;

class Modal extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    handler: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  toggleModal = () => {
    this.setState(state => ({
      isActive: !state.isActive,
    }));
  };

  render() {
    const { children, title, handler } = this.props;

    if (this.state.isActive) {
      return (
        <Backdrop>
          <Window>
            <Header>{title}</Header>
            <Close onClick={this.toggleModal} type="button">
              Закрыть окно
            </Close>
            <Content>
              {React.cloneElement(children, {
                onToggle: this.toggleModal,
              })}
            </Content>
          </Window>
        </Backdrop>
      );
    }
    return React.cloneElement(handler, {
      onClick: this.toggleModal,
    });
  }
}

export default Modal;
