import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
import FoodTable from './FoodTable'
import { meals } from '../Utils/Constants'
import axios from 'axios';

class TableFoodItem {
  constructor(selectedMeals, selectedFoodItem, selectedMeasure) {
    this.meals = selectedMeals;
    this.foodItem = selectedFoodItem;
    this.measure = selectedMeasure;
  }
}

class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFoodItemAddition = this.handleFoodItemAddition.bind(this);
    this.state = {
      date: new Date(),
      foodItems: {
        [meals.BREAKFAST]: [],
        [meals.LUNCH]: [],
        [meals.DINNER]: [],
        [meals.OTHER]: []
      }
    };
  }

  handleDateChange = date => {
    this.setState({ date: date });
  }

  handleFoodItemAddition = (mealsForFoodItem, selectedFoodItem, selectedMeasure) => {
    const selectedMeals = Object.keys(mealsForFoodItem).filter(key => mealsForFoodItem[key]);
    axios
      .get(`http://localhost:8080/food/${selectedFoodItem.foodId}`)
      .then(response => {
        const newFoodItem = response.data;
        let newFoodItems = Object.assign(this.state.foodItems);
        selectedMeals.forEach(meal => newFoodItems[meal].push(newFoodItem));
        this.setState({
          foodItems:newFoodItems
        });
      })
      .then();
  }

  handleFoodItemDeletion = (foodId, meal) => {
    let newFoodItems = Object.assign(this.state.foodItems);
    newFoodItems[meal] = newFoodItems[meal].filter(foodItem => foodItem.foodId != foodId);
    this.setState({ foodItems: newFoodItems });
  }

  render() {
    const { date, foodItems } = this.state;
    return (
      <div>
        <CustomDatePicker
          date={date}
          onDateChange={this.handleDateChange}
        />
        <AddItem
          handleFoodItemAddition={this.handleFoodItemAddition}
        />
        <FoodTable
          foodItems={foodItems}
          handleFoodItemDeletion={this.handleFoodItemDeletion}
        />
      </div>
    );
  }
}

export default FoodDiary;