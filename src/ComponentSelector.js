import React from 'react'
import { componentNames as components } from './Utils/Constants'
import DailySummaryComponent from './DailySummary/DailySummaryComponent'
import RecipeComponent from './Custom/RecipeComponent'
import DailyProgress from './Progress/DailyProgress'

function ComponentSelector (props) {
  switch (props.enabledComponent) {
    case components.FOOD_DIARY:
      return <DailySummaryComponent />
    case components.CUSTOM:
      return <RecipeComponent />
    case components.PROGRESS:
      return <DailyProgress />
    default:
      return null
  }
}

export default ComponentSelector
