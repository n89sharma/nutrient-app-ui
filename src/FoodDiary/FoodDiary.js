import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
import FoodTable from './FoodTable'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { DailySummary } from './DailySummary'
import { format } from 'date-fns/esm';
import BarLoader from 'react-spinners/BarLoader';

class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFoodItemAddition = this.handleFoodItemAddition.bind(this);
    this.state = {
      date: new Date(),
      dailySummary: new DailySummary(),
      isLoading: true
    };
    this.getDailySummary(this.state.date);
  }

  handleDateChange = date => {
    this.setState({ date: date });
    this.getDailySummary(date);
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

  getDailySummary(date) {
    this.setState({ isLoading: true });
    const formattedDate = format(date, 'yyyyMMdd');
    axios
      .get(`http://localhost:8080/n89sharma/data/${formattedDate}/food-summary`)
      .then(response => {
        const newDailySummary = new DailySummary(response.data);
        this.setState({ dailySummary: newDailySummary });
      })
      .then(() => this.setState({ isLoading: false }));
  }

  postFoodSummary() {
    const apiDailySummary = this.state.dailySummary.getApiDailySummary();
    axios
      .put(
        `http://localhost:8080/n89sharma/data/${apiDailySummary.date}/food-summary`,
        apiDailySummary
      )
      .then(response => {
      })
  }

  handleFoodItemDeletion = (foodId, meal) => {
    const newDailySummary = this.state.dailySummary.removeFoodPortionAndReturnACopy(foodId, meal);
    this.setState({ dailySummary: newDailySummary });
    this.postFoodSummary();
  }

  renderTable() {
    const { dailySummary, isLoading } = this.state;
    if (!isLoading) {
      return (
        <React.Fragment>
          <Grid
            item
            xs={12}
          >
            <FoodTable
              dailySummary={dailySummary}
              handleFoodItemDeletion={this.handleFoodItemDeletion}
            />
          </Grid>
        </React.Fragment>
      );
    }
  }

  render() {
    const { date, isLoading } = this.state;
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

        <Grid
          container
          spacing={24}
          alignItems="center"
          direction="column"
        >
          <Grid
            item
            xs={12}
            alignContent="center"
            alignItems="center"
            justify="center"
          >
            <BarLoader
              loading={isLoading}
              size={150}
              sizeUnit={'px'}
            />
          </Grid>
          {this.renderTable(isLoading)}
        </Grid>
      </div>
    );
  }
}

export default FoodDiary;