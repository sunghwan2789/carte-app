import * as React from 'react';
import { AppBar, Toolbar, Button, Drawer, IconButton, List, ListItem, Divider, ListItemText, ListItemIcon, ListSubheader, Grid } from '@material-ui/core';
import { Star, Help, Refresh, ViewDay, ViewWeek, ViewModule, Share, Palette } from '@material-ui/icons';
import NavigatorContainer from '../containers/NavigatorContainer';
import * as logo from '../../public/icon.png';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import ListItemLink from './ListItemLink';
import ListItemNavLink from './ListItemNavLink';
import { UnitType } from 'dayjs';
import { inject, observer } from 'mobx-react';
import { NavigationStore } from '../stores/navigationStore';
import { action, observable } from 'mobx';

interface IProps extends RouteComponentProps<any> {

}

interface IPropsInjected extends IProps {
  navigationStore: NavigationStore;
}

@inject('navigationStore')
@observer
class CartePage extends React.Component<IProps> {
  @observable
  isDrawerOpened: boolean = true;

  get injected() {
    return this.props as IPropsInjected;
  }

  @action
  toggleDrawer = () => {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  @action
  handleUnitChange = (newUnit: UnitType) => {
    this.injected.navigationStore.navigationUnit = newUnit;
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer}>
              <img src="icon.png" width="48" height="48" />
            </IconButton>
            <NavigatorContainer />
            <IconButton title="새로고침">
              <Refresh />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={this.isDrawerOpened} onClose={this.toggleDrawer}>
          <List component="nav">
            <ListSubheader component="div" disableSticky>
              <Grid container>
                <Grid item xs>학교</Grid>
                <Grid item>
                  <Button size="small">변경</Button>
                </Grid>
              </Grid>
            </ListSubheader>
            <ListItem component="div">
              <ListItemText primary="울산강남고등학교" secondary="울산 팔등로" />
            </ListItem>
            <Divider />
            <ListItem onClick={() => this.handleUnitChange('day')} button>
              <ListItemIcon>
                <ViewDay />
              </ListItemIcon>
              <ListItemText primary="일간" />
            </ListItem>
            <ListItem onClick={() => this.handleUnitChange('week')} button>
              <ListItemIcon>
                <ViewWeek />
              </ListItemIcon>
              <ListItemText primary="주간" />
            </ListItem>
            <ListItem onClick={() => this.handleUnitChange('month')} button>
              <ListItemIcon>
                <ViewModule />
              </ListItemIcon>
              <ListItemText primary="월간" />
            </ListItem>
            <Divider />
            <ListItemLink button to="/highlights">
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="하이라이트" />
            </ListItemLink>
            <ListItemLink button to="/theme">
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="테마" />
            </ListItemLink>
            <ListItemLink button to="/share">
              <ListItemIcon>
                <Share />
              </ListItemIcon>
              <ListItemText primary="공유" />
            </ListItemLink>
            <ListItemLink button to="/help">
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="도움말" />
            </ListItemLink>
          </List>
        </Drawer>
        <main>
          <Button variant="contained" color="primary">OK</Button>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(CartePage);
