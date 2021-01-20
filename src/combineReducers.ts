import { Reducer } from './createService';

export const combineReducers = <TState, TAction>(
  ...reducers: Reducer<TState, TAction>[]
): Reducer<TState, TAction> => {
  return (state, action) =>
    reducers.reduce((nextState, reducer) => reducer(nextState, action), state);
};
