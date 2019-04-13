import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/TextField'
import Fuse from 'fuse.js';


const suggestions = [
];
const fuseOptions = {
  keys:[
    'label'
  ]
}
const fuse = new Fuse(suggestions, fuseOptions);

//teach autosuggest how to calculate suggestions
const getSuggestions = value => {
  fuse.search(value);
};

//get the value from the suggestion
const getSuggestionValue = suggestion => suggestion.label;

//render suggestion
const renderSuggestion = suggestion => (
  <div>
    {suggestion.label}
  </div>
)

function InputComponent(){
  return (
    <TextField/>
  );
}

class SearchFoodItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange = (event, {newValue}) => {this.setState({value:newValue});};

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({suggestions: getSuggestions(value)});
  };

  onSuggestionsClearRequested = () => {
      this.setState({suggestions: []});
  };

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Search a food item',
      value,
      onChange: this.onChange
    }

    return(
      <Autosuggest
        InputComponent
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default SearchFoodItems;