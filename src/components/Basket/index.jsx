import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { reorderProblems } from '../../actions/basket';
import Problem from '../Problem';
import BackLink from '../BackLink';

const SortableItem = SortableElement(({ problemData }) => <Problem {...problemData} />);

const SortableList = SortableContainer(({ items, section }) => (
  <div className="catalog">
    {items.map((problem, index) => (
      <SortableItem
        key={problem.id}
        index={index}
        problemData={{ ...problem, section, order: index + 1 }}
      />
    ))}
  </div>
));

class Basket extends Component {
  static propTypes = {
    problemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    reorderProblems: PropTypes.func.isRequired,
  };

  componentWillMount() {
    document.body.style.backgroundColor = 'rgb(140, 46, 46)';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '#5074ab';
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderProblems(arrayMove(this.props.problemsList, oldIndex, newIndex));
  };

  render() {
    return (
      <div>
        <header className="category-header">
          <BackLink />
          <h1 className="category-header__title">
            <div className="category-header__title-outer">
              <div className="category-header__title-inner">Новое домашнее задание</div>
            </div>
          </h1>
        </header>
        <SortableList items={this.props.problemsList} onSortEnd={this.onSortEnd} section="basket" />
        <button type="submit" className="primary-button">
          Сохранить
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ basket }) => ({
  problemsList: basket.list,
});

const mapDispatchToProps = dispatch => ({
  reorderProblems: orderedList => dispatch(reorderProblems(orderedList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
