import { Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState
} from 'recoil'
import BackTopBar from '../components/BackTopBar'
import SchoolList from '../components/SchoolList'
import { schoolState } from '../state/schoolState'
import { delay } from '../utils'

let abortController = new AbortController()

const getSchoolsQuery = selectorFamily<SchoolDto[], { query: string }>({
  key: 'schools',
  get:
    ({ query }) =>
    async () => {
      abortController.abort()
      const fetchController = new AbortController()
      abortController = fetchController

      if (!query) {
        return []
      }

      await delay(500)

      const response = await fetch(
        `/carte/api/v1/schools?${new URLSearchParams({
          q: query
        })}`,
        { signal: fetchController.signal }
      )
      if (!response.ok) {
        throw new Error('data fetch error')
      }

      return response.json()
    }
})

export default function SchoolsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const schools = useRecoilValueLoadable(getSchoolsQuery({ query }))
  const refreshSchools = useRecoilRefresher_UNSTABLE(getSchoolsQuery({ query }))
  const setSchool = useSetRecoilState(schoolState)

  useEffect(() => {
    if (schools.state === 'hasError') {
      refreshSchools()
    }
  }, [schools, refreshSchools])

  function handleSchoolSelect(school: SchoolDto) {
    setSchool(school)
    navigate('/')
  }

  return (
    <>
      <BackTopBar>
        <Input
          type="search"
          placeholder="학교를 검색하세요"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          autoFocus
          fullWidth
          style={{ color: 'inherit' }}
        />
      </BackTopBar>
      <main>
        <SchoolList
          loading={schools.state !== 'hasValue'}
          schools={schools.contents}
          onSelect={handleSchoolSelect}
        />
      </main>
    </>
  )
}
