import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

type SchoolState = SchoolDto | undefined

const initialState: SchoolState = undefined

export const SchoolContext = createContext<{
  school: SchoolState
  setSchool: Dispatch<SetStateAction<SchoolState>>
}>({
  school: initialState,
  setSchool: () => {}
})

const cacheKey = 'carte-v2-school'

function init(): SchoolState {
  const cache = localStorage.getItem(cacheKey)
  if (cache) {
    return JSON.parse(cache)
  }
  return initialState
}

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [school, setSchool] = useState(init)

  useEffect(() => {
    if (school) {
      localStorage.setItem(cacheKey, JSON.stringify(school))
    } else {
      localStorage.removeItem(cacheKey)
    }
  }, [school])

  return (
    <SchoolContext.Provider value={{ school, setSchool }}>
      {children}
    </SchoolContext.Provider>
  )
}

export function useSchool(): [
  SchoolState,
  Dispatch<SetStateAction<SchoolState>>
] {
  const context = useContext(SchoolContext)
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider')
  }
  const { school, setSchool } = context

  return [school, setSchool]
}
