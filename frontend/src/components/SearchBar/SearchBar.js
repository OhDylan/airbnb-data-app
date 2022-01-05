import React, { useState, useEffect } from "react";
import GoogleMapComponent from "../GoogleMap/GoogleMapComponent";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 40.730610,
        lng: -73.935242
    });
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if(query !== "")
        {
            let requestBody = {
                "query": query,
                "position": {
                    "lat": coordinates.lat,
                    "lng": coordinates.lng 
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
    }, [query, coordinates])

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
            <GoogleMapComponent setCoordinates={setCoordinates} />
            {Object.values(coordinates).forEach(value => {
                return(<p>{value}</p>)
            })}
        </div>
    );
}

export default SearchBar