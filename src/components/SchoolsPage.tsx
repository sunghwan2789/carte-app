import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { RouteComponentProps, withRouter } from 'react-router';
import schoolStore from '../stores/schoolStore';
import { action, runInAction } from 'mobx';
import School from '../models/School';
import { observer } from 'mobx-react';
import debounce from 'lodash-es/debounce';

const styles = (theme: Theme) => createStyles({

});

@observer
class SchoolsPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {

  @action
  handleSchoolSelect = (school: School) => {
    schoolStore.selectedSchool = school;
    this.props.history.replace('/');
  }

  @action
  handleSearch = debounce((query: string) => {
    schoolStore.setQuery(query);
    schoolStore.loadSchools();
  }, 500)

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar disableGutters variant="dense">
            <IconButton color="inherit" onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <Input type="search"
              placeholder="학교 검색"
              onChange={e => this.handleSearch(e.target.value)}
              autoFocus
              fullWidth
              style={{color:'inherit'}} />
          </Toolbar>
        </AppBar>
        <main>
          <List>
            {schoolStore.schools.map(school => (
              <React.Fragment key={school.code}>
                <ListItem button onClick={() => this.handleSchoolSelect(school)}>
                  <ListItemText primary={school.name} secondary={school.address} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(SchoolsPage));
