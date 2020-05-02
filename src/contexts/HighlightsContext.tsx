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
      const { id, words, ...other } = action.highlight;

      return [...state.map((highlight) => {
        if (highlight.id === id) {
          return {
            ...other,
            id,
            words: sanitizeWords(words),
          };
        }

        return highlight;
      })];
    }
    case 'DELETE': {
      const { id } = action.highlight;

      return [...state.filter((highlight) => highlight.id !== id)];
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

  return [state, dispatch];
}

export function useHighlight(id: string): [Highlight | undefined, Dispatch<HighlightsAction>] {
  const [state, dispatch] = useHighlights();

  const highlight = state.find((i) => i.id === id);

  return [highlight, dispatch];
}
