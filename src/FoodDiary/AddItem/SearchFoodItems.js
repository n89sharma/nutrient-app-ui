import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Fuse from 'fuse.js';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' }
];

const fuseOptions = {
    keys: [
        'label'
    ]
}
const fuse = new Fuse(suggestions, fuseOptions);

//teach autosuggest how to calculate suggestions
const getSuggestions = value => {
    return fuse.search(value);
};

//get the value from the suggestion
const getSuggestionValue = suggestion => suggestion.label;

//render suggestion
function renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
        <MenuItem
            key={suggestion.label}
        >
            {suggestion.label}
        </MenuItem>
    );
}



function InputComponent(props) {
    return (
        <TextField
            onChange={props.onChange}
        />
    );
}

function renderSuggestionsContainer({ containerProps , children, query }) {

    return (
        <Menu
            open={!!children}
            anchorEl={this.inputNode}
            {...containerProps}
        >
            {children}
        </Menu>
    )
}

class SearchFoodItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: getSuggestions(value) });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search a food item',
            value: value,
            onChange: this.onChange,
            inputRef: node => {
                this.inputNode = node;
            }
        }
        console.log(renderSuggestion);

        return (
            <Autosuggest
                renderInputComponent={InputComponent}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                alwaysRenderSuggestions={true}
                inputProps={inputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
            />
        )
    }
}

export default SearchFoodItems;