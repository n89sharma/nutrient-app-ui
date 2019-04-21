import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
import FoodTable from './FoodTable'
import { meals } from '../Utils/Constants'
import axios from 'axios';

class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFoodItemAddition = this.handleFoodItemAddition.bind(this);
    this.state = {
      date: new Date(),
      foodItems: []
      // [meals.BREAKFAST]: [],
      // [meals.LUNCH]: [],
      // [meals.DINNER]: [],
      // [meals.OTHER]: []
    };
  }

  handleDateChange = date => {
    this.setState({date: date});
  }

  handleFoodItemAddition = (selectedMeals, selectedFoodItem, selectedMeasure) => {
    const newFoodItems = this.state.foodItems.slice();
    const foodId = selectedFoodItem.foodId;
    axios
      .get(`http://localhost:8080/food/${foodId}`)
      .then(response => {
        newFoodItems.push(response.data);
        this.setState({
          foodItems: newFoodItems
        });
      })
      .then();
  }

  handleFoodItemDeletion = foodId => {
    const newFoodItems = this.state.foodItems.slice().filter(foodItem => foodItem.foodId != foodId);
    this.setState({foodItems: newFoodItems});
  }

  render() {
    const { date, foodItems } = this.state;
    return(
      <div>
        <CustomDatePicker
          date = {date}
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