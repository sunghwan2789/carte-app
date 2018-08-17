import * as React from 'react';
import { WithStyles, createStyles, withStyles, Typography } from '@material-ui/core';
import Carte from '../models/Carte';
import CarteFood from './CarteFood';

const styles = createStyles({
  root: {
    color: 'inherit'
  },
});

interface IProps {
  carte: Carte
}

class CarteDay extends React.Component<IProps & WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.carte['breakfast']!.map(food => {
          return <CarteFood key={food} food={food} />;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(CarteDay);
