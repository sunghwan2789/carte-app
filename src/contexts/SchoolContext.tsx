import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type SchoolState = SchoolDto | undefined;

const initialState: SchoolState = undefined;

export const SchoolContext = createContext<{
  school: SchoolState;
  setSchool: Dispatch<SetStateAction<SchoolState>>;
}>({
  school: initialState,
  setSchool: () => { },
});

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  // TODO: load school from localStorage
  const [school, setSchool] = useState(initialState);

  return (
    <SchoolContext.Provider value={{ school, setSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool(): [
  SchoolState,
  Dispatch<SetStateAction<SchoolState>>,
] {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  const { school, setSchool } = context;

  return [school, setSchool];
}
