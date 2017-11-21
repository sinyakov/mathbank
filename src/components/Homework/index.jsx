import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Problem from '../Problem';
import BackLink from '../BackLink';
import BasketCounter from '../BasketCounter';
import Loader from '../Loader';
import { getHomework } from '../../actions/homeworks';

class Homework extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  componentWillMount() {
    document.body.style.backgroundColor = '#2c7f64';
  }

  componentDidMount() {
    const { homeworks, handleGetHomework } = this.props;
    const homeworkHash = this.props.match.params.homework;
    if (!homeworks[homeworkHash]) {
      handleGetHomework(homeworkHash);
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '#5074ab';
  }

  renderHeader = homework => (
    <div>
      <header className="category-header">
        <h1 className="category-header__title">
          <div className="category-header__title-outer">
            <div className="category-header__title-inner">
              {homework.error
                ? 'Нет такого домашнего задания'
                : `Домашнее задание на ${homework.date}`}
            </div>
          </div>
        </h1>
        <BackLink />
        <BasketCounter />
      </header>
    </div>
  );

  render() {
    const { homeworks } = this.props;
    const homeworkHash = this.props.match.params.homework;

    if (!homeworks[homeworkHash] || homeworks[homeworkHash].isLoading) {
      return <Loader>Загрузка категорий</Loader>;
    }

    const homework = homeworks[homeworkHash];

    return (
      <div>
        {this.renderHeader(homework)}
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

Homework.propTypes = {
  homeworks: PropTypes.arrayOf(PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  })).isRequired,
  handleGetHomework: PropTypes.func.isRequired,
};

const mapStateToProps = ({ homeworks }) => ({
  homeworks,
});

const mapDispatchToProps = dispatch => ({
  handleGetHomework: id => dispatch(getHomework(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
