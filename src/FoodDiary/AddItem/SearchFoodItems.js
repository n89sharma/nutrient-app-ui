import React from 'react';
import Autosuggest from 'react-autosuggest';
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

const fuseOptions = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        "foodDescription"
    ]
}

//get the value from the suggestion
const getSuggestionValue = suggestion => suggestion.foodDescription;

//render suggestion
function renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
        <MenuItem component="div">
            <div>
                <span>
                    {suggestion.foodDescription}
                </span>
            </div>
        </MenuItem>
    );
}

class SearchFoodItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        }
        
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
        this.fuse = new Fuse(this.props.foodItems, fuseOptions);
    }

    //teach autosuggest how to calculate suggestions
    getSuggestions = value => {
        return this.fuse.search(value);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    onSuggestionSelected = (event, args) => {
        const { suggestion, ...other} = args;
        this.props.onFoodItemSelection(suggestion);
    }

    renderInputComponent(props) {
        const { inputRef = () => { }, ref, ...other } = props;
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
        const { foodItems, classes, onFoodItemSearchInputChange, foodItemSearchValue } = this.props;
        const { suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search a food item',
            value: foodItemSearchValue,
            onChange: onFoodItemSearchInputChange,
            label: 'Search'
        }
        const theme = {
            suggestionsList: classes.suggestionsList
        }

        return (
            <Autosuggest
                renderInputComponent={this.renderInputComponent}
                suggestions={suggestions.slice(0,5) }
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
            />
        )
    }
}

export default withStyles(styles)(SearchFoodItems);