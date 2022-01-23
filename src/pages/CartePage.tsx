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
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import CarteDay from '../components/CarteDay'
import NavigateButtons from '../components/NavigateButtons'
import Navigator from '../components/Navigator'
import { schoolState } from '../state/schoolState'
import { delay } from '../utils'

export default function CartePage() {
  const school = useRecoilValue(schoolState)
  const [isDrawerOpened, setIsDrawerOpened] = useState(!school)
  const [cartes, setCartes] = useState<CarteDto[]>([])
  const [currentDate, setCurrentDate] = useState(
    dayjs().hour() < 19
      ? dayjs().startOf('day')
      : dayjs().startOf('day').add(1, 'day')
  )
  const [navigationUnit, setNavigationUnit] = useState<OpUnitType>('day')
  const navigate = useNavigate()
  const [currentCartes, setCurrentCartes] = useState<CarteDto[]>([])

  useEffect(() => {
    let isCanceled = false

    function getCarteFetchUrl() {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { domain_code, course_code, school_code } = school!
      const year = currentDate.year()
      const month = currentDate.month() + 1
      return `/carte/api/v1/cartes/${domain_code}/${course_code}/${school_code}?${new URLSearchParams(
        {
          date: `${year}-${month}`
        }
      )}`
    }

    async function fetchCartes() {
      await delay(400)
      if (isCanceled) {
        return
      }

      const result = await fetch(getCarteFetchUrl())
      if (!result.ok || isCanceled) {
        return
      }

      setCartes(await result.json())
    }

    // TODO: get carte from cache faster
    if (school) {
      if (!cartes.some((carte) => currentDate.isSame(carte.date, 'date'))) {
        fetchCartes()
      }
    }

    return () => {
      isCanceled = true
    }
  }, [school, cartes, currentDate, navigationUnit])

  useEffect(() => {
    function* getObservingDates() {
      const startDate = currentDate.startOf(navigationUnit)
      const endDate = currentDate.endOf(navigationUnit)

      let it = startDate.clone()
      while (it.isBefore(endDate)) {
        yield it

        it = it.add(1, 'day')
      }
    }

    // TODO: fetch cartes incrementally from startDate to endDate
    const observingCartes = Array.from(getObservingDates()).map(
      (date) => cartes.find((carte) => date.isSame(carte.date, 'date'))!
    )

    setCurrentCartes(observingCartes)
  }, [cartes, currentDate, navigationUnit])

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
    // TODO: invalidate cartes cache
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
          <CarteDay carte={currentCartes[0]} isLoading={false} />
        )}
      </main>
    </>
  )
}
