import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, WithStyles, Theme, createStyles, withStyles, TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import schoolsStore from '../stores/schoolsStore';
import { action } from 'mobx';
import School from '../models/School';

const styles = (theme: Theme) => createStyles({

});

class SchoolsPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {

  @action
  handleSchoolSelect = (school: School) => {
    schoolsStore.selectedSchool = school;
    this.props.history.replace('/');
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <TextField placeholder="학교 검색" fullWidth />
          </Toolbar>
        </AppBar>
        <main>
          <List>
            {schoolsStore.schools.map(school => (
              <React.Fragment key={school.code}>
                <ListItem onClick={() => this.handleSchoolSelect(school)}>
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
