import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled, { keyframes } from 'styled-components';

import { TOKEN } from '../../actions/constants';
import { getProblemsByCategoryId } from '../../actions/catalog';
import reorderCategoryProblems from '../../actions/reorderCategoryProblems';
import Problem from '../Problem';
import Loader from '../Loader';
import Modal from '../Modal';
import AddProblemForm from '../ProblemForms/Add';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  margin: 16px 0;
  animation: ${fadeIn} 0.35s ease-in;
`;

const Admin = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin: 16px 0;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 1px #aaa;
`;

const AddButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  margin-left: auto;
  padding: 4px 8px;
  width: 128px;
  border: none;
  border-radius: 0;
  background-color: rgba(89, 203, 191, 0.85);
  font-size: 14px;
  cursor: pointer;
`;

const Reorder = styled.div`
  display: flex;
  margin: 0;
  width: 160px;
`;

const ReorderStartButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 4px 8px;
  width: 100%;
  border: none;
  border-radius: 0;
  background-color: rgba(255, 191, 89, 0.85);
  font-size: 14px;
  cursor: pointer;
`;

const ReorderSaveButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 4px 8px;
  width: 50%;
  border: none;
  border-radius: 0;
  background-color: rgba(120, 221, 140, 0.85);
  font-size: 12px;
  cursor: pointer;
`;

const ReorderCancelButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 4px 8px;
  width: 50%;
  border: none;
  border-radius: 0;
  background-color: rgba(252, 109, 109, 0.85);
  font-size: 12px;
  cursor: pointer;
`;

const Message = styled.div`
  margin: 12px 0;
  padding: 8px;
  border-radius: 3px;
  background-color: rgba(254, 255, 202, 0.9);
  box-shadow: 0 0 1px #aaa;
  font-size: 17px;
  animation: ${fadeIn} 0.35s ease-in;
`;

const renderAddProblemModalHandler = () => <AddButton type="button">Новая задача</AddButton>;

const SortableItem = SortableElement(({ problemData }) => <Problem {...problemData} />);

const SortableList = SortableContainer(({ items }) => (
  <Wrapper>
    {items.map((problem, index) => (
      <SortableItem key={problem.id} index={index} problemData={{ ...problem, order: index + 1 }} />
    ))}
  </Wrapper>
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
      list: PropTypes.array,
      isLoading: PropTypes.bool,
    }).isRequired,
    categories: PropTypes.shape({
      list: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    handleReorderCategoryProblems: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    problems: PropTypes.shape({
      list: [],
      isLoading: true,
    }).isRequired,
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
    const {
      match: { params }, categories: { list }, problems, isAdmin,
    } = this.props;
    const category = list.find(cat => cat.hash === params.category);
    const currentProblems = category && problems[category.id];

    if (!currentProblems) {
      return null;
    }

    if (currentProblems.isLoading) {
      return <Loader>Загрузка задач</Loader>;
    }

    return (
      <Wrapper>
        {isAdmin && (
          <Admin>
            <Reorder>
              {!this.state.isEditing ? (
                <ReorderStartButton onClick={this.onReorder} type="button">
                  Изменить порядок
                </ReorderStartButton>
              ) : (
                <Reorder>
                  <ReorderSaveButton
                    onClick={() => this.onSaveReorder(category.id, this.state.temp)}
                    type="button"
                  >
                    Сохранить
                  </ReorderSaveButton>
                  <ReorderCancelButton onClick={this.onCancelReorder} type="button">
                    Отменить
                  </ReorderCancelButton>
                </Reorder>
              )}{' '}
            </Reorder>

            <Modal title="Новая задача" handler={renderAddProblemModalHandler()}>
              <AddProblemForm defaultCategory={category.id} />
            </Modal>
          </Admin>
        )}
        {currentProblems.list.length === 0 ? (
          <Message>
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </Message>
        ) : (
          renderList(this.state.temp, currentProblems.list, this.state.isEditing, this.onSortEnd)
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ problems, categories, currentUser }) => ({
  problems,
  categories,
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

const mapDispatchToProps = dispatch => ({
  handleGetProblemsByCategoryId: id => dispatch(getProblemsByCategoryId(id)),
  handleReorderCategoryProblems: (token, id, list) =>
    dispatch(reorderCategoryProblems(token, id, list)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemsList));
