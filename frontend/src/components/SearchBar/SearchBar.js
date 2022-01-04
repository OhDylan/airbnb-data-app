import React, { useState, useEffect } from "react";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if(query !== "")
        {
            let requestBody = {
                "query": query,
                "position": {
                    "lng": -74.0060,
                    "lat": 40.7128 
                }
            }
    
            fetch("http://localhost:5000/search", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setSuggestions(result)
            })
            .catch((err) => console.error(err))
        }
        else
        {
            setSuggestions([]);
        }
    }, [query])

    const onChangeSearch = (e) => {
            setQuery(e.target.value);
    }

    return(
        <div className="search-container">
            <input placeholder="Search For Property Name" onChange={onChangeSearch} />
            {suggestions.map((suggestion) => {
                return(
                <div key={suggestion.id}>
                    <p>{suggestion.name}</p>
                </div>
                )
            })}
            <div id="map"></div>
        </div>
    );
}

export default SearchBar