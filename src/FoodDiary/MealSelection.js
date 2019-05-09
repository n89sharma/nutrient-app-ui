import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { meals } from '../Utils/Constants';

class MealSelection extends React.Component {

  constructor(props) {
    super(props)
  }

  mealClicked = meal => event => {
    const currentMealsSelected = this.props.selectedMeals;
    const newMealsSelected = Object.assign({}, currentMealsSelected);
    newMealsSelected[meal] = event.target.checked;
    this.props.onMealChange(newMealsSelected);
  }

  render() {
    const selectedMeals = this.props.selectedMeals;
    return(

      <FormControl>
        <FormLabel>Meals</FormLabel>
        <FormGroup>

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMeals[meals.BREAKFAST]}
                onChange={this.mealClicked(meals.BREAKFAST)}
                value={meals.BREAKFAST}
              />
            }
            label={meals.BREAKFAST}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMeals[meals.LUNCH]}
                onChange={this.mealClicked(meals.LUNCH)}
                value={meals.LUNCH}
              />
            }
            label={meals.LUNCH}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMeals[meals.DINNER]}
                onChange={this.mealClicked(meals.DINNER)}
                value={meals.DINNER}
              />
            }
            label={meals.DINNER}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMeals[meals.OTHER]}
                onChange={this.mealClicked(meals.OTHER)}
                value={meals.OTHER}
              />
            }
            label={meals.OTHER}
          />

        </FormGroup>
      </FormControl>

    );
  }
}

export default MealSelection;