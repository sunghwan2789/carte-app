import { Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

type SchoolListProps = {
  schools: SchoolDto[]
  handleSchoolSelect: (school: SchoolDto) => void
}

export default function SchoolList({
  schools,
  handleSchoolSelect
}: SchoolListProps) {
  return (
    <List>
      {schools.map((school) => (
        <React.Fragment key={school.school_code}>
          <ListItem button onClick={() => handleSchoolSelect(school)}>
            <ListItemText primary={school.name} secondary={school.address} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}
