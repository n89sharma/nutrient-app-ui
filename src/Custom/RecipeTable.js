import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class RecipeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPortion = portion => {
    const { handleRecipeItemDeletion } = this.props;
    const index = portion.index;
    return (
      <React.Fragment key={index}>
        <TableRow>
          <TableCell>{portion.foodItem.foodDescription}</TableCell>
          <TableCell>{portion.measure.measureName}</TableCell>
          <TableCell>{portion.serving}</TableCell>
          <TableCell>{Math.round(portion.foodItem.calories)}</TableCell>
          <TableCell>
            <IconButton
              onClick={() => handleRecipeItemDeletion(index)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  renderTotals = () => {
    const { recipe } = this.props;
    const totals = recipe.getTotals();
    return (
      <React.Fragment key='totals'>
        <TableRow>
          <TableCell>Total</TableCell>
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
    const { recipe } = this.props;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Meaure</TableCell>
              <TableCell>Serving</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recipe.portions.map(portion => this.renderPortion(portion))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default RecipeTable;