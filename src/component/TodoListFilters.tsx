import React, { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';

import { todoListFilterState } from '../state/recoil_state';
import { TodoListFilter } from '../domain/TodoListFilter';

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value={TodoListFilter.ShowAll}>All</option>
        <option value={TodoListFilter.ShowCompleted}>Completed</option>
        <option value={TodoListFilter.ShowUncompleted}>Uncompleted</option>
      </select>
      <p></p>
    </>
  );
}

export default TodoListFilters;