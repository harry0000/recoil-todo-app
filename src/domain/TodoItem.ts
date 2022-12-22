import { generateTodoItemId } from "../service/TodoItemIdGenerator";

export type TodoItemId = number;

export class TodoItem {

  static initialState = {
    text: '',
    isComplete: false
  };

  static create(text: string): TodoItem {
    return new TodoItem(generateTodoItemId(), text, TodoItem.initialState.isComplete);
  }

  readonly id: TodoItemId;
  readonly text: string;
  readonly isComplete: boolean;

  private constructor(
    id: TodoItemId,
    text: string,
    isComplete: boolean
  ) {
    this.id = id;
    this.text = text;
    this.isComplete = isComplete;
  }

  editText(text: string): TodoItem {
    return this.text !== text ?
      new TodoItem(this.id, text, this.isComplete) :
      this;
  }

  toggleCompletion(): TodoItem {
    return new TodoItem(this.id, this.text, !this.isComplete);
  }
}
