import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchFoodItems from './SearchFoodItems';
import SelectMeasure from './SelectMeasure';

class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      foodItemSearchValue: '',
      foodItems: [],
      mesures: [],
      selectedServing: '',

    };
  }

  handleFoodItemSelection = selectedFoodItem => {
    this.getMeasure(selectedFoodItem);
  }

  handleMeasureSelection = selectedMeasure => {
    this.setState({ selectedMeasure: selectedMeasure });
  }

  handleFoodItemSearchInputChange = (event, { newValue }) => {
    this.setState({ foodItemSearchValue: newValue });
  }

  handleServingChange = (event) => {
    if(!isNaN(event.target.value)) {
      this.setState({selectedServing: event.target.value});
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={24}>

          <Grid item>
            <SearchFoodItems
              foodItemSearchValue={foodItemSearchValue}
              onFoodItemSearchInputChange={this.handleFoodItemSearchInputChange}
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

          <Grid item>
            <TextField
              label='Serving'
              value={selectedServing}
              onChange={this.handleServingChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddRecipe;