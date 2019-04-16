import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Fuse from 'fuse.js';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  });

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
        <MenuItem component="div">
            <div>
                <span>
                    {suggestion.label}
                </span>
            </div>
        </MenuItem>
    );
}

class SearchFoodItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        }

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    renderInputComponent(props) {
        const { inputRef = () => {}, ref, ...other } = props;

        return (
            <TextField
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                      }
                }}
                {...other}
            />
        );
    }

    renderSuggestionsContainer({ containerProps, children, query }) {
        return (
            <Paper
                open={!!children}
                {...containerProps}
            >
                {children}
            </Paper>
        )
    }

    render() {
        const { classes } = this.props;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search a food item',
            value: value,
            onChange: this.onChange
        }
        const theme = {
            suggestionsList: classes.suggestionsList
        }

        return (
            <Autosuggest
                renderInputComponent={this.renderInputComponent}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
            />
        )
    }
}

export default withStyles(styles)(SearchFoodItems);