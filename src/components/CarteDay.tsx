import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import CarteFood from './CarteFood'

type CarteDayProps = {
  carte: CarteDto
  isLoading: boolean
}

type MealName = '조식' | '중식' | '석식'

export default function CarteDay({ carte, isLoading }: CarteDayProps) {
  const [selectedMealName, setSelectedMealName] = useState<MealName>(() => {
    const hour = dayjs().hour()

    if (hour < 9) {
      return '조식'
    }
    if (hour < 13) {
      return '중식'
    }
    if (hour < 19) {
      return '석식'
    }
    return '조식'
  })
  const selectedMeal = useMemo(
    () => carte?.meals.find((meal) => meal.name === selectedMealName),
    [carte, selectedMealName]
  )

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <AppBar position="static">
        <Tabs
          value={selectedMealName}
          onChange={(e, v) => setSelectedMealName(v)}
          indicatorColor="primary"
          textColor="inherit"
        >
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
              paddingTop: 16
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
    </Box>
  )
}
