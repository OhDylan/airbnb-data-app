import React, {useState, useEffect} from "react";
import SearchBar from "../SearchBar/SearchBar";
import GoogleMapComponent from "../GoogleMap/GoogleMapComponent";
import Button from "../Button/Button";

const SearchBox = () => {

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
                if(result.length > 10)
                {
                    result = result.slice(0, 10)
                }
                setSuggestions(result)
            })
            .catch((err) => console.error(err))
        }
        else
        {
            setSuggestions([]);
        }
    }, [query, coordinates])

    const search = () => {
        console.log(query)
        console.log(coordinates)
    }
    
    return (
        <div>
            <SearchBar setQuery={setQuery} suggestions={suggestions} />
            <GoogleMapComponent setCoordinates={setCoordinates} />
            <Button callback={search} text="Search" />
        </div>
    )
}

export default SearchBox;