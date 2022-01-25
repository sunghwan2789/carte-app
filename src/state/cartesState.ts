import { atom, useSetRecoilState } from 'recoil'

export const cartesRefreshToken = atom<number>({
  key: 'cartes-atom',
  default: 0
})

export function useRefreshCartes() {
  const setState = useSetRecoilState(cartesRefreshToken)
  return () => {
    setState(Date.now())
  }
}
