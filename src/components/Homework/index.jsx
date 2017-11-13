import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ProblemsList from '../ProblemsList';

const BackLink = () => (
  <NavLink className="go-back" to="/" title="К каталогу задач">
    ←
  </NavLink>
);

class Homework extends Component {
  static propTypes = {
    problemsDict: PropTypes.objectOf(PropTypes.array).isRequired,
    homeworksList: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  componentWillMount() {
    document.body.style.backgroundColor = '#2c7f64';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '#5074ab';
  }

  render() {
    const { problemsDict, homeworksList } = this.props;
    const homeworkHash = this.props.match.params.homework;
    const homework = homeworksList.find(hw => hw.alias === homeworkHash);

    if (!homework) {
      return (
        <header className="category-header">
          <BackLink />
          <h1 className="category-header__title">
            <div className="category-header__title-outer">
              <div className="category-header__title-inner">Домашнее задание отсутствует</div>
            </div>
          </h1>
        </header>
      );
    }

    return (
      <div>
        <header className="category-header">
          <BackLink />
          <h1 className="category-header__title">
            <div className="category-header__title-outer">
              <div className="category-header__title-inner">{homework.name}</div>
            </div>
          </h1>
        </header>
        <ProblemsList list={problemsDict[homeworkHash]} />
      </div>
    );
  }
}

const mapStateToProps = ({ homeworks, problems }) => ({
  homeworksList: homeworks.list,
  problemsDict: problems.dict,
});

export default connect(mapStateToProps)(Homework);
