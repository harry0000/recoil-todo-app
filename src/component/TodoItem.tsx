import React, { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';

import type { TodoItem as Item } from '../domain/TodoItem';

import { todoListState } from '../state/recoil_state';

const replaceItemAtIndex = (arr: ReadonlyArray<Item>, index: number, newValue: Item) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr: ReadonlyArray<Item>, index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const TodoItem: React.FC<{ item: Item }> = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;
