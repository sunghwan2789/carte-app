import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

type HighlightsState = Highlight[] | undefined;
type Action =
  | { type: 'CREATE'; highlight: Highlight }
  | { type: 'UPDATE'; highlight: Highlight }
  | { type: 'DELETE'; highlight: Highlight };

const initialState: HighlightsState = [];

export const HighlightsContext = createContext<{
  state: HighlightsState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => { },
});

function highlightsReducer(
  state: HighlightsState,
  action: Action,
): HighlightsState {
  switch (action.type) {
    case 'CREATE': {
      const highlight: Highlight = {
        ...action.highlight,
        id: uuidv4(),
      };

      return [...state!, highlight];
    }
    case 'UPDATE': {
      throw new Error('not implemented');
    }
    case 'DELETE': {
      return state!.splice(
        state!.findIndex((highlight) => highlight.id === action.highlight.id),
        1,
      );
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

export function HighlightsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(highlightsReducer, initialState);

  return (
    <HighlightsContext.Provider value={{ state, dispatch }}>
      {children}
    </HighlightsContext.Provider>
  );
}

export function useHighlights(): [HighlightsState, Dispatch<Action>] {
  const context = useContext(HighlightsContext);
  if (!context) {
    throw new Error('useHighlights must be used within HighlightsProvider');
  }
  const { state, dispatch } = context;

  // TODO: find highlight by id
  return [state, dispatch];
}
