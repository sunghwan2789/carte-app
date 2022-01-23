import { atom, selector } from 'recoil'

type SchoolState = SchoolDto | undefined

const initialState: SchoolState = undefined

const cacheKey = 'carte-v2-school'

function init(): SchoolState {
  const cache = localStorage.getItem(cacheKey)
  if (cache) {
    return JSON.parse(cache)
  }
  return initialState
}

const school = atom<SchoolState>({
  key: `${cacheKey}/atom`,
  default: init()
})

export const schoolState = selector<SchoolState>({
  key: cacheKey,
  get: ({ get }) => get(school),
  set: ({ set }, newValue) => {
    if (newValue) {
      localStorage.setItem(cacheKey, JSON.stringify(newValue))
    } else {
      localStorage.removeItem(cacheKey)
    }

    set(school, newValue)
  }
})
