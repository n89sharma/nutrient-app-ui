import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MealSelection from './MealSelection';
import { meals } from '../Utils/Constants';
import PortionComponent from '../Portion/PortionComponent'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleMealDialogAdd = this.handleMealDialogAdd.bind(this);
    this.handleMealDialogClose = this.handleMealDialogClose.bind(this);
    this.handleAddAnotherItem = this.handleAddAnotherItem.bind(this);
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
      addAnotherItem: false
    };
  }

  clearUserSelection = () => {
    this.setState({
      selectedMeals: {
        [meals.BREAKFAST]: false,
        [meals.LUNCH]: false,
        [meals.DINNER]: false,
        [meals.OTHER]: false
      }});
  };

  handleDialogOpen = () => {
    this.clearUserSelection();
    this.setState({ addItemDialogVisible: true });
  }

  handleMealDialogClose = () => {
    this.setState({ addItemDialogVisible: false });
  };

  handleMealDialogAdd = (selectedItemDetails, selectedMeasure, selectedServing) => {
    if (!this.state.addAnotherItem) {
      this.setState({ addItemDialogVisible: false });
    }
    this.props.handleDailySummaryItemAddition(
      this.state.selectedMeals,
      selectedItemDetails,
      selectedMeasure,
      selectedServing)
    this.clearUserSelection();
  }

  handleMealChange = selectedMeals => {
    this.setState({ selectedMeals: selectedMeals });
  }

  handleAddAnotherItem = () => {
    this.setState({ addAnotherItem: !this.state.addAnotherItem })
  }

  render() {
    const {
      selectedMeals,
      addItemDialogVisible,
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
          onClose={this.handleMealDialogClose}
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

              <PortionComponent handleParentItemAdd={this.handleMealDialogAdd}/>

            </Grid>
          </DialogContent>

          <DialogActions>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox
                  checked={addAnotherItem}
                  value={'Add another item'}
                  onChange={this.handleAddAnotherItem}
                />}
                label='Add another item'
              />

            </FormGroup>
            <Button
              variant='contained'
              onClick={this.handleMealDialogClose}>
              Cancel
            </Button>
          </DialogActions>

        </Dialog>

      </div>
    );
  }
}

export default AddItem;
