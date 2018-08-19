import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, WithStyles, Theme, createStyles, withStyles, TextField, List, ListItem, ListItemText, Divider, Input } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import schoolStore from '../stores/schoolStore';
import { action, runInAction } from 'mobx';
import School from '../models/School';
import { observer } from 'mobx-react';
import { debounce } from 'lodash';

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
          <Toolbar>
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
