export const TodoListFilter = {
  ShowAll: 'Show All',
  ShowCompleted: 'Show Completed',
  ShowUncompleted: 'Show Uncompleted',
} as const;
export type TodoListFilter = typeof TodoListFilter[keyof typeof TodoListFilter]
