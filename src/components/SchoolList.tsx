import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

type SchoolListProps = {
  loading: boolean
  schools: SchoolDto[]
  onSelect?: (school: SchoolDto) => void
}

export default function SchoolList({
  loading,
  schools,
  onSelect
}: SchoolListProps) {
  return (
    <List>
      {loading || !schools.length ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography>
              학교를 선택하세요
              <br />
              (우리 학교가 없다면 <Link to="/feedback">여기</Link>로
              알려주세요..!)
            </Typography>
          )}
        </Box>
      ) : (
        schools.map((school) => (
          <React.Fragment key={school.school_code}>
            <ListItem button onClick={() => onSelect?.(school)}>
              <ListItemText primary={school.name} secondary={school.address} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  )
}
