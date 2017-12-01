import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { reorderProblems, createHomework } from '../../actions/basket';
import Problem from '../Problem';
import Header from '../Header';
import { TOKEN } from '../../actions/constants';

const SortableItem = SortableElement(({ problemData }) => <Problem {...problemData} />);

const SortableList = SortableContainer(({ items }) => (
  <div className="catalog">
    {items.map((problem, index) => (
      <SortableItem key={problem.id} index={index} problemData={{ ...problem, order: index + 1 }} />
    ))}
  </div>
));

class Basket extends Component {
  static propTypes = {
    problemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    reorderProblems: PropTypes.func.isRequired,
    handleCreateHomework: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      saved: false,
      id: null,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderProblems(arrayMove(this.props.problemsList, oldIndex, newIndex));
  };

  saveHomework = (e) => {
    e.preventDefault();
    this.props
      .handleCreateHomework(cookies.get(TOKEN), {
        list: this.props.problemsList.map(problem => problem.id),
        title: this.title.value,
      })
      .then((data) => {
        this.setState({ saved: true, id: data.id });
      });
  };

  render() {
    if (this.state.saved) {
      return <Redirect push to={`/homework/${this.state.id}`} />;
    }

    return (
      <div>
        <Header title="Новое домашнее задание" showBackLink notShowAuthLink />
        <SortableList items={this.props.problemsList} onSortEnd={this.onSortEnd} />

        {this.props.problemsList.length ? (
          <form onSubmit={e => this.saveHomework(e)} className="basket-form">
            <input
              type="text"
              placeholder="Домашнее задание"
              defaultValue="Домашнее задание"
              ref={(e) => {
                this.title = e;
              }}
              className="basket-form-input"
            />

            <button type="submit" className="basket-form-btn">
              Сохранить
            </button>
          </form>
        ) : (
          <div className="catalog__info">
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ basket }) => ({
  problemsList: basket.list,
});

const mapDispatchToProps = dispatch => ({
  reorderProblems: orderedList => dispatch(reorderProblems(orderedList)),
  handleCreateHomework: (token, homework) => dispatch(createHomework(token, homework)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
