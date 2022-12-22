import React from 'react';
import { useRecoilValue } from 'recoil';

import TodoListStats from './TodoListStats';
import TodoListFilters from './TodoListFilters';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';

import { todoState } from '../state/recoil_state';

const TodoItemList = () => {
  const todoItemIds = useRecoilValue(todoState.filteredTodoListState);

  return (
    <div>
      {todoItemIds.map((id) => (<TodoItem key={id} itemId={id} />))}
    </div>
  )
};

const TodoList = () => {
  return (
    <>
      <TodoListStats />
      <div style={{ display: 'flex', gap: '10px' }}>
        <TodoItemCreator />
        <TodoListFilters />
      </div>
      <TodoItemList />
    </>
  );
};

export default TodoList;
