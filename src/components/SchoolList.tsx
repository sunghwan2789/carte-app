import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

type SchoolListProps = {
  schools: SchoolDto[];
  handleSchoolSelect: (school: SchoolDto) => void;
};

export default function SchoolList({ schools, handleSchoolSelect }: SchoolListProps) {
  return (
    <List>
      {schools.map((school) => (
        <React.Fragment key={school.school_code}>
          <ListItem button onClick={() => handleSchoolSelect(school)}>
            <ListItemText
              primary={school.name}
              secondary={school.address}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
