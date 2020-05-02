import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Feedback from '@material-ui/icons/Feedback';
import Info from '@material-ui/icons/Info';
import Menu from '@material-ui/icons/Menu';
import Palette from '@material-ui/icons/Palette';
import Refresh from '@material-ui/icons/Refresh';
import Star from '@material-ui/icons/Star';
import ViewDay from '@material-ui/icons/ViewDay';
import ViewModule from '@material-ui/icons/ViewModule';
import ViewWeek from '@material-ui/icons/ViewWeek';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { useHistory } from 'react-router-dom';
import CarteDay from '../components/CarteDay';
import NavigateButtons from '../components/NavigateButtons';
import Navigator from '../components/Navigator';
import { useSchool } from '../contexts/SchoolContext';
import { delay } from '../utils';

export default function CartePage() {
  const [school] = useSchool();
  const [isDrawerOpened, setIsDrawerOpened] = useState(!school);
  const [cartes, setCartes] = useState<CarteDto[]>([]);
  const [currentDate, setCurrentDate] = useState(
    dayjs().hour() < 19
      ? dayjs().startOf('day')
      : dayjs().startOf('day').add(1, 'day'),
  );
  const [navigationUnit, setNavigationUnit] = useState<OpUnitType>('day');
  const history = useHistory();
  const [currentCartes, setCurrentCartes] = useState<CarteDto[]>([]);

  useEffect(() => {
    if (!school) {
      return;
    }

    let isCanceled = false;

    function getCarteFetchUrl() {
      const { domain_code, course_code, school_code } = school!;
      const year = currentDate.year();
      const month = currentDate.month() + 1;
      return `/carte/api/v1/cartes/${domain_code}/${course_code}/${school_code}?${new URLSearchParams(
        {
          date: `${year}-${month}`,
        },
      )}`;
    }

    async function fetchCartes() {
      await delay(400);
      if (isCanceled) {
        return;
      }

      const result = await fetch(getCarteFetchUrl());
      if (!result.ok || isCanceled) {
        return;
      }

      setCartes(await result.json());
    }

    // TODO: get carte from cache faster
    if (!cartes.some((carte) => currentDate.isSame(carte.date, 'date'))) {
      fetchCartes();
    }

    return () => {
      isCanceled = true;
    };
  }, [school, currentDate, navigationUnit]);

  useEffect(() => {
    function* getObservingDates() {
      const startDate = currentDate.startOf(navigationUnit);
      const endDate = currentDate.endOf(navigationUnit);

      let it = startDate.clone();
      while (it.isBefore(endDate)) {
        yield it;

        it = it.add(1, 'day');
      }
    }

    // TODO: fetch cartes incrementally from startDate to endDate
    const observingCartes = Array.from(getObservingDates()).map(
      (date) => cartes.find((carte) => date.isSame(carte.date, 'date'))!,
    );

    setCurrentCartes(observingCartes);
  }, [cartes, currentDate, navigationUnit]);

  function toggleDrawer() {
    setIsDrawerOpened(!isDrawerOpened);
  }
  function handleBackward() {
    setCurrentDate(currentDate.add(-1, navigationUnit));
  }
  function handleForward() {
    setCurrentDate(currentDate.add(1, navigationUnit));
  }
  function handleDateChange(date: Dayjs) {
    setCurrentDate(date);
  }
  function handleRefresh() {
    // TODO: invalidate cartes cache
  }
  function handleNavigate(url: string) {
    history.push(url);
  }
  function handleUnitChange(unit: OpUnitType) {
    setNavigationUnit(unit);
    toggleDrawer();
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
          <ListItem
            button
            disabled
            onClick={() => handleUnitChange('week')}
          >
            <ListItemIcon>
              <ViewWeek />
            </ListItemIcon>
            <ListItemText primary="주간" />
          </ListItem>
          <ListItem
            button
            disabled
            onClick={() => handleUnitChange('month')}
          >
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
          <ListItem
            button
            disabled
            onClick={() => handleNavigate('/theme')}
          >
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
  );
}
