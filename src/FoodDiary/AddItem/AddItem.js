import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MealSelection from './MealSelection';
import { meals } from '../../Utils/Constants';
import SearchFoodItems from './SearchFoodItems';
import axios from 'axios';
import SelectMeasure from './SelectMeasure';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.clearUserSelection = this.clearUserSelection.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogAdd = this.handleDialogAdd.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleMeasureSelection = this.handleMeasureSelection.bind(this);
    this.handleAddAnotherItem = this.handleAddAnotherItem.bind(this);
    this.getMeasure = this.getMeasure.bind(this);
    this.state = {
      addItemDialogVisible: false,
      selectedMeals: {
        [meals.BREAKFAST]: false,
        [meals.LUNCH]: false,
        [meals.DINNER]: false,
        [meals.OTHER]: false
      },
      isLoading: true,
      errors: null,
      foodItems: [],
      selectedFoodItem: {},
      measures: [],
      selectedMeasure: {},
      addAnotherItem: false,
      selectedServing: ''
    };
  }

  getFoodItems() {
    axios
      .get('http://localhost:8080/food')
      .then(response => {
        console.log('loaded items');
        this.setState({
          foodItems: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  getMeasure(selectedFoodItem) {
    console.log('requesting measure');
    const foodId = selectedFoodItem.foodId;
    axios
      .get(`http://localhost:8080/food/${foodId}/measure`)
      .then(response => {
        this.setState({
          selectedFoodItem: selectedFoodItem,
          measures: response.data
        });
        console.log('measures loaded');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      })
  }

  componentDidMount() {
    this.getFoodItems();
  }

  clearUserSelection = () => {
    this.setState({
      selectedMeals: {
        [meals.BREAKFAST]: false,
        [meals.LUNCH]: false,
        [meals.DINNER]: false,
        [meals.OTHER]: false
      },
      selectedFoodItem: {},
      selectedMeasure: {},
      selectedServing: ''
    });
  };

  handleDialogOpen = () => {
    this.clearUserSelection();
    this.setState({ addItemDialogVisible: true });
  }

  handleDialogClose = () => {
    this.setState({ addItemDialogVisible: false });
  };

  handleDialogAdd = () => {
    if (!this.state.addAnotherItem) {
      this.setState({ addItemDialogVisible: false });
    }
    this.props.handleFoodItemAddition(
      this.state.selectedMeals,
      this.state.selectedFoodItem,
      this.state.selectedMeasure,
      this.state.selectedServing)
    this.clearUserSelection();
  }

  handleMealChange = selectedMeals => {
    this.setState({ selectedMeals: selectedMeals });
  }

  handleFoodItemSelection = selectedFoodItem => {
    this.getMeasure(selectedFoodItem);
  }

  handleMeasureSelection = selectedMeasure => {
    this.setState({ selectedMeasure: selectedMeasure });
  }

  handleAddAnotherItem = () => {
    this.setState({addAnotherItem: !this.state.addAnotherItem})
  }

  render() {
    const {
      selectedMeals,
      addItemDialogVisible,
      foodItems,
      measures,
      addAnotherItem } = this.state;

    return (
      <div>
        <Button 
          color='primary'
          variant='contained'
          onClick={this.handleDialogOpen}>
          Add Item
        </Button>

        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={addItemDialogVisible}
          onClose={this.handleDialogClose}
        >
          <DialogTitle>
            Add Item
          </DialogTitle>
          <DialogContent>

            <Grid container spacing={24}>
              <Grid item>
                <MealSelection
                  selectedMeals={selectedMeals}
                  onMealChange={this.handleMealChange}
                />
              </Grid>
              <Grid item>
                <SearchFoodItems
                  foodItems={foodItems}
                  onFoodItemSelection={this.handleFoodItemSelection}
                />
              </Grid>
              <Grid item>
                <SelectMeasure
                  measures={measures}
                  onMeasureSelection={this.handleMeasureSelection}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Checkbox
              checked={addAnotherItem}
              value={'Add another item'}
              onChange={this.handleAddAnotherItem}
            >

            </Checkbox>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleDialogAdd}>
              Add
            </Button>
            <Button
              variant='contained'
              onClick={this.handleDialogClose}>
              Cancel
            </Button>
          </DialogActions>

        </Dialog>

      </div>
    );
  }
}

export default AddItem;
