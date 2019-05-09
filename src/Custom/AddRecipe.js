import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchFoodItems from '../Portion/SearchFoodItems';
import SelectMeasure from '../Portion/SelectMeasure';
import axios from 'axios';
import RecipeTable from './RecipeTable';
import Recipe from './Recipe';
import PortionComponent from '../Portion/PortionComponent';

class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recipe: new Recipe(),
      recipeName: '',
      recipeDescription: '',
      recipeMeasure: ''
    };
    this.handleRecipeItemAddition.bind(this);
    this.handleRecipeItemDeletion.bind(this);
    this.handleRecipeNameChange.bind(this);
    this.handleRecipeDescriptionChange.bind(this);
    this.handleRecipeMeasureChange.bind(this);
    this.handleRecipeSave.bind(this);
  }

  handleRecipeItemAddition = (newItem, selectedMeasure, selectedServing) => {
    const newRecipe = this.state.recipe.addPortionAndGetRecipe(
      newItem,
      selectedMeasure,
      selectedServing);
    this.setState({
      recipe: newRecipe
    });
  }

  handleRecipeItemDeletion = index => {
    const newRecipe = this.state.recipe.deletePortionAndGetRecipe(index);
    this.setState({
      recipe: newRecipe
    });
  }

  handleRecipeNameChange = event => {
    this.setState({ recipeName: event.target.value })
  }

  handleRecipeDescriptionChange = event => {
    this.setState({ recipeDescription: event.target.value })
  }

  handleRecipeMeasureChange = event => {
    this.setState({ recipeMeasure: event.target.value })
  }

  handleRecipeSave = () => {
    const userId = 'n89sharma'
    const { recipeName, recipeDescription, recipeMeasure, recipe } = this.state
    const apiRecipe = recipe.getApiRecipe(
      userId,
      recipeName,
      recipeDescription,
      recipeMeasure);
    this.saveRecipe(apiRecipe);
    this.clearRecipe();
  }

  saveRecipe = recipe => {
    axios
      .post(`http://localhost:8080/n89sharma/recipe`, recipe)
      .then();
  }

  clearRecipe = () => {
    this.setState({
      recipe: new Recipe(),
      recipeName: '',
      recipeDescription: ''
    })
  }

  render() {
    const { recipe, recipeName, recipeDescription, recipeMeasure } = this.state;
    return (
      <div>

        <Grid container spacing={24}>
          <PortionComponent handleParentItemAdd={this.handleRecipeItemAddition} />
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
            <TextField
              label='Recipe Measure'
              value={recipeMeasure}
              onChange={this.handleRecipeMeasureChange}
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
              handleRecipeItemDeletion={this.handleRecipeItemDeletion}
            />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default AddRecipe;