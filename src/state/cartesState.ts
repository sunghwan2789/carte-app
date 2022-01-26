import { atom, useSetRecoilState } from 'recoil'

export const cartesRefreshToken = atom<number>({
  key: 'cartes-atom',
  default: 0
})

export function useRefreshCartes() {
  function sendAndWait(message: { type: string }) {
    const {
      serviceWorker: { controller }
    } = navigator

    if (!controller) {
      return
    }

    const channel = new MessageChannel()

    controller.postMessage(message, [channel.port2])

    return new Promise((resolve) => {
      channel.port1.onmessage = (e) => {
        resolve(e.data)
      }
    })
  }

  const setState = useSetRecoilState(cartesRefreshToken)
  return async () => {
    await sendAndWait({ type: 'refresh-cartes' })
    setState(Date.now())
  }
}
