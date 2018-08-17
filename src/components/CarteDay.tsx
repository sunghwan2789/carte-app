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
        {this.props.carte.meals.map(meal => (
          <React.Fragment key={meal.name}>
            <Typography variant="subheading">{meal.name}</Typography>
            {meal.foods.map(food => <CarteFood key={food} food={food} />)}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(CarteDay);
