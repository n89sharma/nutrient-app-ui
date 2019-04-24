import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { meals } from '../Utils/Constants';

class FoodTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMealLabelAndFoodItemsForMeal = meal => {
    const { foodItems } = this.props;
    return (
      <React.Fragment key={meal}>
        <TableRow>
          <TableCell rowSpan={foodItems[meal].length + 1}>{meal}</TableCell>
        </TableRow>
        {this.renderFoodItemsForMeal(meal)}
      </React.Fragment>
    );
  }

  renderFoodItemsForMeal = meal => {
    const { foodItems, handleFoodItemDeletion } = this.props;
    return (
      foodItems[meal].map(foodItem =>
        <React.Fragment key={foodItem.foodId + meal}>
          <TableRow>
            <TableCell>{foodItem.foodDescription}</TableCell>
            <TableCell>{Math.round(foodItem.calories)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.carbohydrates.amountValue)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.fats.amountValue)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.protein.amountValue)}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleFoodItemDeletion(foodItem.foodId, meal)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ));
  }

  renderTotals = () => {
    const { foodItems } = this.props;
    const allFoodItems = [].concat(
      foodItems[meals.BREAKFAST],
      foodItems[meals.LUNCH],
      foodItems[meals.DINNER],
      foodItems[meals.OTHER]
      );

    const sumValueAndRound = getField => Math.round(allFoodItems.reduce((total, item) => total + getField(item), 0));
    const calorieTotal = sumValueAndRound(item => item.calories);
    const carbohydratesTotal = sumValueAndRound(item => item.macroNutrients.carbohydrates.amountValue);
    const fatsTotal = sumValueAndRound(item => item.macroNutrients.fats.amountValue);
    const proteinTotal = sumValueAndRound(item => item.macroNutrients.protein.amountValue);
    return (
      <React.Fragment key='totals'>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{calorieTotal}</TableCell>
          <TableCell>{carbohydratesTotal}</TableCell>
          <TableCell>{fatsTotal}</TableCell>
          <TableCell>{proteinTotal}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Meal</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Carbohydrate</TableCell>
              <TableCell>Fat</TableCell>
              <TableCell>Protein</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.renderMealLabelAndFoodItemsForMeal(meals.BREAKFAST)}
            {this.renderMealLabelAndFoodItemsForMeal(meals.LUNCH)}
            {this.renderMealLabelAndFoodItemsForMeal(meals.DINNER)}
            {this.renderMealLabelAndFoodItemsForMeal(meals.OTHER)}
            {this.renderTotals()}
          </TableBody>

        </Table>
      </div>
    );

  }
}

export default FoodTable;