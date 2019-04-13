import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {addDays, subDays} from 'date-fns';


class CustomDatePicker extends React.Component {

  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = (date) => {
    this.props.onDateChange(date);
  }

  addToDate = (date) => {
    this.props.onDateChange(addDays(date, 1));
  }

  subtractFromDate = (date) => {
    this.props.onDateChange(subDays(date, 1));
  }

  render() {
    const date = this.props.date;
    return(
      <div>

        <IconButton onClick={() => this.subtractFromDate(date)}>
          <ArrowBackIos fontSize="small" />
        </IconButton>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            keyboard
            label = "Date"
            format = "yyyy/dd/MM"
            mask={value =>
              value ? [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/] : []
            }
            value = {date}
            onChange = {this.handleDateChange}
          />
        </MuiPickersUtilsProvider>


        <IconButton onClick={() => this.addToDate(date)}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>

      </div>
    );
  }
}

export default CustomDatePicker;