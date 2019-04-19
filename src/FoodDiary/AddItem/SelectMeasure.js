import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

class SelectMeasure extends React.Component {
  constructor(props) {
    super(props);
    this.setMeasureOptions(this.props.foodId);
  }

  setMeasureOptions = (foodId) => {
    console.log(`asdf ${foodId}`);
    //axios
    //  .get('http://localhost:8080/food')
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