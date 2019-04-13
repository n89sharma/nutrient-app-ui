import React from 'react';
import CustomDatePicker from '../Utils/CustomDatePicker'
import AddItem from './AddItem/AddItem'
class FoodDiary extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {date: new Date()};
  }

  handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    const date = this.state.date;
    return(
      <div>
        <CustomDatePicker
          date = {date}
          onDateChange = {this.handleDateChange}
        />
        <AddItem/>
      </div>
    );
  }
}

export default FoodDiary;