import { TodoItem, TodoItemId } from "./TodoItem";
import { TodoListFilter } from "./TodoListFilter";

function replaceItemAtIndex(arr: ReadonlyArray<TodoItem>, index: number, newValue: TodoItem): ReadonlyArray<TodoItem> {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(items: ReadonlyArray<TodoItem>, index: number): ReadonlyArray<TodoItem> {
  return [...items.slice(0, index), ...items.slice(index + 1)];
}

export class TodoItemContainer {

  static initialState = {
    items: [],
    filter: TodoListFilter.ShowAll,
    percentCompleted: 0
  };

  static create(): TodoItemContainer {
    return new TodoItemContainer(
      TodoItemContainer.initialState.items,
      TodoItemContainer.initialState.filter
    );
  }

  readonly items: ReadonlyArray<TodoItem>;
  readonly filter: TodoListFilter;
  readonly #indexes: ReadonlyMap<TodoItemId, number>;

  private constructor(
    items: ReadonlyArray<TodoItem>,
    filter: TodoListFilter,
    indexes?: ReadonlyMap<TodoItemId, number>
  ) {
    this.items = items;
    this.filter = filter;
    this.#indexes = indexes ?? new Map(items.map(({ id }, i) => [id, i]));
  }

  get numOfTotal(): number {
    return this.items.length;
  }

  get numOfCompleted(): number {
    return this.numOfTotal - this.numOfUncompleted;
  }

  get numOfUncompleted(): number {
    return this.uncompletedItems.length;
  }

  get percentCompleted(): number {
    const total = this.numOfTotal;
    const completed = this.numOfCompleted;

    return total === 0 ? 0 : completed / total;
  }

  get filteredItems(): ReadonlyArray<TodoItem> {
    switch (this.filter) {
    case TodoListFilter.ShowAll:
      return this.items;
    case TodoListFilter.ShowCompleted:
      return this.items.filter((item) => item.isComplete);
    case TodoListFilter.ShowUncompleted:
      return this.items.filter((item) => !item.isComplete);
    }
  }

  get uncompletedItems(): ReadonlyArray<TodoItem> {
    return this.items.filter((item) => !item.isComplete);
  }

  setFilter(filter: TodoListFilter): TodoItemContainer {
    return this.filter !== filter ?
      new TodoItemContainer(this.items, filter, this.#indexes) :
      this;
  }

  addItem(text: string): TodoItemContainer {
    return new TodoItemContainer([...this.items, TodoItem.create(text)], this.filter);
  }

  deleteItem(id: TodoItemId): TodoItemContainer {
    const index = this.#indexes.get(id);

    return index !== undefined ?
      new TodoItemContainer(removeItemAtIndex(this.items, index), this.filter) :
      this;
  }

  #updateItem(index: number, updater: (prev: TodoItem) => TodoItem): TodoItemContainer {
    const prevItem = this.items[index];
    const nextItem = updater(prevItem);

    return prevItem !== nextItem ?
      new TodoItemContainer(replaceItemAtIndex(this.items, index, nextItem), this.filter, this.#indexes) :
      this;
  }

  editItemText(id: TodoItemId, text: string): TodoItemContainer {
    const index = this.#indexes.get(id);
    if (index === undefined) {
      return this;
    }

    return this.#updateItem(index, prev => prev.editText(text));
  }

  toggleItemCompletion(id: TodoItemId): TodoItemContainer {
    const index = this.#indexes.get(id);
    if (index === undefined) {
      return this;
    }

    return this.#updateItem(index, prev => prev.toggleCompletion());
  }
}
