import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SearchBar from "../../components/SearchBar/SearchBar";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import "./SearchPage.css";

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 40.730610,
        lng: -73.935242
    });
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);

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
                if(result.length > 10)
                {
                    result = result.slice(0, 10)
                }
                let returnSuggestions = []
                result.forEach(property => {
                    returnSuggestions.push(property.name)
                });
                
                setSuggestions(returnSuggestions)
            })
            .catch((err) => console.error(err))
        }
        else
        {
            setSuggestions([]);
        }
    }, [query, coordinates])

    const search = () => {
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
                if(result.length > 10)
                {
                    result = result.slice(0, 10)
                }
                setResults(result)
                clearSuggestions();
            })
            .catch((err) => console.error(err))
    }

    const clearSuggestions =() => {
        setSuggestions([])
    }
    
    return (
        <div onClick={clearSuggestions}>
            <div>
                <h1>Search Page</h1>
            </div>
            <div className="search-container">
                <SearchBar query={query} setQuery={setQuery} suggestions={suggestions} setSuggestions={setSuggestions} />
                <GoogleMapComponent setCoordinates={setCoordinates} />
                <Button endIcon={<LocationSearchingIcon />} onClick={search} variant="contained" color="primary" >Search</Button>
            </div>
            <div>
                {results.map((result) => {
                    return <p>{result.name}</p>
                })}
            </div>
        </div>
    )
}

export default SearchPage;