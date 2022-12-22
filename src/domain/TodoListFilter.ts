export const TodoListFilter = {
  ShowAll: 'Show All',
  ShowCompleted: 'Show Completed',
  ShowUncompleted: 'Show Uncompleted',
} as const;
export type TodoListFilter = typeof TodoListFilter[keyof typeof TodoListFilter]

export function isTodoListFilter(arg: string): arg is TodoListFilter {
  return Object.values(TodoListFilter).some(filter => filter === arg);
}
