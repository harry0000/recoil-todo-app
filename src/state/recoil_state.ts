import { atom, selector } from 'recoil';

import type { TodoItem } from '../domain/TodoItem';
import { TodoListFilter } from '../domain/TodoListFilter';

const todoListState = atom<ReadonlyArray<TodoItem>>({
  key: 'todoListState',
  default: []
});

const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: TodoListFilter.ShowAll
});

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
    case TodoListFilter.ShowCompleted:
      return list.filter((item) => item.isComplete);
    case TodoListFilter.ShowUncompleted:
      return list.filter((item) => !item.isComplete);
    default:
      return list;
    }
  }
});

const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    let allText = '';
    todoList
      .filter((item) => !item.isComplete)
      .map((item) => (allText = allText + ' ' + item.text));
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
      allText
    };
  }
});

export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListStatsState
};
