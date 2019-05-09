import React from 'react'
import axios from 'axios'
import { TextField, Grid, Button } from '@material-ui/core';
import SearchFoodItems from './SearchFoodItems';
import SelectMeasure from './SelectMeasure';

class PortionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      items: [{ id: null, description: null }],
      itemSearchValue: '',
      selectedItem: {},
      measures: [],
      selectedMeasure: {},
      selectedServing: ''
    }

    this.clearUserSelection = this.clearUserSelection.bind(this)
    this.handleMeasureSelection = this.handleMeasureSelection.bind(this)
    this.handleItemSearchInputChange = this.handleItemSearchInputChange.bind(this)
    this.handleServingChange = this.handleServingChange.bind(this)
    this.handleItemSelection = this.handleItemSelection.bind(this)
    this.handleItemAdd = this.handleItemAdd.bind(this)
  }

  componentDidMount() {
    this.getFoodItems()
  }

  getFoodItems() {
    axios
      .get('http://localhost:8080/n89sharma/food')
      .then(response => {
        console.log('response.data')
        this.setState({
          items: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  getMeasure(selectedItem) {
    let url = ''
    switch (selectedItem.itemType) {
      case 'FOOD':
        url = `http://localhost:8080/food/${selectedItem.id}/measure`
        break
      case 'RECIPE':
        url = `http://localhost:8080/n89sharma/recipe/${selectedItem.id}/measure`
        break
    }
    axios
      .get(url)
      .then(response => {
        this.setState({
          selectedItem: selectedItem,
          measures: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleItemAdd = () => {
    const { selectedItem, selectedMeasure, selectedServing } = this.state
    const { handleParentItemAdd } = this.props

    let url = ''
    switch (selectedItem.itemType) {
      case 'FOOD':
        url = `http://localhost:8080/food/${selectedItem.id}?measureId=${selectedMeasure.measureId}&serving=${selectedServing}`
        break
      case 'RECIPE':
        url = `http://localhost:8080/n89sharma/recipe/${selectedItem.id}?serving=${selectedServing}`
        break
    }
    axios
      .get(url)
      .then(response => {
        const selectedItemDetails = response.data
        handleParentItemAdd(selectedItemDetails, selectedMeasure, selectedServing)
        this.clearUserSelection();
      })
      .then(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  clearUserSelection = () => {
    this.setState({
      itemSearchValue: '',
      selectedFoodItem: {},
      measures: [],
      selectedMeasure: {},
      selectedServing: ''
    });
  };

  handleItemSearchInputChange = (event, { newValue }) => {
    this.setState({ itemSearchValue: newValue })
  }

  handleServingChange = event => {
    if (!isNaN(event.target.value)) {
      this.setState({ selectedServing: event.target.value })
    }
  }

  handleItemSelection = selectedItem => {
    this.getMeasure(selectedItem)
  }

  handleMeasureSelection = selectedMeasure => {
    this.setState({ selectedMeasure: selectedMeasure });
  }

  render() {
    const { items, measures, itemSearchValue, selectedServing } = this.state
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item>
            <SearchFoodItems
              items={items}
              itemSearchValue={itemSearchValue}
              handleItemSearchInputChange={this.handleItemSearchInputChange}
              handleItemSelection={this.handleItemSelection}
            />
          </Grid>

          <Grid item>
            <SelectMeasure
              measures={measures}
              onMeasureSelection={this.handleMeasureSelection}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Serving'
              value={selectedServing}
              onChange={this.handleServingChange}
            />
          </Grid>

          <Grid item>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleItemAdd}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default PortionComponent
