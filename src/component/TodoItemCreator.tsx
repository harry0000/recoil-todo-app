import React, { ChangeEventHandler, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { todoState } from '../state/recoil_state';

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const addTodoItem = useRecoilCallback(todoState.addTodoItem);

  const addItem = () => {
    addTodoItem(inputValue);
    setInputValue('');
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;
