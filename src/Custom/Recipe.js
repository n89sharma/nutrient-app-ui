class Portion {
  constructor (index, foodItem, measure, serving) {
    this.index = index
    this.foodItem = foodItem
    this.measure = measure
    this.serving = serving
  }
}

class Recipe {
  constructor (portions) {
    this.portions = !portions ? [] : portions
  }

  addPortionAndGetRecipe (foodItem, measure, serving) {
    let newPortions = this.portions.slice()
    const newIndex = this.portions.length
    newPortions.push(new Portion(newIndex, foodItem, measure, serving))
    return new Recipe(newPortions)
  }

  deletePortionAndGetRecipe (index) {
    let newPortions = this.portions.slice()
    newPortions.splice(index, 1)
    return new Recipe(newPortions)
  }

  getTotals () {
    const sumValueAndRound = getField => Math.round(this.portions.reduce((total, portion) => total + getField(portion), 0))
    const calorieTotal = sumValueAndRound(portion => portion.foodItem.calories)
    const carbohydratesTotal = sumValueAndRound(portion => portion.foodItem.macroNutrients.carbohydrates.amountValue)
    const fatsTotal = sumValueAndRound(portion => portion.foodItem.macroNutrients.fats.amountValue)
    const proteinTotal = sumValueAndRound(portion => portion.foodItem.macroNutrients.protein.amountValue)
    return {
      calorieTotal: calorieTotal,
      carbohydratesTotal: carbohydratesTotal,
      fatsTotal: fatsTotal,
      proteinTotal: proteinTotal
    }
  }

  getApiRecipe (userId, recipeName, description) {
    let portionIds = this.portions.map(this.getPortionId)
    return {
      userId: userId,
      name: recipeName,
      description: description,
      portionIds: portionIds
    }
  }

  getPortionId (portion) {
    return {
      foodId: portion.foodItem.foodId,
      measureId: portion.measure.measureId,
      serving: portion.serving
    }
  }
}

export default Recipe
