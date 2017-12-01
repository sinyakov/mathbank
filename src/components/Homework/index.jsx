import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Header';
import Problem from '../Problem';
import Loader from '../Loader';
import { getHomework } from '../../actions/homeworks';

class Homework extends Component {
  static propTypes = {
    homeworkHash: PropTypes.string.isRequired,
    homework: PropTypes.shape({
      list: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }),
    handleGetHomework: PropTypes.func.isRequired,
  };

  static defaultProps = {
    homework: null,
  };

  componentDidMount() {
    const { handleGetHomework, homeworkHash } = this.props;
    handleGetHomework(homeworkHash);
  }

  render() {
    const { homework } = this.props;

    if (!homework || homework.isLoading) {
      return <Loader>Загрузка домашего задания</Loader>;
    }

    return (
      <div>
        <Header
          title={homework.error ? 'Нет такого домашнего задания' : homework.title}
          showBackLink
          showBasketCounter
        />
        <div className="catalog">
          {homework.list &&
            homework.list.map(({ id, statement, answer }, index) => (
              <Problem key={id} order={index + 1} id={id} statement={statement} answer={answer} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ homeworks }, ownProps) => ({
  homework: homeworks[ownProps.match.params.homework],
  homeworkHash: ownProps.match.params.homework,
});

const mapDispatchToProps = dispatch => ({
  handleGetHomework: id => dispatch(getHomework(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
