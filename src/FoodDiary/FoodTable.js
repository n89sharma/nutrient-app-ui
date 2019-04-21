import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class FoodTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { foodItems, handleFoodItemDeletion } = this.props;
    console.log(foodItems);
    return (
      <div>
        <Table
          style={{
            width: 800
          }}
        >

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
            {
              foodItems.map(foodItem =>
                <React.Fragment key={foodItem.foodId}>
                  <TableRow>
                    <TableCell>Meal</TableCell>
                    <TableCell>{foodItem.foodDescription}</TableCell>
                    <TableCell>{foodItem.calories}</TableCell>
                    <TableCell>{foodItem.macroNutrients.carbohydrates.amountValue}</TableCell>
                    <TableCell>{foodItem.macroNutrients.fats.amountValue}</TableCell>
                    <TableCell>{foodItem.macroNutrients.sugars.amountValue}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleFoodItemDeletion(foodItem.foodId)}
                      >
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            }

          </TableBody>

        </Table>
      </div>
    );

  }
}

export default FoodTable;