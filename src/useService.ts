import { useEffect, useRef, useState } from 'react';
import { HydratedService } from './createService';

export const useService = <TState, TAction>(
  serviceCreator: () => HydratedService<TState, TAction>
) => {
  const service = useRef(serviceCreator());

  const [state, setState] = useState<TState>(service.current.state$.value);

  useEffect(() => {
    const sub = service.current.state$.subscribe(setState);

    return () => sub.unsubscribe();
  }, []);

  return [state, service.current.dispatch] as const;
};
