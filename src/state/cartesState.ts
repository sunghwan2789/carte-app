import { atom, useSetRecoilState } from 'recoil'

const cacheKey = 'carte-v2-cartes'

export function getCachedCartes(): CarteDto[] {
  const cache = localStorage.getItem(cacheKey)
  return cache ? JSON.parse(cache) : []
}

export function setCachedCartes(cartes: CarteDto[] | undefined) {
  if (cartes) {
    localStorage.setItem(cacheKey, JSON.stringify(cartes))
  } else {
    localStorage.removeItem(cacheKey)
  }
}

export function useCachedCartes(): [
  CarteDto[],
  (cartes: CarteDto[] | undefined) => void
] {
  return [getCachedCartes(), setCachedCartes]
}

export const cartesState = atom<number>({
  key: cacheKey,
  default: 0,
  effects_UNSTABLE: [
    ({ onSet }) =>
      onSet(() => {
        setCachedCartes(undefined)
      })
  ]
})

export function useRefreshCartes() {
  const setState = useSetRecoilState(cartesState)
  return () => {
    setState(Date.now())
  }
}
