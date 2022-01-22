import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Toolbar from '@mui/material/Toolbar'
import Feedback from '@mui/icons-material/Feedback'
import Info from '@mui/icons-material/Info'
import Menu from '@mui/icons-material/Menu'
import Palette from '@mui/icons-material/Palette'
import Refresh from '@mui/icons-material/Refresh'
import Star from '@mui/icons-material/Star'
import ViewDay from '@mui/icons-material/ViewDay'
import ViewModule from '@mui/icons-material/ViewModule'
import ViewWeek from '@mui/icons-material/ViewWeek'
import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import React, { useEffect, useState } from 'react'
import 'react-day-picker/lib/style.css'
import { useHistory } from 'react-router-dom'
import CarteDay from '../components/CarteDay'
import NavigateButtons from '../components/NavigateButtons'
import Navigator from '../components/Navigator'
import { useSchool } from '../contexts/SchoolContext'
import { delay } from '../utils'

export default function CartePage() {
  const [school] = useSchool()
  const [isDrawerOpened, setIsDrawerOpened] = useState(!school)
  const [cartes, setCartes] = useState<CarteDto[]>([])
  const [currentDate, setCurrentDate] = useState(
    dayjs().hour() < 19
      ? dayjs().startOf('day')
      : dayjs().startOf('day').add(1, 'day')
  )
  const [navigationUnit, setNavigationUnit] = useState<OpUnitType>('day')
  const history = useHistory()
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
    history.push(url)
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
