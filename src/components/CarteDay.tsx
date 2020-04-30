import React, { useState, useEffect } from 'react';
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

export default function CarteDay({ carte, isLoading }: CarteDayProps) {
  const [mealName, setMealName] = useState<MealName>(
    dayjs().hour() < 9
      ? '조식'
      : dayjs().hour() < 13
      ? '중식'
      : dayjs().hour() < 19
      ? '석식'
      : '조식'
  );
  const [meal, setMeal] = useState<MealDto>();
  const classes = useStyles();

  useEffect(() => {
    setMeal(carte?.meals.find((meal) => meal.name === mealName));
  }, [carte, mealName]);

  function handleMealChange(mealName: MealName) {
    setMealName(mealName);
  }

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
          <Tabs value={mealName} onChange={(e, v) => handleMealChange(v)}>
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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
    },
  })
);
