import { BehaviorSubject } from 'rxjs';

export type Reducer<TState, TAction> = (
  state: TState,
  action: TAction,
) => TState;

export type Dispatch<TAction> = (action: TAction) => void;

export interface Service<TState, TAction> {
  initialState: () => TState;
  reducer: Reducer<TState, TAction>;
  effects?: (
    action: TAction,
    dispatch: Dispatch<TAction>,
    state: TState,
  ) => void;
}

export interface HydratedService<TState, TAction> {
  state$: BehaviorSubject<TState>;
  dispatch: Dispatch<TAction>;
}

export const createService = <TState, TAction>(
  service: Service<TState, TAction>,
): HydratedService<TState, TAction> => {
  const state$ = new BehaviorSubject<TState>(service.initialState());

  const dispatch = (action: TAction) => {
    state$.next(service.reducer(state$.value, action));

    if (service.effects !== undefined) {
      service.effects(action, dispatch, state$.value);
    }
  };

  return {
    state$,
    dispatch,
  };
};
