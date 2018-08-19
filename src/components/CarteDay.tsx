import * as React from 'react';
import { WithStyles, createStyles, withStyles, Typography, AppBar, Tabs, Tab, Card, CardHeader, List, ListItem, ListItemText, Divider, CircularProgress } from '@material-ui/core';
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
    if (this.props.isLoading) {
      return <div style={{display:'flex',justifyContent:'center',paddingTop:16}}><CircularProgress /></div>;
    } else if (!this.props.carte) {
      return <div style={{display:'flex',justifyContent:'center',paddingTop:16}}>식단이 없다아...</div>
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
          {this.currentMeal
            ? this.currentMeal.foods.map(food =>
              <React.Fragment key={food}>
                <ListItem style={{backgroundColor:'white'}}>
                  <ListItemText primary={food} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ) : <div style={{display:'flex',justifyContent:'center',paddingTop:16}}>식단을 선택하세요<br/>(없을 수도 있어요..!)</div>
          }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CarteDay);
