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
import React, { useState } from 'react'
import 'react-day-picker/lib/style.css'
import { useNavigate } from 'react-router-dom'
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
  { school: SchoolDto | undefined; year: number; month: number }
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
  { school: SchoolDto | undefined; date: Dayjs; unit: OpUnitType }
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

export default function CartePage() {
  const school = useRecoilValue(schoolState)
  const [isDrawerOpened, setIsDrawerOpened] = useState(!school)
  const [currentDate, setCurrentDate] = useState(
    dayjs().hour() < 19
      ? dayjs().startOf('day')
      : dayjs().startOf('day').add(1, 'day')
  )
  const [navigationUnit, setNavigationUnit] = useState<OpUnitType>('day')
  const cartes = useRecoilValueLoadable(
    getCartesObservingQuery({ school, date: currentDate, unit: navigationUnit })
  )
  const refreshCartes = useRecoilRefresher_UNSTABLE(
    getCartesObservingQuery({ school, date: currentDate, unit: navigationUnit })
  )
  const navigate = useNavigate()

  function toggleDrawer() {
    setIsDrawerOpened(!isDrawerOpened)
  }
  function handleBackward() {
    setCurrentDate(currentDate.add(-1, navigationUnit))
  }
  function handleForward() {
    setCurrentDate(currentDate.add(1, navigationUnit))
  }
  function handleDateChange(date: Dayjs) {
    setCurrentDate(date)
  }
  function handleRefresh() {
    refreshCartes()
  }
  function handleNavigate(url: string) {
    navigate(url)
  }
  function handleUnitChange(unit: OpUnitType) {
    setNavigationUnit(unit)
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
            handleBackward={handleBackward}
            handleForward={handleForward}
          />
          <Navigator
            currentDate={currentDate}
            navigateUnit={navigationUnit}
            handleDateChange={handleDateChange}
          />
          <IconButton
            color="inherit"
            title="새로고침"
            onClick={() => handleRefresh()}
          >
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
                <Button size="small" onClick={() => handleNavigate('/schools')}>
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
          <ListItem button onClick={() => handleNavigate('/highlights')}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="하이라이트" />
          </ListItem>
          <ListItem button disabled onClick={() => handleNavigate('/theme')}>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText primary="테마" />
          </ListItem>
          <ListItem button onClick={() => handleNavigate('/info')}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="정보" />
          </ListItem>
          <ListItem button onClick={() => handleNavigate('/feedback')}>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="의견 보내기" />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <main>
        {navigationUnit === 'day' && (
          <CarteDay
            carte={cartes.contents[0]}
            isLoading={cartes.state === 'loading'}
          />
        )}
      </main>
    </>
  )
}
