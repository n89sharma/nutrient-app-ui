import { meals } from '../Utils/Constants'
import { format } from 'date-fns/esm'

export class DailySummary {
  constructor (apiData) {
    this.meals = [
      meals.BREAKFAST,
      meals.LUNCH,
      meals.DINNER,
      meals.OTHER
    ]
    if (!apiData) {
      this[meals.BREAKFAST] = []
      this[meals.LUNCH] = []
      this[meals.DINNER] = []
      this[meals.OTHER] = []
    } else {
      this.mapFromApiDailySummaryView(apiData)
    }
  }

  mapFromApiDailySummaryView (apiDailySummaryView) {
    const createPortion = ar => ar.map(ap => new FoodPortion(ap.food, ap.measure, ap.serving))
    this[meals.BREAKFAST] = createPortion(apiDailySummaryView.breakfast)
    this[meals.LUNCH] = createPortion(apiDailySummaryView.lunch)
    this[meals.DINNER] = createPortion(apiDailySummaryView.dinner)
    this[meals.OTHER] = createPortion(apiDailySummaryView.other)
  }

  getApiDailySummary () {
    const userId = 'n89sharma'
    const date = format(new Date(), 'yyyyMMdd')
    const breakfastPortionsIds = this[meals.BREAKFAST].map(getPortionIds)
    const lunchPortionsIds = this[meals.LUNCH].map(getPortionIds)
    const dinnerPortionsIds = this[meals.DINNER].map(getPortionIds)
    const otherPortionsIds = this[meals.OTHER].map(getPortionIds)

    return {
      userId: userId,
      date: date,
      breakfast: breakfastPortionsIds,
      lunch: lunchPortionsIds,
      dinner: dinnerPortionsIds,
      other: otherPortionsIds
    }
  }

  addNewPortionAndReturnACopy (
    mealCheckboxSelection,
    selectedFoodItem,
    selectedMeasure,
    selectedServing) {
    const selectedMeals = Object.keys(mealCheckboxSelection).filter(key => mealCheckboxSelection[key])
    const newFoodPortion = new FoodPortion(
      selectedFoodItem,
      selectedMeasure,
      selectedServing)
    let newDailySummary = Object.assign(this)
    selectedMeals.forEach(meal => newDailySummary[meal].push(newFoodPortion))
    return newDailySummary
  }

  removeFoodPortionAndReturnACopy (foodId, meal) {
    let newDailySummary = Object.assign(this)
    newDailySummary[meal] = newDailySummary[meal].filter(portion => portion.foodItem.foodId !== foodId)
    return newDailySummary
  }

  getTotals () {
    const allFoodItems = [].concat(
      ...this.meals.map(meal => this[meal].map(portion => portion.foodItem))
    )
    const sumValueAndRound = getField => Math.round(allFoodItems.reduce((total, item) => total + getField(item), 0))
    const calorieTotal = sumValueAndRound(item => item.calories)
    const carbohydratesTotal = sumValueAndRound(item => item.macroNutrients.carbohydrates.amountValue)
    const fatsTotal = sumValueAndRound(item => item.macroNutrients.fats.amountValue)
    const proteinTotal = sumValueAndRound(item => item.macroNutrients.protein.amountValue)
    return {
      calorieTotal: calorieTotal,
      carbohydratesTotal: carbohydratesTotal,
      fatsTotal: fatsTotal,
      proteinTotal: proteinTotal
    }
  }

  getFoodItemsForMeal (meal) {
    return this[meal].map(portion => portion.foodItem)
  }
}

class FoodPortion {
  constructor (foodItem, measure, serving) {
    this.foodItem = foodItem
    this.measure = measure
    this.serving = serving
  }
}

function getPortionIds (item) {
  return {
    foodId: item.foodItem.foodId,
    measureId: item.measure.measureId,
    serving: item.serving
  }
}
