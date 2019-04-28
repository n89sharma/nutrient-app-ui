import React from 'react';
import CustomPieChart from './CustomPieChart';
import Loader from '../Utils/Loader';
import { format } from 'date-fns/esm';
import axios from 'axios';
import MacroDistribution from './MacroDistribution';
import Grid from '@material-ui/core/Grid';
import CustomDatePicker from '../Utils/CustomDatePicker';

class DailyProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isLoading: true,
      dailyTotals: {}
    }
    this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.getDailyTotal(this.state.date);
  }

  handleDateChange = date => {
    this.setState({ date: date });
    this.getDailyTotal(date);
  }

  getDailyTotal(date) {
    this.setState({ isLoading: true });
    const formattedDate = format(date, 'yyyyMMdd');
    axios
      .get(`http://localhost:8080/n89sharma/data/${formattedDate}/total`)
      .then(response => {
        console.log(response.data);
        const newDailyTotals = new MacroDistribution(response.data);
        this.setState({ dailyTotals: newDailyTotals });
      })
      .then(() => this.setState({ isLoading: false }));
  }

  renderChart(isLoading) {
    if (!isLoading) {
      const { dailyTotals } = this.state;
      const data = dailyTotals.getChartData()
      console.log(data);
      return (
        <CustomPieChart
          data={data}
          dataKey='percentOfTotalCalories'
          nameKey='macroName'
          cx={'50%'}
          cy={'50%'}
          width={800}
          height={500}
          innerRadius={100}
          outerRadius={200}
        />
      );
    }
  }

  render() {
    const { date, isLoading } = this.state;
    return (
      <div>
        <Grid
          container
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <CustomDatePicker
              date={date}
              onDateChange={this.handleDateChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Loader isLoading={isLoading} />
          </Grid>

          <Grid item xs={12}>
            {this.renderChart(isLoading)}
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default DailyProgress;