import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <div className="modal">
          <div className="modal__inner">
            <div className="modal__header">
              <h3 className="modal__title">{title}</h3>
              <button onClick={this.toggleModal} className="modal__close" type="button">
                ×
              </button>
            </div>
            <div className="modal__content">
              {React.cloneElement(children, {
                onToggle: this.toggleModal,
              })}
            </div>
          </div>
        </div>
      );
    }
    return React.cloneElement(handler, {
      onClick: this.toggleModal,
    });
  }
}

export default Modal;
