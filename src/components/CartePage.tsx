import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Star from '@material-ui/icons/Star';
import Refresh from '@material-ui/icons/Refresh';
import ViewDay from '@material-ui/icons/ViewDay';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ViewModule from '@material-ui/icons/ViewModule';
import Palette from '@material-ui/icons/Palette';
import Message from '@material-ui/icons/Message';
import Info from '@material-ui/icons/Info';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import * as dayjs from 'dayjs';
import { UnitType, Dayjs } from 'dayjs';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import schoolStore from '../stores/schoolStore';
import CarteDay from './CarteDay';
import carteStore from '../stores/carteStore';
import NavigateButtons from './NavigateButtons';
import Navigator from './Navigator';
import 'react-day-picker/lib/style.css';

const styles = (theme: Theme) => createStyles({

});

@observer
class CartePage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {
  @observable
  isDrawerOpened: boolean = typeof schoolStore.selectedSchool === 'undefined'

  componentWillMount() {
    carteStore.loadCartes();
  }

  @action
  toggleDrawer = () => {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  @action
  handleNavigate = (url: string) => {
    this.props.history.push(url);
  }

  @action
  handleUnitChange = (newUnit: UnitType) => {
    carteStore.navigationUnit = newUnit;
    carteStore.loadCartes();
    this.toggleDrawer();
  }

  handleBackward = () => {
    carteStore.backward();
    carteStore.loadCartes();
  }

  handleForward = () => {
    carteStore.forward();
    carteStore.loadCartes();
  }

  handleRefresh = () => {
    carteStore.clear();
    carteStore.loadCartes();
  }

  @action
  handleDateChange = (date: dayjs.Dayjs) => {
    carteStore.currentDate = date;
    carteStore.loadCartes();
  }

  render() {
    if (typeof schoolStore.selectedSchool === 'undefined') {
      // return <Redirect to="/schools" push />;
    }

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer}>
              <img src="icon.png" width="48" height="48" />
            </IconButton>
            <NavigateButtons
              handleBackward={this.handleBackward}
              handleForward={this.handleForward} />
            <Navigator
              currentDate={carteStore.currentDate}
              navigateUnit={carteStore.navigationUnit}
              handleDateChange={this.handleDateChange} />
            <IconButton color="inherit" title="새로고침" onClick={() => this.handleRefresh()}>
              <Refresh />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer open={this.isDrawerOpened} onOpen={this.toggleDrawer} onClose={this.toggleDrawer}>
          <List style={{ maxWidth: '100vw' }}>
            <ListSubheader disableSticky>
              <Grid container>
                <Grid item xs>학교</Grid>
                <Grid item>
                  <Button size="small" onClick={() => this.handleNavigate('/schools')}>
                    변경
                  </Button>
                </Grid>
              </Grid>
            </ListSubheader>
            {
              typeof schoolStore.selectedSchool !== 'undefined'
              ? (
                <ListItem>
                  <ListItemText
                    primary={schoolStore.selectedSchool.name}
                    secondary={schoolStore.selectedSchool.address} />
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText primary="학교를 선택하세요" />
                </ListItem>
              )
            }
            <Divider />
            <ListItem button onClick={() => this.handleUnitChange('day')}>
              <ListItemIcon>
                <ViewDay />
              </ListItemIcon>
              <ListItemText primary="일간" />
            </ListItem>
            <ListItem button onClick={() => alert('미구현이에요~~~\n많이들 필요하시면 만들게요~~~') && this.handleUnitChange('week')}>
              <ListItemIcon>
                <ViewWeek />
              </ListItemIcon>
              <ListItemText primary="주간" />
            </ListItem>
            <ListItem button onClick={() => alert('미구현이에요~~~\n많이들 필요하시면 만들게요~~~') && this.handleUnitChange('month')}>
              <ListItemIcon>
                <ViewModule />
              </ListItemIcon>
              <ListItemText primary="월간" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => alert('제작중이에요~~~') && this.handleNavigate('/highlights')}>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="하이라이트" />
            </ListItem>
            <ListItem button onClick={() => alert('제작중이에요~~~') && this.handleNavigate('/theme')}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="테마" />
            </ListItem>
            <ListItem button onClick={() => this.handleNavigate('/info')}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="정보" />
            </ListItem>
            <ListItem button onClick={() => this.handleNavigate('/inquiry')}>
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="의견 보내기" />
            </ListItem>
          </List>
        </SwipeableDrawer>
        <main>
          {carteStore.navigationUnit === 'day' && <CarteDay carte={carteStore.currentCartes[0]} isLoading={carteStore.isLoading} />}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(CartePage));
