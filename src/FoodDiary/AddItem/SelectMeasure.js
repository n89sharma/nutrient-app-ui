import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class SelectMeasure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measureMenuVisible: false,
      selectedMeasureName: ''
    };
    this.handleMeasureSelection = this.handleMeasureSelection.bind(this);
  }

  renderMeasureMenuOption(measure) {
    return (
      <MenuItem
        key={measure.measureName}
        value={measure.measureName}
      >
        {measure.measureName}
      </MenuItem>
    );
  }

  handleMeasureSelection = event => {
    const selectedMeasureName = event.target.value;
    const selectedMeasure = this.props.measures
      .find(measure => measure.measureName == selectedMeasureName );
    this.setState({selectedMeasureName: selectedMeasureName});
    this.props.onMeasureSelection(selectedMeasure);
  }

  render() {
    const { selectedMeasureName } = this.state;
    const { measures } = this.props;
    return (
      <div>
        <TextField
          select
          value={ selectedMeasureName }
          label='Select Measure'
          onChange={this.handleMeasureSelection}
        >
          {
            measures.map(measure => this.renderMeasureMenuOption(measure))
          }
        </TextField>
      </div>
    );
  }
}

export default SelectMeasure;