import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { format } from 'date-fns/esm';
import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker';
import Loader from '../Utils/Loader';
import AddItem from './AddItem';
import { DailySummary } from './DailySummary';
import FoodDiaryTable from './FoodDiaryTable';

class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDailySummaryItemAddition = this.handleDailySummaryItemAddition.bind(this);
    this.handleDailySummaryItemDeletion = this.handleDailySummaryItemDeletion.bind(this);
    this.state = {
      date: new Date(),
      dailySummary: new DailySummary(),
      isLoading: true
    };
  }

  componentDidMount() {
    this.getDailySummary(this.state.date);
  }

  handleDateChange = date => {
    this.setState({ date: date });
    this.getDailySummary(date);
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

  handleDailySummaryItemAddition = (
    mealCheckboxSelection,
    selectedFoodItem,
    selectedMeasure,
    selectedServing) => {

    const newDailySummary = this.state.dailySummary.addNewPortionAndReturnACopy(
      mealCheckboxSelection,
      selectedFoodItem,
      selectedMeasure,
      selectedServing)
    this.setState({
      dailySummary: newDailySummary
    });
    this.postDailySummary();
  }

  handleDailySummaryItemDeletion = (foodId, meal) => {
    const newDailySummary = this.state.dailySummary.removeFoodPortionAndReturnACopy(foodId, meal);
    this.setState({ dailySummary: newDailySummary });
    this.postDailySummary();
  }

  postDailySummary() {
    const apiDailySummary = this.state.dailySummary.getApiDailySummary();
    console.log(apiDailySummary);
    axios
      .put(
        `http://localhost:8080/n89sharma/data/${apiDailySummary.date}/food-summary`,
        apiDailySummary
      )
      .then(response => {
      })
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
            <FoodDiaryTable
              dailySummary={dailySummary}
              handleDailySummaryItemDeletion={this.handleDailySummaryItemDeletion}
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
              handleDailySummaryItemAddition={this.handleDailySummaryItemAddition}
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
          >
            <Loader isLoading={isLoading} />
          </Grid>
          {this.renderTable(isLoading)}
        </Grid>
      </div>
    );
  }
}

export default FoodDiary;