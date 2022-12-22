import React, { ChangeEventHandler } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { isTodoListFilter, TodoListFilter } from '../domain/TodoListFilter';

import { todoState } from '../state/recoil_state';

function TodoListFilters() {
  const filter = useRecoilValue(todoState.todoListFilterState);
  const update = useRecoilCallback(todoState.updateFilter);

  const updateFilter: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    isTodoListFilter(value) && update(value);
  };

  return (
    <>
      Filter:
      <select value={filter} multiple={false} onChange={updateFilter}>
        <option value={TodoListFilter.ShowAll}>All</option>
        <option value={TodoListFilter.ShowCompleted}>Completed</option>
        <option value={TodoListFilter.ShowUncompleted}>Uncompleted</option>
      </select>
      <p></p>
    </>
  );
}

export default TodoListFilters;