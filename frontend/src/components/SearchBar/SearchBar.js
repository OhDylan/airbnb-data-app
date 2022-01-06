import React from "react";
import "./SearchBar.css";

const SearchBar = ({setQuery, suggestions}) => {

    const onChangeSearch = (e) => {
        setQuery(e.target.value);
    }

    return(
        <div className="search-container">
            <div className="search-box">
                <input className="search-bar" placeholder="Search For Property Name" onChange={onChangeSearch} />
                {suggestions.map((suggestion) => {
                    return(
                    <div key={suggestion.id} className="suggestion-box">
                        <p>{suggestion.name}</p>
                    </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SearchBar