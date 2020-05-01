import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import CarteFood from './CarteFood';

type CarteDayProps = {
  carte: CarteDto;
  isLoading: boolean;
};

type MealName = '조식' | '중식' | '석식';

const useStyles = makeStyles(() => createStyles({
  root: {
    overflow: 'hidden',
  },
}));

export default function CarteDay({ carte, isLoading }: CarteDayProps) {
  const classes = useStyles();
  const [selectedMealName, setSelectedMealName] = useState<MealName>(() => {
    const hour = dayjs().hour();

    if (hour < 9) {
      return '조식';
    }
    if (hour < 13) {
      return '중식';
    }
    if (hour < 19) {
      return '석식';
    }
    return '조식';
  });
  const selectedMeal = useMemo(() => carte?.meals.find((meal) => meal.name === selectedMealName), [
    carte,
    selectedMealName,
  ]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedMealName} onChange={(e, v) => setSelectedMealName(v)}>
          {carte?.meals.map((meal) => (
            <Tab key={meal.name} value={meal.name} label={meal.name} />
          ))}
        </Tabs>
      </AppBar>
      <List>
        {!selectedMeal ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 16,
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography>
                식단을 선택하세요
                <br />
                (없을 수도 있어요..!)
              </Typography>
            )}
          </div>
        ) : (
          selectedMeal.foods.map((food) => (
            <React.Fragment key={food}>
              <ListItem style={{ backgroundColor: 'white' }}>
                <ListItemText primary={<CarteFood food={food} />} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>
    </div>
  );
}
