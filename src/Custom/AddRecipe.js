import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchFoodItems from '../FoodDiary/AddItem/SearchFoodItems';
import SelectMeasure from '../FoodDiary/AddItem/SelectMeasure';
import axios from 'axios';
import RecipeTable from './RecipeTable';
import Recipe from './Recipe';

class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      foodItemSearchValue: '',
      foodItems: [],
      measures: [],
      selectedServing: '',
      recipe: new Recipe(),
      recipeName: '',
      recipeDescription: ''
    };
    this.clearUserSelection.bind(this);
    this.handleFoodItemSelection.bind(this);
    this.handleMeasureSelection.bind(this);
    this.handleFoodItemSearchInputChange.bind(this);
    this.handleServingChange.bind(this);
    this.handleItemAddition.bind(this);
    this.handlePortionDeletion.bind(this);
    this.handleRecipeSave.bind(this);
    this.handleRecipeNameChange.bind(this);
    this.handleRecipeDescriptionChange.bind(this);
  }

  getFoodItems() {
    axios
      .get('http://localhost:8080/food')
      .then(response => {
        this.setState({
          foodItems: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  getAndAddFoodToRecipe(selectedFoodItem, selectedMeasure, selectedServing) {
    const foodId = selectedFoodItem.foodId;
    const measureId = selectedMeasure.measureId;
    axios
      .get(`http://localhost:8080/food/${foodId}?measureId=${measureId}&serving=${selectedServing}`)
      .then(response => {
        const newFoodItem = response.data;
        const newRecipe = this.state.recipe.addPortionAndGetRecipe(
          newFoodItem,
          selectedMeasure,
          selectedServing);
        this.setState({
          recipe: newRecipe
        });
      })
      .then();
  }

  getMeasure(selectedFoodItem) {
    console.log('requesting measure');
    const foodId = selectedFoodItem.foodId;
    axios
      .get(`http://localhost:8080/food/${foodId}/measure`)
      .then(response => {
        this.setState({
          selectedFoodItem: selectedFoodItem,
          measures: response.data
        });
        console.log('measures loaded');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      })
  }

  saveRecipe(recipe) {
    axios
      .post(`http://localhost:8080/n89sharma/recipe`, recipe)
      .then();
  }

  componentDidMount() {
    this.getFoodItems();
  }

  clearUserSelection = () => {
    this.setState({
      foodItemSearchValue: '',
      measures: [],
      selectedServing: '',
    })
  }

  handleFoodItemSelection = selectedFoodItem => {
    this.getMeasure(selectedFoodItem);
  }

  handleMeasureSelection = selectedMeasure => {
    this.setState({ selectedMeasure: selectedMeasure });
  }

  handleFoodItemSearchInputChange = (event, { newValue }) => {
    this.setState({ foodItemSearchValue: newValue });
  }

  handleServingChange = (event) => {
    if (!isNaN(event.target.value)) {
      this.setState({ selectedServing: event.target.value });
    }
  }

  handleItemAddition = () => {
    const { selectedFoodItem, selectedMeasure, selectedServing } = this.state;
    if (selectedFoodItem && selectedMeasure && selectedServing) {
      this.getAndAddFoodToRecipe(selectedFoodItem, selectedMeasure, selectedServing);
      this.clearUserSelection();
    }
  }

  handlePortionDeletion = index => {
    const newRecipe = this.state.recipe.deletePortionAndGetRecipe(index);
    this.setState({
      recipe: newRecipe
    });
  }

  handleRecipeSave = () => {
    const userId = 'n89sharma'
    const { recipeName, recipeDescription, recipe } = this.state
    const apiRecipe = recipe.getApiRecipe(
      userId,
      recipeName,
      recipeDescription);
    this.saveRecipe(apiRecipe);
  }

  handleRecipeNameChange = event => {
    this.setState({ recipeName: event.target.value })
  }

  handleRecipeDescriptionChange = event => {
    this.setState({ recipeDescription: event.target.value })
  }

  render() {
    const {
      foodItemSearchValue,
      foodItems,
      measures,
      selectedServing,
      recipe,
      recipeName,
      recipeDescription } = this.state;

    return (
      <div>

        <Grid container spacing={24}>
          <Grid item xs={3}>
            <SearchFoodItems
              foodItemSearchValue={foodItemSearchValue}
              onFoodItemSearchInputChange={this.handleFoodItemSearchInputChange}
              foodItems={foodItems}
              onFoodItemSelection={this.handleFoodItemSelection}
            />
          </Grid>

          <Grid item xs={3}>
            <SelectMeasure
              measures={measures}
              onMeasureSelection={this.handleMeasureSelection}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label='Serving'
              value={selectedServing}
              onChange={this.handleServingChange}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleItemAddition}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={3}>
            <TextField
              label='Recipe Name'
              value={recipeName}
              onChange={this.handleRecipeNameChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label='Recipe Description'
              value={recipeDescription}
              onChange={this.handleRecipeDescriptionChange}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleRecipeSave}
            >
              Save Recipe
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid
            item
            xs={8}
          >
            <RecipeTable
              recipe={recipe}
              onPortionDeletion={this.handlePortionDeletion}
            />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default AddRecipe;