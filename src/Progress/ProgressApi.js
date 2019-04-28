import axios from 'axios';
import MacroDistribution from './MacroDistribution';

function getDailyTotal(date) {
  axios
    .get(`http://localhost:8080/n89sharma/data/${formattedDate}/total`)
    .then(response => {
      console.log(response.data);
      const newDailyTotals = new MacroDistribution(response.data);
      this.setState({ dailyTotals: newDailyTotals });
    })
    .then(() => this.setState({ isLoading: false }));
}

export { getDailyTotal };