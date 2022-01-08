import React from "react";
import "./SearchBar.css";

const SearchBar = ({query, setQuery, suggestions, setSuggestions}) => {

    const onChangeSearch = (e) => {
        setQuery(e.target.value);
    }

    const setText = (name) => {
        setQuery(name);
        setSuggestions([])
    }

    return(
        <div className="search-container">
            <div className="search-box">
                <input className="search-bar" placeholder="Search For Property Name" onChange={onChangeSearch} value={query}/>
                {suggestions.map((suggestion) => {
                    return(
                    <div key={suggestion.id} className="suggestion-box" onClick={() => setText(suggestion.name)}>
                        <p>{suggestion.name}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SearchBar