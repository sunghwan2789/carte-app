import { atom } from 'recoil'

type CartesState = CarteDto[] | undefined

const initialState: CartesState = undefined

const cacheKey = 'carte-v2-cartes'

function init(): CartesState {
  const cache = localStorage.getItem(cacheKey)
  if (cache) {
    return JSON.parse(cache)
  }
  return initialState
}

export const cartesState = atom<CartesState>({
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
