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
  loading: boolean
  carte?: CarteDto
}

type MealName = '조식' | '중식' | '석식'

export default function CarteDay({ loading, carte }: CarteDayProps) {
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
        {loading || !selectedMeal ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography>
                식단을 선택하세요
                <br />
                (없을 수도 있어요..!)
              </Typography>
            )}
          </Box>
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
