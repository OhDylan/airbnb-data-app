import React from "react";
import "./SearchBar.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({query, setQuery, suggestions, setSuggestions}) => {

    const onChangeSearch = (e, newInputValue) => {
        setQuery(newInputValue);
    }

    return(
        <div className="search-container">
            {/* <div className="search-box">
                <input className="search-bar" placeholder="Search For Property Name" onChange={onChangeSearch} value={query}/>
                {suggestions.map((suggestion) => {
                    return(
                    <div key={suggestion.id} className="suggestion-box" onClick={() => setText(suggestion.name)}>
                        <p>{suggestion.name}</p>
                    </div>
                    )
                })}
            </div> */}
            <Autocomplete
                onInputChange={onChangeSearch}
                inputValue={query}
                disablePortal
                id="combo-box-demo"
                options={suggestions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Property Name" />}
            />
        </div>
    );
}

export default SearchBar