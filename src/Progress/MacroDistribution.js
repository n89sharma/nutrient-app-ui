class MacroDistribution {
  constructor(apiData) {
    if (!apiData) {
      this.fats = 0;
      this.carbohydrates = 0;
      this.proteins = 0;
      this.other = 0;
    }
    else {
      this.fats = this.round(apiData.fats);
      this.carbohydrates = this.round(apiData.carbohydrates);
      this.proteins = this.round(apiData.proteins);
      this.other = this.round(apiData.other);
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
    ];
  }

  getChartDataElement(macroName) {
    return {
      macroName: macroName,
      percentOfTotalCalories: this[macroName]
    }
  }
}

export default MacroDistribution;