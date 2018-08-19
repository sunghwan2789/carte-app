import * as React from 'react';
import { WithStyles, createStyles, withStyles, Typography, AppBar, Tabs, Tab, Card, CardHeader, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import Carte from '../models/Carte';
import CarteFood from './CarteFood';
import Meal from '../models/Meal';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as dayjs from 'dayjs';

const styles = createStyles({
  root: {
    overflow: 'hidden',
  },
});

interface IProps {
  carte: Carte
  isLoading: boolean
}

@observer
class CarteDay extends React.Component<IProps & WithStyles<typeof styles>> {

  @observable
  currentMealName: string =
    dayjs().hour() < 9 ? '조식'
    : dayjs().hour() < 14 ? '중식'
    : '석식';

  @action
  handleMealChange = (name: string) => {
    this.currentMealName = name;
  }

  get currentMeal() {
    return this.props.carte.meals.find(meal => meal.name === this.currentMealName);
  }

  render() {
    const { classes } = this.props;
    if (!this.props.carte || this.props.isLoading) {
      return <p>식단표 받는 중...</p>;
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={this.currentMealName}
            onChange={(e, v) => this.handleMealChange(v)}
          >
            {this.props.carte.meals.map(meal => (
              <Tab key={meal.name} value={meal.name} label={meal.name} />
            ))}
          </Tabs>
        </AppBar>
        <List>
          {this.currentMeal && this.currentMeal.foods.map(food => (
            <React.Fragment>
              <ListItem key={food} style={{backgroundColor:'white'}}>
                <ListItemText primary={food} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CarteDay);
