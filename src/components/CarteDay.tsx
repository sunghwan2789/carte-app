import React, { useState, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import dayjs from 'dayjs';
import CarteFood from './CarteFood';

type CarteDayProps = {
  carte: CarteDto;
  isLoading: boolean;
};

type MealName = '조식' | '중식' | '석식';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      overflow: 'hidden',
    },
  })
);

export default function CarteDay({ carte, isLoading }: CarteDayProps) {
  const classes = useStyles();
  const [mealName, setMealName] = useState<MealName>(() => {
    const hour = dayjs().hour();

    if (hour < 9) {
      return '조식';
    } else if (hour < 13) {
      return '중식';
    } else if (hour < 19) {
      return '석식';
    } else {
      return '조식';
    }
  });
  const meal = useMemo(
    () => carte?.meals.find((meal) => meal.name === mealName),
    [carte, mealName]
  );

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}
      >
        <CircularProgress />
      </div>
    );
  } else if (!carte) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}
      >
        식단이 없다아...
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={mealName} onChange={(e, v) => setMealName(v)}>
            {carte.meals.map((meal) => (
              <Tab key={meal.name} value={meal.name} label={meal.name} />
            ))}
          </Tabs>
        </AppBar>
        <List>
          {meal ? (
            meal.foods.map((food) => (
              <React.Fragment key={food}>
                <ListItem style={{ backgroundColor: 'white' }}>
                  <ListItemText primary={<CarteFood food={food} />} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 16,
              }}
            >
              식단을 선택하세요
              <br />
              (없을 수도 있어요..!)
            </div>
          )}
        </List>
      </div>
    );
  }
}
