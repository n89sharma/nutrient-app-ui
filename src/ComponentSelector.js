import React from 'react';
import { componentNames as components } from './Utils/Constants';
import FoodDiary from './FoodDiary/FoodDiary'
import AddFoodIem from './Custom/AddFoodItem';
import DailyProgress from './Progress/DailyProgress';

function ComponentSelector (props) {
  switch(props.enabledComponent) {
    case components.FOOD_DIARY:
      return <FoodDiary/>;
    case components.CUSTOM:
      return <AddFoodIem/>;
    case components.PROGRESS:
      return <DailyProgress/>;
    default:
      return null;
  }
}

export default ComponentSelector;