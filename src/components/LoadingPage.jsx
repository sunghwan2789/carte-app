import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}>
    <Grid item>
      <img src={`${process.env.PUBLIC_URL}/icon.png`} width="128" height="128" />
    </Grid>
    <Grid item>
      <Typography variant="caption">데이터 불러오는 중</Typography>
    </Grid>
  </Grid>
)
