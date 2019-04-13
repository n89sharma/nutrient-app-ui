import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MealSelection from './MealSelection';
import { meals } from '../../Utils/Constants';
import SearchFoodItems from './SearchFoodItems';

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogAdd = this.handleDialogAdd.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.state = {
      addItemDialogVisible: false,
      selectedMeals: {
        [meals.BREAKFAST]: false,
        [meals.LUNCH]: false,
        [meals.DINNER]: false,
        [meals.OTHER]: false
      }
    };
  }

  handleDialogOpen = () => {
    this.setState({ addItemDialogVisible: true });
  };

  handleDialogClose = () => {
    this.setState({ addItemDialogVisible: false });
  };

  handleDialogAdd = () => {
    this.setState({addItemDialogVisible: false});
  }

  handleMealChange = (selectedMeals) => {
    this.setState({selectedMeals:selectedMeals});
  }

  render() {
    const selectedMeals = this.state.selectedMeals;
    return (
      <div>

        <Button onClick={this.handleDialogOpen}>
          Add Item
        </Button>

        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.addItemDialogVisible}
          onClose={this.handleDialogClose}
        >
        
        <MealSelection
          selectedMeals={selectedMeals}
          onMealChange={this.handleMealChange}
        />

        <SearchFoodItems/>

        <Button onClick={this.handleDialogAdd}>
          Add
        </Button>

        <Button onClick={this.handleDialogClose}>
          Cancel
        </Button>

        </Dialog>

      </div>
    );
  }
}

export default AddItem;
