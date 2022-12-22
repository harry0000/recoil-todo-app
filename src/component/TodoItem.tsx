import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { TodoItemId } from '../domain/TodoItem';

import { todoState } from '../state/recoil_state';

const TodoItemTextField: React.FC<{ itemId: TodoItemId }> = ({ itemId }) => {
  const text = useRecoilValue(todoState.todoItemTextState(itemId));
  const editText = useRecoilCallback(todoState.editTodoItemText);

  return (
    <input
      type="text"
      value={text}
      onChange={({ target: { value } }) => { editText(itemId, value); }}
    />
  );
};

const TodoItemCompletionCheckbox: React.FC<{ itemId: TodoItemId }> = ({ itemId }) => {
  const isComplete = useRecoilValue(todoState.todoItemCompletionState(itemId));
  const toggleCompletion = useRecoilCallback(todoState.toggleTodoItemCompletion);

  return (
    <input
      type="checkbox"
      checked={isComplete}
      onChange={() => { toggleCompletion(itemId); }}
    />
  );
};

const TodoItemDeleteButton: React.FC<{ itemId: TodoItemId }> = ({ itemId }) => {
  const deleteItem = useRecoilCallback(todoState.deleteTodoItem);

  return (<button onClick={() => { deleteItem(itemId); }}>X</button>);
};

const TodoItem: React.FC<{ itemId: TodoItemId }> = React.memo(({ itemId }) => {
  return (
    <div>
      <TodoItemTextField itemId={itemId} />
      <TodoItemCompletionCheckbox itemId={itemId} />
      <TodoItemDeleteButton itemId={itemId} />
    </div>
  );
});
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = { itemId: PropTypes.number.isRequired };

export default TodoItem;
