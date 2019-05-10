import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { meals } from '../Utils/Constants'
import { withStyles } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontSize:17
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class DailySummaryTable extends React.Component {
  constructor(props) {
    super(props)
  }

  renderMealLabelAndFoodItemsForMeal = meal => {
    const { dailySummary, handleDailySummaryItemDeletion } = this.props
    let foodItemsForMeal = dailySummary.getFoodItemsForMeal(meal)
    const numFoodItems = foodItemsForMeal.length == 0 ? 1 : foodItemsForMeal.length
    const firstFoodItem = numFoodItems ? foodItemsForMeal.splice(0, 1)[0] : null
    return (
      <React.Fragment key={meal}>
        <TableRow>
          <CustomTableCell rowSpan={numFoodItems}>{meal}</CustomTableCell>
          {firstFoodItem ? this.renderFoodItemsForMeal(firstFoodItem, meal, handleDailySummaryItemDeletion) : null}
        </TableRow>
        {foodItemsForMeal.map(item => {
          return (
            <TableRow key={item.foodId + meal}>
              {this.renderFoodItemsForMeal(item, meal, handleDailySummaryItemDeletion)}
            </TableRow>
          )
        })}
      </React.Fragment>
    )
  }

  renderFoodItemsForMeal = (foodItem, meal, handleDelete) => {
    return (
      <React.Fragment key={foodItem.foodId + meal}>
        <CustomTableCell>{foodItem.foodDescription}</CustomTableCell>
        <CustomTableCell>{Math.round(foodItem.calories)}</CustomTableCell>
        <CustomTableCell>{Math.round(foodItem.macroNutrients.carbohydrates.amountValue)}</CustomTableCell>
        <CustomTableCell>{Math.round(foodItem.macroNutrients.fats.amountValue)}</CustomTableCell>
        <CustomTableCell>{Math.round(foodItem.macroNutrients.protein.amountValue)}</CustomTableCell>
        <CustomTableCell>
          <IconButton
            onClick={() => handleDelete(foodItem.foodId, meal)}
          >
            <DeleteIcon />
          </IconButton>
        </CustomTableCell>
      </React.Fragment>
    )
  }

  renderTotals = () => {
    const { dailySummary } = this.props
    const totals = dailySummary.getTotals()
    return (
      <React.Fragment key='totals'>
        <TableRow>
          <CustomTableCell colSpan={2}>Total</CustomTableCell>
          <CustomTableCell>{totals.calorieTotal}</CustomTableCell>
          <CustomTableCell>{totals.carbohydratesTotal}</CustomTableCell>
          <CustomTableCell>{totals.fatsTotal}</CustomTableCell>
          <CustomTableCell>{totals.proteinTotal}</CustomTableCell>
          <CustomTableCell></CustomTableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Table>

          <TableHead>
            <TableRow>
              <CustomTableCell>Meal</CustomTableCell>
              <CustomTableCell>Item</CustomTableCell>
              <CustomTableCell>Calories</CustomTableCell>
              <CustomTableCell>Carbohydrate</CustomTableCell>
              <CustomTableCell>Fat</CustomTableCell>
              <CustomTableCell>Protein</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
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
    )

  }
}

export default DailySummaryTable