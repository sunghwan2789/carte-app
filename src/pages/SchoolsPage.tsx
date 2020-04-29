import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { delay } from '../utils';

type SchoolDto = {
  school_code: string;
  domain_code: string;
  course_code: string;
  name: string;
  address: string;
};

export default function SchoolsPage() {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [schools, setSchools] = useState<SchoolDto[]>([]);

  useEffect(() => {
    let isCanceled = false;

    async function fetchSchools() {
      // debounce multiple fetches in short time
      await delay(500);
      if (isCanceled) {
        return;
      }

      const result = await fetch(
        `/carte/api/v1/schools?${new URLSearchParams({
          q: query,
        })}`
      );
      if (!result.ok || isCanceled) {
        return;
      }

      setSchools(await result.json());
    }

    if (query) {
      fetchSchools();
    }

    return () => {
      isCanceled = true;
    };
  }, [query]);

  function handleSchoolSelect(school: SchoolDto) {
    // TODO: set School Context value
    history.push('/');
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
          <Input
            type="search"
            placeholder="학교 검색"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            autoFocus
            fullWidth
            style={{ color: 'inherit' }}
          />
        </Toolbar>
      </AppBar>
      <main>
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
      </main>
    </>
  );
}
