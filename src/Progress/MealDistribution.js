class MealDistribution {
  constructor(apiData) {
    if(!apiData) {
      this.breakfast = 0;
      this.lunch = 0;
      this.dinner = 0;
      this.other = 0;
    }
    else {
      this.breakfast = this.round(apiData.breakfast);
      this.lunch = this.round(apiData.lunch);
      this.dinner = this.round(apiData.dinner);
      this.other = this.round(apiData.other);
    }
  }

  round(value) {
    return Math.round(value*100);
  }

  getChartData() {
    return [
      this.getChartDataElement('breakfast'),
      this.getChartDataElement('lunch'),
      this.getChartDataElement('dinner'),
      this.getChartDataElement('other'),
    ];
  }

  getChartDataElement(mealName) {
    return {
      mealName: mealName,
      percentOfTotalCalories: this[mealName]
    }
  }
}

export default MealDistribution;