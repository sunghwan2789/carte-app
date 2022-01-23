import {
  Feedback,
  Info,
  Menu,
  Palette,
  Refresh,
  Star,
  ViewDay,
  ViewModule,
  ViewWeek
} from '@mui/icons-material'
import {
  AppBar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Toolbar
} from '@mui/material'
import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import React, { useEffect, useState } from 'react'
import 'react-day-picker/lib/style.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable
} from 'recoil'
import CarteDay from '../components/CarteDay'
import NavigateButtons from '../components/NavigateButtons'
import Navigator from '../components/Navigator'
import { schoolState } from '../state/schoolState'
import { delay } from '../utils'

let abortController = new AbortController()

const getCartesQuery = selectorFamily<
  CarteDto[],
  { school?: SchoolDto; year: number; month: number }
>({
  key: 'carte',
  get:
    ({ school, year, month }) =>
    async () => {
      abortController.abort()
      const fetchController = new AbortController()
      abortController = fetchController

      if (!school) {
        return []
      }

      function getCarteFetchUrl() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { domain_code, course_code, school_code } = school!
        return `/carte/api/v1/cartes/${domain_code}/${course_code}/${school_code}?${new URLSearchParams(
          {
            date: `${year}-${month}`
          }
        )}`
      }

      await delay(400)

      const response = await fetch(getCarteFetchUrl(), {
        signal: fetchController.signal
      })
      if (!response.ok) {
        throw new Error('data fetch error')
      }

      return response.json()
    }
})

const getCartesObservingQuery = selectorFamily<
  CarteDto[],
  { school?: SchoolDto; date: Dayjs; unit: OpUnitType }
>({
  key: 'carte-ob',
  get:
    ({ school, date, unit }) =>
    ({ get }) =>
      get(
        // TODO: refresh inner selector?
        getCartesQuery({ school, year: date.year(), month: date.month() + 1 })
      ).filter((carte) => {
        const startDate = date.startOf(unit)
        const endDate = date.endOf(unit)

        const cdate = dayjs(carte.date)

        return (
          cdate.isSame(startDate, 'date') ||
          cdate.isSame(endDate, 'date') ||
          (cdate.isAfter(startDate, 'date') && cdate.isBefore(endDate, 'date'))
        )
      })
})

function getNextEatingDay() {
  return dayjs().hour() < 19
    ? dayjs().startOf('day')
    : dayjs().startOf('day').add(1, 'day')
}

export default function CartePage() {
  const school = useRecoilValue(schoolState)
  const [isDrawerOpened, setIsDrawerOpened] = useState(!school)
  const [searchParams, setSearchParams] = useSearchParams()
  const [date, setDate] = useState(
    searchParams.has('date')
      ? dayjs(searchParams.get('date'))
      : getNextEatingDay()
  )
  const [unit, setUnit] = useState<OpUnitType>('day')
  const cartes = useRecoilValueLoadable(
    getCartesObservingQuery({ school, date, unit })
  )
  const refreshCartes = useRecoilRefresher_UNSTABLE(
    getCartesObservingQuery({ school, date, unit })
  )
  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(
      date.isSame(getNextEatingDay(), 'date')
        ? []
        : [['date', `${date.year()}-${date.month() + 1}-${date.date()}`]],
      { replace: true }
    )
  }, [date, setSearchParams])

  function toggleDrawer() {
    setIsDrawerOpened(!isDrawerOpened)
  }
  function handleUnitChange(newUnit: OpUnitType) {
    setUnit(newUnit)
    toggleDrawer()
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <NavigateButtons
            onBackward={() => setDate(date.add(-1, unit))}
            onForward={() => setDate(date.add(1, unit))}
          />
          <Navigator date={date} unit={unit} onChange={setDate} />
          <IconButton color="inherit" title="새로고침" onClick={refreshCartes}>
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={isDrawerOpened}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
      >
        <List style={{ maxWidth: '100vw' }}>
          <ListSubheader disableSticky>
            <Grid container>
              <Grid item xs>
                학교
              </Grid>
              <Grid item>
                <Button size="small" onClick={() => navigate('/schools')}>
                  변경
                </Button>
              </Grid>
            </Grid>
          </ListSubheader>
          {school ? (
            <ListItem>
              <ListItemText primary={school.name} secondary={school.address} />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemText primary="학교를 선택하세요" />
            </ListItem>
          )}
          <Divider />
          <ListItem button onClick={() => handleUnitChange('day')}>
            <ListItemIcon>
              <ViewDay />
            </ListItemIcon>
            <ListItemText primary="일간" />
          </ListItem>
          <ListItem button disabled onClick={() => handleUnitChange('week')}>
            <ListItemIcon>
              <ViewWeek />
            </ListItemIcon>
            <ListItemText primary="주간" />
          </ListItem>
          <ListItem button disabled onClick={() => handleUnitChange('month')}>
            <ListItemIcon>
              <ViewModule />
            </ListItemIcon>
            <ListItemText primary="월간" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate('/highlights')}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="하이라이트" />
          </ListItem>
          <ListItem button disabled onClick={() => navigate('/theme')}>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText primary="테마" />
          </ListItem>
          <ListItem button onClick={() => navigate('/info')}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="정보" />
          </ListItem>
          <ListItem button onClick={() => navigate('/feedback')}>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="의견 보내기" />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <main>
        {unit === 'day' && (
          <CarteDay
            loading={cartes.state === 'loading'}
            carte={cartes.contents[0]}
          />
        )}
      </main>
    </>
  )
}
