import { BehaviorSubject } from 'rxjs';

export interface Service<TState, TAction> {
  initialState: TState;
  reducer: (state: TState, action: TAction) => TState;
  effects?: (
    action: TAction,
    dispatch: (action: TAction) => void,
    state: TState
  ) => void;
}

export interface HydratedService<TState, TAction> {
  state$: BehaviorSubject<TState>;
  dispatch: (action: TAction) => void;
}

export const createService = <TState, TAction>(
  service: Service<TState, TAction>
): HydratedService<TState, TAction> => {
  const state$ = new BehaviorSubject<TState>(service.initialState);

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
