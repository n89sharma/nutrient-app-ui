import React from 'react';
import { componentNames as components } from './Utils/Constants';
import FoodDiary from './FoodDiary/FoodDiary'
import AddRecipe from './Custom/AddRecipe';
import DailyProgress from './Progress/DailyProgress';

function ComponentSelector (props) {
  switch(props.enabledComponent) {
    case components.FOOD_DIARY:
      return <FoodDiary/>;
    case components.CUSTOM:
      return <AddRecipe/>;
    case components.PROGRESS:
      return <DailyProgress/>;
    default:
      return null;
  }
}

export default ComponentSelector;