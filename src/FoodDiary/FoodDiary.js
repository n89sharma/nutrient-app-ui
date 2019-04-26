import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
import FoodTable from './FoodTable'
import { meals } from '../Utils/Constants'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

class FoodPortion {
  constructor(foodItem, measure, serving) {
    this.foodItem = foodItem;
    this.measure = measure;
    this.serving = serving;
  }
}

class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFoodItemAddition = this.handleFoodItemAddition.bind(this);
    this.state = {
      date: new Date(),
      dailyMeals: {
        [meals.BREAKFAST]: [],
        [meals.LUNCH]: [],
        [meals.DINNER]: [],
        [meals.OTHER]: []
      }
    };
  }

  getPortionIds(item) {
    return {
      foodId: item.foodItem.foodId,
      measureId: item.measure.measureId,
      serving: item.serving
    };
  }

  getDailySummary() {
    const userId = 'n89sharma';
    const date = new Date().toISOString();
    const dailyMeals = this.state.dailyMeals;
    const breakfastPortionsIds = dailyMeals[meals.BREAKFAST].map(this.getPortionIds);
    const lunchPortionsIds = dailyMeals[meals.LUNCH].map(this.getPortionIds);
    const dinnerPortionsIds = dailyMeals[meals.DINNER].map(this.getPortionIds);
    const otherPortionsIds = dailyMeals[meals.OTHER].map(this.getPortionIds);

    return {
      userId: userId,
      date: date,
      breakfast: breakfastPortionsIds,
      lunch: lunchPortionsIds,
      dinner: dinnerPortionsIds,
      other: otherPortionsIds
    };
  }

  handleDateChange = date => {
    this.setState({ date: date });
  }

  handleFoodItemAddition = (mealsForFoodItem, selectedFoodItem, selectedMeasure, selectedServing) => {
    const selectedMeals = Object.keys(mealsForFoodItem).filter(key => mealsForFoodItem[key]);
    axios
      .get(`http://localhost:8080/food/${selectedFoodItem.foodId}?measureId=${selectedMeasure.measureId}&serving=${selectedServing}`)
      .then(response => {
        const newFoodPortion = new FoodPortion(
          response.data,
          selectedMeasure,
          selectedServing);
        let newDailyMeals = Object.assign(this.state.dailyMeals);
        selectedMeals.forEach(meal => newDailyMeals[meal].push(newFoodPortion));
        this.setState({
          dailyMeals: newDailyMeals
        });
        this.postFoodSummary();
      })
      .then();


  }

  postFoodSummary() {

    const dailySummary = this.getDailySummary();
    axios
      .post(
        `http://localhost:8080/n89sharma/data/${dailySummary.date}/food-summary`,
        dailySummary
      )
      .then( response => {
        console.log(response.data);
      })
  }

  handleFoodItemDeletion = (foodId, meal) => {
    let newDailyMeals = Object.assign(this.state.dailyMeals);
    newDailyMeals[meal] = newDailyMeals[meal].filter(portion => portion.foodItem.foodId != foodId);
    this.setState({ dailyMeals: newDailyMeals });
  }

  render() {
    const { date, dailyMeals } = this.state;
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
              dailyMeals={dailyMeals}
              handleFoodItemDeletion={this.handleFoodItemDeletion}
            />
          </Grid>

        </Grid>



      </div>
    );
  }
}

export default FoodDiary;