import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { meals } from '../Utils/Constants';

class DailySummaryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMealLabelAndFoodItemsForMeal = meal => {
    const { dailySummary } = this.props;
    const numFoodItems = dailySummary.getFoodItemsForMeal(meal).length + 1;

    return (
      <React.Fragment key={meal}>
        <TableRow>
          <TableCell rowSpan={numFoodItems}>{meal}</TableCell>
        </TableRow>
        {this.renderFoodItemsForMeal(meal)}
      </React.Fragment>
    );
  }

  renderFoodItemsForMeal = meal => {
    const { dailySummary, handleDailySummaryItemDeletion } = this.props;
    const foodItemsForMeal = dailySummary.getFoodItemsForMeal(meal);
    return (
      foodItemsForMeal.map(foodItem =>
        <React.Fragment key={foodItem.foodId + meal}>
          <TableRow>
            <TableCell>{foodItem.foodDescription}</TableCell>
            <TableCell>{Math.round(foodItem.calories)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.carbohydrates.amountValue)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.fats.amountValue)}</TableCell>
            <TableCell>{Math.round(foodItem.macroNutrients.protein.amountValue)}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleDailySummaryItemDeletion(foodItem.foodId, meal)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ));
  }

  renderTotals = () => {
    const { dailySummary } = this.props;
    const totals = dailySummary.getTotals();
    return (
      <React.Fragment key='totals'>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{totals.calorieTotal}</TableCell>
          <TableCell>{totals.carbohydratesTotal}</TableCell>
          <TableCell>{totals.fatsTotal}</TableCell>
          <TableCell>{totals.proteinTotal}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );

  }
}

export default DailySummaryTable;