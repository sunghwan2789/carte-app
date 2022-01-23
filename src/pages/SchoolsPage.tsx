import { Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import BackTopBar from '../components/BackTopBar'
import SchoolList from '../components/SchoolList'
import { schoolState } from '../state/schoolState'
import { delay } from '../utils'

export default function SchoolsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [schools, setSchools] = useState<SchoolDto[]>([])
  const setSchool = useSetRecoilState(schoolState)

  useEffect(() => {
    let isCanceled = false

    async function fetchSchools() {
      // debounce multiple fetches in short time
      await delay(500)
      if (isCanceled) {
        return
      }

      const result = await fetch(
        `/carte/api/v1/schools?${new URLSearchParams({
          q: query
        })}`
      )
      if (!result.ok || isCanceled) {
        return
      }

      setSchools(await result.json())
    }

    if (query) {
      fetchSchools()
    }

    return () => {
      isCanceled = true
    }
  }, [query])

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
        <SchoolList schools={schools} handleSchoolSelect={handleSchoolSelect} />
      </main>
    </>
  )
}
