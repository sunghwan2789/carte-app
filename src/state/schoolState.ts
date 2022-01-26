import { atom } from 'recoil'

type SchoolState = SchoolDto | undefined

const initialState: SchoolState = undefined

const cacheKey = 'carte-v2-school'

function init(): SchoolState {
  const cache = localStorage.getItem(cacheKey)
  if (cache) {
    return JSON.parse(cache)
  }

  const v1Cache = localStorage.getItem('carte-v1-school-store')
  if (v1Cache) {
    const v1Transform = ({
      address,
      code: school_code,
      courseCode: course_code,
      domainCode: domain_code,
      name
    }: any) => ({
      address,
      course_code,
      domain_code,
      name,
      school_code
    })
    return v1Transform(JSON.parse(v1Cache).selectedSchool)
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
