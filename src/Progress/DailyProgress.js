import React from 'react'
import CustomPieChart from './CustomPieChart'
import Loader from '../Utils/Loader'
import { format } from 'date-fns/esm'
import axios from 'axios'
import MacroDistribution from './MacroDistribution'
import MealDistribution from './MealDistribution'
import Grid from '@material-ui/core/Grid'
import CustomDatePicker from '../Utils/CustomDatePicker'

class DailyProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      isLoading: true,
      dailyMacroDistribution: {},
      dailyMealDistribution: {}
    }
    this.handleDateChange.bind(this)
  }

  componentDidMount() {
    this.getDailyTotal(this.state.date)
  }

  handleDateChange = date => {
    this.setState({ date: date })
    this.getDailyTotal(date)
  }

  getDailyTotal(date) {
    this.setState({ isLoading: true })
    const formattedDate = format(date, 'yyyyMMdd')
    axios
      .get(`http://localhost:8080/n89sharma/data/${formattedDate}/total`)
      .then(response => {
        const newDailyMacroDistribution = new MacroDistribution(response.data.macroDistribution)
        const newDailyMealDistribution = new MealDistribution(response.data.mealDistribution)
        this.setState({
          dailyMacroDistribution: newDailyMacroDistribution,
          dailyMealDistribution: newDailyMealDistribution
        })
      })
      .then(() => this.setState({ isLoading: false }))
  }

  renderMacroChart(isLoading) {
    if (!isLoading) {
      const { dailyMacroDistribution } = this.state
      const data = dailyMacroDistribution.getChartData()
      return (
        <CustomPieChart
          data={data}
          dataKey='percentOfTotalCalories'
          nameKey='macroName'
          cx={'50%'}
          cy={'50%'}
          width={500}
          height={400}
          innerRadius={50}
          outerRadius={100}
          animationDuration={200}
        />
      )
    }
  }

  renderMealChart(isLoading) {
    if (!isLoading) {
      const { dailyMealDistribution } = this.state
      const data = dailyMealDistribution.getChartData()
      return (
        <CustomPieChart
          data={data}
          dataKey='percentOfTotalCalories'
          nameKey='mealName'
          cx={'50%'}
          cy={'50%'}
          width={500}
          height={400}
          innerRadius={50}
          outerRadius={100}
          animationDuration={200}
        />
      )
    }
  }

  render() {
    const { date, isLoading } = this.state
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <CustomDatePicker
              date={date}
              onDateChange={this.handleDateChange}
            />
          </Grid>

          <Grid item>
            <Loader isLoading={isLoading} />
          </Grid>

          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              {this.renderMacroChart(isLoading)}
            </Grid>
            <Grid item>
              {this.renderMealChart(isLoading)}
            </Grid>
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default DailyProgress