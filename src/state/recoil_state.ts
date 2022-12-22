import { atom, atomFamily, CallbackInterface, GetRecoilValue, RecoilValueReadOnly } from 'recoil';
import deepEqual from 'fast-deep-equal';

import { TodoItem, TodoItemId } from '../domain/TodoItem';
import { TodoItemContainer } from '../domain/TodoItemContainer';
import { TodoListFilter } from '../domain/TodoListFilter';

function getDeletedItemIds(prev: TodoItemContainer, next: TodoItemContainer): ReadonlyArray<TodoItemId> {
  const prevItemIds = prev.items.map(({ id }) => id);
  const nextItemIds = next.items.map(({ id }) => id);

  const current = new Set(nextItemIds);
  return prevItemIds.filter(id => !current.has(id));
}

class TodoState {

  readonly #itemContainer = atom({
    key: 'TodoState.#itemContainer',
    default: TodoItemContainer.create()
  });

  readonly #filter = atom<TodoListFilter>({
    key: 'TodoState.#filter',
    default: TodoItemContainer.initialState.filter
  });

  readonly #filteredItemIds = atom<ReadonlyArray<TodoItemId>>({
    key: 'TodoState.#filteredItemIds',
    default: TodoItemContainer.initialState.items
  });

  readonly #numOfTotal = atom({
    key: 'TodoState.#numOfTotal',
    default: TodoItemContainer.initialState.items.length
  });

  readonly #numOfCompleted = atom({
    key: 'TodoState.#numOfCompleted',
    default: TodoItemContainer.initialState.items.length
  });

  readonly #numOfUncompleted = atom({
    key: 'TodoState.#numOfUncompleted',
    default: TodoItemContainer.initialState.items.length
  });

  readonly #percentCompleted = atom({
    key: 'TodoState.#percentCompleted',
    default: TodoItemContainer.initialState.percentCompleted
  });

  readonly #uncompletedTexts = atom<ReadonlyArray<string>>({
    key: 'TodoState.#uncompletedTexts',
    default: TodoItemContainer.initialState.items
  });

  readonly #items = {
    text: atomFamily<string, TodoItemId>({ key: 'TodoState.#items.text', default: TodoItem.initialState.text}),
    completion: atomFamily<boolean, TodoItemId>({ key: 'TodoState.#items.completion', default: TodoItem.initialState.isComplete})
  };

  #updateState = ({ set, reset, snapshot }: CallbackInterface) => (updater: (state: TodoItemContainer) => TodoItemContainer): void => {
    const get: GetRecoilValue = (recoilVal) => snapshot.getLoadable(recoilVal).getValue();

    const prevState = get(this.#itemContainer);
    const nextState = updater(prevState);
    set(this.#itemContainer, nextState);

    set(this.#filter, nextState.filter);

    const prevFilteredIds = get(this.#filteredItemIds);
    const nextFilteredIds = nextState.filteredItems.map(({ id }) => id);
    if (!deepEqual(prevFilteredIds, nextFilteredIds)) {
      set(this.#filteredItemIds, nextFilteredIds);
    }

    set(this.#numOfTotal, nextState.numOfTotal);
    set(this.#numOfCompleted, nextState.numOfCompleted);
    set(this.#numOfUncompleted, nextState.numOfUncompleted);
    set(this.#percentCompleted, nextState.percentCompleted);

    const prevTexts = get(this.#uncompletedTexts);
    const nextTexts = nextState.uncompletedItems.map(({ text }) => text);
    if (!deepEqual(prevTexts, nextTexts)) {
      set(this.#uncompletedTexts, nextTexts);
    }

    getDeletedItemIds(prevState, nextState).forEach(id => {
      reset(this.#items.text(id));
      reset(this.#items.completion(id));
    });
    nextState.items.forEach(({ id, text, isComplete }) => {
      set(this.#items.text(id), text);
      set(this.#items.completion(id), isComplete);
    });
  }

  readonly todoListFilterState: RecoilValueReadOnly<TodoListFilter> = this.#filter;
  readonly filteredTodoListState: RecoilValueReadOnly<ReadonlyArray<TodoItemId>> = this.#filteredItemIds;

  readonly todoListTotalState: RecoilValueReadOnly<number> = this.#numOfTotal;
  readonly todoListTotalCompletedState: RecoilValueReadOnly<number> = this.#numOfCompleted;
  readonly todoListTotalUncompletedState: RecoilValueReadOnly<number> = this.#numOfUncompleted;
  readonly todoListPercentCompletedState: RecoilValueReadOnly<number> = this.#percentCompleted;

  readonly todoListNotCompletedTextsState: RecoilValueReadOnly<ReadonlyArray<string>> = this.#uncompletedTexts;

  readonly todoItemTextState: (id: TodoItemId) => RecoilValueReadOnly<string> = (id) => this.#items.text(id);
  readonly todoItemCompletionState: (id: TodoItemId) => RecoilValueReadOnly<boolean> = (id) => this.#items.completion(id);

  readonly addTodoItem = (cbi: CallbackInterface) => (text: string): void => {
    this.#updateState(cbi)(state => state.addItem(text));
  };

  readonly editTodoItemText = (cbi: CallbackInterface) => (id: TodoItemId, text: string): void => {
    this.#updateState(cbi)(state => state.editItemText(id, text));
  };

  readonly toggleTodoItemCompletion = (cbi: CallbackInterface) => (id: TodoItemId): void => {
    this.#updateState(cbi)(state => state.toggleItemCompletion(id));
  };

  readonly deleteTodoItem = (cbi: CallbackInterface) => (id: TodoItemId): void => {
    this.#updateState(cbi)(state => state.deleteItem(id));
  };

  readonly updateFilter = (cbi: CallbackInterface) => (filter: TodoListFilter): void => {
    this.#updateState(cbi)(state => state.setFilter(filter));
  };
}

export const todoState = new TodoState();
