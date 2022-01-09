import React, {useEffect, useState} from "react";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SearchBar from "../../components/SearchBar/SearchBar";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import PropertyCard from "../../components/Card/PropertyCard";

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 40.730610,
        lng: -73.935242
    });
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

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
                let returnSuggestions = []
                result.forEach(property => {
                    returnSuggestions.push(property.name)
                });
                setSuggestions(returnSuggestions);
            })
            .catch((err) => console.error(err))
        }
        else
        {
            setSuggestions([]);
        }
    }, [query, coordinates])

    const search = () => {
        setResults([]);
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
            if(result.length > 18)
            {
                result = result.slice(0, 18);
            }
            setResults(result);
            setSearched(true);
        })
        .catch((err) => console.error(err));
    }
    
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} alignItems="center" justifyContent="center" >
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={6}>
                    <SearchBar query={query} setQuery={setQuery} suggestions={suggestions} setSuggestions={setSuggestions} />
                </Grid>
                <Grid item xs={12} sm={2} >
                    <Button endIcon={<LocationSearchingIcon />} onClick={search} variant="contained" color="error" size="large" sx={{margin: '10px 0', background: 'linear-gradient(to left, #8A2BE2, #9932CC)', fontSize: '1rem' }} >Search</Button>   
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                    <GoogleMapComponent coordinates={coordinates} setCoordinates={setCoordinates} />
                    <Typography variant="subtitle2">Please right click to select the desired location on map.</Typography>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
                {results.length > 0 && results.map((result) => {
                    if(result.summary.length > 100)
                    {
                        result.summary = result.summary.slice(0, 99) + "...";
                    }
                    return (
                        <PropertyCard result={result} />
                    )
                })}
                {searched && results.length === 0 && (
                    <>
                        <Grid item xs={0} sm={2} ></Grid>
                        <Grid item xs={12} sm={8}>
                            <Card sx={{width: 1, color: "white", backgroundColor: "black"}}>
                                <CardContent >
                                    <Typography variant="button">Oops! Nothing was found...</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={0} sm={2}></Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
}

export default SearchPage;