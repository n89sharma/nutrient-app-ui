import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
import FoodTable from './FoodTable'
import { meals } from '../Utils/Constants'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { DailySummary } from './DailySummary'

console.log(new DailySummary());
class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFoodItemAddition = this.handleFoodItemAddition.bind(this);
    this.state = {
      date: new Date(),
      dailySummary: new DailySummary()
    };
  }

  handleDateChange = date => {
    this.setState({ date: date });
  }

  handleFoodItemAddition = (mealCheckboxSelection, selectedFoodItemSummary, selectedMeasure, selectedServing) => {
    axios
      .get(`http://localhost:8080/food/${selectedFoodItemSummary.foodId}?measureId=${selectedMeasure.measureId}&serving=${selectedServing}`)
      .then(response => {
        const selectedFoodItem = response.data;
        const newDailySummary = this.state.dailySummary.addNewFoodPortionAndReturnACopy(
          mealCheckboxSelection,
          selectedFoodItem,
          selectedMeasure,
          selectedServing
        );
        this.setState({
          dailySummary: newDailySummary
        });
        this.postFoodSummary();
      })
      .then();
  }

  postFoodSummary() {
    const apiDailySummary = this.state.dailySummary.getApiDailySummary();
    console.log(apiDailySummary);
    axios
      .put(
        `http://localhost:8080/n89sharma/data/${apiDailySummary.date}/food-summary`,
        apiDailySummary
      )
      .then( response => {
        console.log(response.data);
      })
  }

  handleFoodItemDeletion = (foodId, meal) => {
    const newDailySummary = this.state.dailySummary.removeFoodPortionAndReturnACopy(foodId, meal);
    this.setState({ dailySummary: newDailySummary });
  }

  render() {
    const { date, dailySummary } = this.state;
    return (
      <div>
        <Grid container spacing={24}>

          <Grid item>
            <CustomDatePicker
              date={date}
              onDateChange={this.handleDateChange}
            />
          </Grid>

          <Grid item>
            <AddItem
              handleFoodItemAddition={this.handleFoodItemAddition}
            />
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item>
            <FoodTable
              dailySummary={dailySummary}
              handleFoodItemDeletion={this.handleFoodItemDeletion}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FoodDiary;