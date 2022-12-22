import React from 'react';
import { useRecoilValue } from 'recoil';

import { todoState } from '../state/recoil_state';

const {
  todoListTotalState,
  todoListTotalCompletedState,
  todoListTotalUncompletedState,
  todoListPercentCompletedState,
  todoListNotCompletedTextsState
} = todoState;

const Total = () => {
  const totalNum = useRecoilValue(todoListTotalState);

  return (<span>{totalNum}</span>);
};

const TotalCompleted = () => {
  const totalCompletedNum = useRecoilValue(todoListTotalCompletedState);

  return (<span>{totalCompletedNum}</span>);
};

const TotalUncompleted = () => {
  const totalUncompletedNum = useRecoilValue(todoListTotalUncompletedState);

  return (<span>{totalUncompletedNum}</span>);
};

const FormattedPercentCompleted = () => {
  const percentCompleted = useRecoilValue(todoListPercentCompletedState);
  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (<span>{formattedPercentCompleted}</span>);
};

const UncompletedTexts = () => {
  const texts = useRecoilValue(todoListNotCompletedTextsState);

  return (<span>{texts.join(' ')}</span>);
};

const TodoListStats = () => {
  return (
    <ul>
      <li>Total items: <Total /></li>
      <li>Items completed: <TotalCompleted /></li>
      <li>Items not completed: <TotalUncompleted /></li>
      <li>Percent completed: <FormattedPercentCompleted /></li>
      <li>Text not completed: <UncompletedTexts /></li>
    </ul>
  );
};

export default TodoListStats;