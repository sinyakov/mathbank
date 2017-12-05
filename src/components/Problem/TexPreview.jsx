import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineTex } from 'react-tex';

export default class Preview extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Невалидный tex&nbsp;
          <span role="img" aria-label="attention">
            ☝🏼
          </span>
        </div>
      );
    }

    return <InlineTex texContent={this.props.text} texSeperator="$" />;
  }
}
