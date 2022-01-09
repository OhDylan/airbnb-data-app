import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({query, setQuery, suggestions, setSuggestions}) => {

    const onChangeSearch = (e, newInputValue) => {
        setQuery(newInputValue);
    }

    return(
        <div className="search-container">
            <Autocomplete
                onInputChange={onChangeSearch}
                inputValue={query}
                disablePortal
                autoHighlight
                id="combo-box-demo"
                options={suggestions}
                sx={{ width: 1 , backgroundColor:"white" }}
                renderInput={(params) => <TextField {...params} label="Property Name" />}
            />
        </div>
    );
}

export default SearchBar