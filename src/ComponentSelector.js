import React from 'react';
import { componentNames as components } from './Utils/Constants';
import FoodDiary from './FoodDiary/FoodDiary'
import AddFoodIem from './Custom/AddFoodItem';

function ComponentSelector (props) {
  switch(props.enabledComponent) {
    case components.FOOD_DIARY:
      return <FoodDiary/>;
    case components.CUSTOM:
      return <AddFoodIem/>;
    default:
      return null;
  }
}

export default ComponentSelector;