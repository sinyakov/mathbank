import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { TOKEN } from '../../actions/constants';
import { getProblemsByCategoryId } from '../../actions/catalog';
import reorderCategoryProblems from '../../actions/reorderCategoryProblems';
import Problem from '../Problem';
import Loader from '../Loader';
import IsAuth from '../IsAuth';
import Modal from '../Modal';
import AddProblemForm from '../ProblemForms/Add';

const renderAddProblemModalHandler = () => (
  <button className="edit-btn edit-btn--add" type="button">
    Новая задача
  </button>
);

const SortableItem = SortableElement(({ problemData }) => <Problem {...problemData} />);

const SortableList = SortableContainer(({ items }) => (
  <div className="catalog">
    {items.map((problem, index) => (
      <SortableItem key={problem.id} index={index} problemData={{ ...problem, order: index + 1 }} />
    ))}
  </div>
));

const renderList = (temp, list, isEditing, onSortEnd) => {
  if (!isEditing) {
    return (
      <div>
        {list.map((problem, index) => (
          <Problem
            key={problem.id}
            order={index + 1}
            id={problem.id}
            statement={problem.statement}
            answer={problem.answer}
            category={problem.category}
          />
        ))}
      </div>
    );
  }
  return <SortableList items={temp} onSortEnd={onSortEnd} />;
};

const fetchProblemsByCategory = (props) => {
  const {
    match: { params },
    categories: { list },
    problems,
    handleGetProblemsByCategoryId,
  } = props;

  const category = list.find(cat => cat.hash === params.category);
  if (category && !problems[category.id]) {
    handleGetProblemsByCategoryId(category.id);
  }
};

class ProblemsList extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    problems: PropTypes.shape({
      list: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    categories: PropTypes.shape({
      list: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    handleReorderCategoryProblems: PropTypes.func.isRequired,
  };

  state = {
    isEditing: false,
    temp: null,
  };

  componentDidMount() {
    fetchProblemsByCategory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = this.props;
    const { match: { params: nextParams } } = nextProps;

    const isRouteChanged = params.category !== nextParams.category;
    if (isRouteChanged) {
      fetchProblemsByCategory(nextProps);
      this.setState({ isEditing: false });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(() => ({
      temp: arrayMove(this.state.temp, oldIndex, newIndex),
    }));
  };

  onReorder = () => {
    const { match: { params }, categories: { list }, problems } = this.props;
    const category = list.find(cat => cat.hash === params.category);
    const currentProblems = category && problems[category.id];

    this.setState({
      isEditing: true,
      temp: currentProblems.list,
    });
  };

  onSaveReorder = (id, list) => {
    this.props.handleReorderCategoryProblems(cookies.get(TOKEN), id, list).then(() =>
      this.setState({
        isEditing: false,
      }));
  };

  onCancelReorder = () => {
    this.setState({
      isEditing: false,
    });
  };

  render() {
    const { match: { params }, categories: { list }, problems } = this.props;
    const category = list.find(cat => cat.hash === params.category);

    const currentProblems = category && problems[category.id];

    if (!currentProblems) {
      return null;
    }

    if (currentProblems.isLoading) {
      return <Loader>Загрузка задач</Loader>;
    }

    return (
      <div className="catalog">
        <IsAuth>
          <div className="catalog__admin">
            {!this.state.isEditing ? (
              <div className="admin__order">
                <button onClick={this.onReorder} type="button" className="admin__order-start">
                  Изменить порядок
                </button>
              </div>
            ) : (
              <div className="admin__order">
                <button
                  onClick={() => this.onSaveReorder(category.id, this.state.temp)}
                  type="button"
                  className="admin__order-save"
                >
                  Сохранить
                </button>
                <button
                  onClick={this.onCancelReorder}
                  type="button"
                  className="admin__order-cancel"
                >
                  Отменить
                </button>
              </div>
            )}
            <Modal title="Новая задача" handler={renderAddProblemModalHandler()}>
              <AddProblemForm defaultCategory={category.id} />
            </Modal>
          </div>
        </IsAuth>
        {currentProblems.list.length === 0 ? (
          <div className="catalog__info">
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </div>
        ) : (
          renderList(this.state.temp, currentProblems.list, this.state.isEditing, this.onSortEnd)
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ problems, categories }) => ({
  problems,
  categories,
});

const mapDispatchToProps = dispatch => ({
  handleGetProblemsByCategoryId: id => dispatch(getProblemsByCategoryId(id)),
  handleReorderCategoryProblems: (token, id, list) =>
    dispatch(reorderCategoryProblems(token, id, list)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemsList));
