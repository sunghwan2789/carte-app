import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, WithStyles, Theme, createStyles, withStyles, TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import schoolsStore from '../stores/schoolStore';
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
    schoolsStore.selectedSchool = school;
    this.props.history.replace('/');
  }

  @action
  handleSearch = debounce(async (query: string) => {
    let res = await fetch(`https://bloodcat.com/carte/api/v1/schools?${new URLSearchParams({
      q: query,
    })}`);
    let data = await res.json();
    let schools = data.map((i: any) => {
      let school = new School();
      school.code = i.school_code;
      school.domainCode = i.domain_code;
      school.courseCode = i.course_code;
      school.name = i.name;
      school.address = i.address;
      return school;
    });
    runInAction(() => {
      schoolsStore.schools = schools;
    });
  }, 500)

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <TextField type="search" placeholder="학교 검색" fullWidth
              onChange={e => this.handleSearch(e.target.value)} />
          </Toolbar>
        </AppBar>
        <main>
          <List>
            {schoolsStore.schools.map(school => (
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
