import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled, { keyframes } from 'styled-components';
import cookies from 'js-cookie';

import { reorderProblems, createHomework } from '../../actions/basket';
import Problem from '../Problem';
import Header from '../Header';
import { TOKEN } from '../../actions/constants';

const Form = styled.form`
  display: flex;
  margin: 16px 0;
`;

const Input = styled.input`
  flex: 1 0;
  margin: 8px 0;
  margin-right: 16px;
  padding: 6px;
  width: 55%;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  font-size: 16px;
`;

const Button = styled.button`
  margin: 8px 0;
  padding: 6px;
  width: 120px;
  border: none;
  border-radius: 3px;
  background: rgba(255, 255, 140, 0.9);
  box-shadow: 0 0 2px #999;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 140, 0.8);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
    console.log({
      title: this.title,
    });
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
          <Form onSubmit={e => this.saveHomework(e)}>
            <Input
              type="text"
              placeholder="Домашнее задание"
              defaultValue="Домашнее задание "
              innerRef={(e) => {
                this.title = e;
              }}
            />
            <Button type="submit">Сохранить</Button>
          </Form>
        ) : (
          <Message>
            Нет ни одной задачи&nbsp;
            <span role="img" aria-labelledby="sad">
              😔
            </span>
          </Message>
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
