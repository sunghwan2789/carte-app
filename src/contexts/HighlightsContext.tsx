import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

type HighlightsState = Highlight[];
type HighlightsAction =
  | { type: 'CREATE'; highlight: Highlight }
  | { type: 'UPDATE'; highlight: Highlight }
  | { type: 'DELETE'; highlight: Highlight };

const initialState: HighlightsState = [];

export const HighlightsContext = createContext<{
  state: HighlightsState;
  dispatch: Dispatch<HighlightsAction>;
}>({
  state: initialState,
  dispatch: () => { },
});

const cacheKey = 'carte-v2-highlights';

function init(): HighlightsState {
  const cache = localStorage.getItem(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }
  return initialState;
}

function sanitizeWords(words: string[]) {
  return words
    .map((word) => word.trim())
    .filter(Boolean);
}

function highlightsReducer(
  state: HighlightsState,
  action: HighlightsAction,
): HighlightsState {
  switch (action.type) {
    case 'CREATE': {
      const { words, ...other } = action.highlight;
      const highlight: Highlight = {
        ...other,
        id: uuidv4(),
        words: sanitizeWords(words),
      };

      return [...state, highlight];
    }
    case 'UPDATE': {
      const { words, ...other } = action.highlight;
      const highlight = state.find((i) => i.id === action.highlight.id);
      Object.assign(highlight, {
        ...other,
        words: sanitizeWords(words),
      });
      return [...state];
    }
    case 'DELETE': {
      state.splice(
        state.findIndex((highlight) => highlight.id === action.highlight.id),
        1,
      );
      return [...state];
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

export function HighlightsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(highlightsReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(cacheKey, JSON.stringify(state));
  }, [state]);

  return (
    <HighlightsContext.Provider value={{ state, dispatch }}>
      {children}
    </HighlightsContext.Provider>
  );
}

export function useHighlights(): [HighlightsState, Dispatch<HighlightsAction>] {
  const context = useContext(HighlightsContext);
  if (!context) {
    throw new Error('useHighlights must be used within HighlightsProvider');
  }
  const { state, dispatch } = context;

  // TODO: find highlight by id
  return [state, dispatch];
}
