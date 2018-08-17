import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';


export default () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}>
    <Grid item>
      <img src="icon.png" width="128" height="128" />
    </Grid>
    <Grid item>
      <Typography variant="caption">데이터 불러오는 중</Typography>
    </Grid>
  </Grid>
)
