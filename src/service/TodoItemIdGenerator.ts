import { TodoItemId } from '../domain/TodoItem';

// utility for creating unique Id
let id: TodoItemId = 0;

export function generateTodoItemId(): TodoItemId {
  return id++;
}
