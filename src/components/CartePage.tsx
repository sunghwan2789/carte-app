import * as React from 'react';
import { AppBar, Toolbar, Button, Drawer, IconButton, List, ListItem, Divider, ListItemText, ListItemIcon, ListSubheader, Grid, WithStyles, createStyles, Theme, withStyles } from '@material-ui/core';
import { Star, Help, Refresh, ViewDay, ViewWeek, ViewModule, Share, Palette } from '@material-ui/icons';
import * as logo from '../../public/icon.png';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ListItemLink from './ListItemLink';
import ListItemNavLink from './ListItemNavLink';
import * as dayjs from 'dayjs';
import { UnitType, Dayjs } from 'dayjs';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import schoolStore from '../stores/schoolStore';
import CarteDay from './CarteDay';
import carteStore from '../stores/carteStore';
import NavigateButtons from './NavigateButtons';
import Navigator from './Navigator';
import School from '../models/School';
import { isEqual } from 'lodash';

const styles = (theme: Theme) => createStyles({

});

@observer
class CartePage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {
  @observable
  isDrawerOpened: boolean = false

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

  render() {
    if (typeof schoolStore.selectedSchool === 'undefined') {
      return <Redirect to="/schools" push />;
    }

    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer}>
              <img src="icon.png" width="48" height="48" />
            </IconButton>
            <NavigateButtons
              handleBackward={this.handleBackward}
              handleForward={this.handleForward} />
            <Navigator currentDate={carteStore.currentDate} navigateUnit={carteStore.navigationUnit} />
            <IconButton title="새로고침" onClick={() => this.handleRefresh()}>
              <Refresh />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={this.isDrawerOpened} onClose={this.toggleDrawer}>
          <List>
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
                  <ListItemText primary="선택 안함" />
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
            <ListItem button onClick={() => this.handleUnitChange('week')}>
              <ListItemIcon>
                <ViewWeek />
              </ListItemIcon>
              <ListItemText primary="주간" />
            </ListItem>
            <ListItem button onClick={() => this.handleUnitChange('month')}>
              <ListItemIcon>
                <ViewModule />
              </ListItemIcon>
              <ListItemText primary="월간" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.handleNavigate('/highlights')}>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="하이라이트" />
            </ListItem>
            <ListItem button onClick={() => this.handleNavigate('/theme')}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="테마" />
            </ListItem>
            <ListItem button onClick={() => this.handleNavigate('/share')}>
              <ListItemIcon>
                <Share />
              </ListItemIcon>
              <ListItemText primary="공유" />
            </ListItem>
            <ListItem button onClick={() => this.handleNavigate('/help')}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="도움말" />
            </ListItem>
          </List>
        </Drawer>
        <main>
          {
            <CarteDay carte={carteStore.currentCartes[0]} isLoading={carteStore.isLoading} />
          }
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(CartePage));
