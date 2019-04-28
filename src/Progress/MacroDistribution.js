class MacroDistribution {
  constructor(apiData) {
    if (!apiData) {
      this.fats = 0;
      this.carbohydrates = 0;
      this.proteins = 0;
      this.other = 0;
    }
    else {
      this.fats = this.round(apiData.caloriePercentFromFats);
      this.carbohydrates = this.round(apiData.caloriePercentFromCarbohydrates);
      this.proteins = this.round(apiData.caloriePercentFromProteins);
      this.other = this.round(apiData.caloriePercentFromOther);
    }
  }

  round(value) {
    return Math.round(value*100);
  }

  getChartData() {
    return [
      this.getChartDataElement('fats'),
      this.getChartDataElement('carbohydrates'),
      this.getChartDataElement('proteins'),
      this.getChartDataElement('other')
    ]
  }

  getChartDataElement(macroName) {
    return {
      macroName: macroName,
      percentOfTotalCalories: this[macroName]
    }
  }
}

export default MacroDistribution;