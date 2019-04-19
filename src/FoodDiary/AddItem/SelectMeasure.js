import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

class SelectMeasure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measureOptions: [],
      isLoading: false
    };
    this.setMeasureOptions(this.props.foodId);
  }

  setMeasureOptions = (foodId) => {
    axios
     .get(`http://localhost:8080/food/${foodId}/measure`)
     .then(response => {
       this.setState({
         measureOptions: response.data.map(measureData => measureData.measureName)
        });
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

  render() {
    return (
      <div>
        <Button>
          Select Measure...
        </Button>
      </div>
    );
  }
}

export default SelectMeasure;