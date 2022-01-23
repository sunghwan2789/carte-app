import { atom } from 'recoil'

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

export const schoolState = atom<SchoolState>({
  key: cacheKey,
  default: init(),
  effects_UNSTABLE: [
    ({ onSet }) =>
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem(cacheKey, JSON.stringify(newValue))
        } else {
          localStorage.removeItem(cacheKey)
        }
      })
  ]
})
