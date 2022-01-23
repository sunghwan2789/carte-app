import { atom } from 'recoil'

const cacheKey = 'carte-v2-cartes'

export const cartesState = atom<number>({
  key: cacheKey,
  default: 0,
  effects_UNSTABLE: [
    ({ onSet }) =>
      onSet(() => {
        localStorage.removeItem(cacheKey)
      })
  ]
})
