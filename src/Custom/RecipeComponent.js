import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import RecipeTable from './RecipeTable';
import Recipe from './Recipe';
import PortionComponent from '../Portion/PortionComponent';
import Loader from '../Utils/Loader'

class RecipeComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
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
      recipeDescription: '',
      recipeMeasure: ''
    })
  }

  handlePortionComponentLoadStart = () => {
    this.setState({ isLoading: true })
  }

  handlePortionComponentLoadFinish = () => {
    this.setState({ isLoading: false })
  }

  canSave = () => {
    const {
      recipe,
      recipeName,
      recipeDescription,
      recipeMeasure,
      isLoading } = this.state;
    return recipe.portions.length &&
      recipeName &&
      recipeDescription && 
      recipeMeasure && 
      !isLoading
  }

  render() {
    const {
      recipe,
      recipeName,
      recipeDescription,
      recipeMeasure,
      isLoading } = this.state;

    return (
      <div style={{ padding: 24 }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={24}
        >
          <Grid item>
            <Loader isLoading={isLoading} />
          </Grid>
          <Grid item>
            <PortionComponent
              handleParentItemAdd={this.handleRecipeItemAddition}
              onPortionComponentLoadStart={this.handlePortionComponentLoadStart}
              onPortionComponentLoadFinish={this.handlePortionComponentLoadFinish}
            />
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={24}
          >
            <Grid item>
              <TextField
                label='Recipe Name'
                value={recipeName}
                onChange={this.handleRecipeNameChange}
                disabled={isLoading}
              />
            </Grid>

            <Grid item>
              <TextField
                label='Recipe Description'
                value={recipeDescription}
                onChange={this.handleRecipeDescriptionChange}
                disabled={isLoading}
              />
            </Grid>

            <Grid item>
              <TextField
                label='Recipe Measure'
                value={recipeMeasure}
                onChange={this.handleRecipeMeasureChange}
                disabled={isLoading}
              />
            </Grid>

            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={this.handleRecipeSave}
                disabled={!this.canSave()}
              >
                Save Recipe
              </Button>
            </Grid>
          </Grid>

          <Grid item>
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

export default RecipeComponent;