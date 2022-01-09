import React, {useEffect, useState} from "react";
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import SearchBar from "../../components/SearchBar/SearchBar";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";

const ResultCard = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '300px',
    position: 'relative',
    backgroundColor: 'rgb(245,245,250)'
}))

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
        setResults([])
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
                if(result.length > 18)
                {
                    result = result.slice(0, 18)
                }
                setResults(result)
            })
            .catch((err) => console.error(err))
    }
    
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} alignItems="center" justifyContent="center" >


                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={6}>
                    <SearchBar query={query} setQuery={setQuery} suggestions={suggestions} setSuggestions={setSuggestions} />
                </Grid>
                <Grid item xs={2} >
                    <Button endIcon={<LocationSearchingIcon />} onClick={search} variant="contained" color="error" size="large" sx={{margin: '10px 0', background: 'linear-gradient(to left, #8A2BE2, #9932CC)', fontSize: '1rem' }} >Search</Button>   
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12} sm={8} justifyContent="center" >
                    <GoogleMapComponent coordinates={coordinates} setCoordinates={setCoordinates} />
                    <Typography variant="subtitle2">Please right click to select the desired location on map.</Typography>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>


                {results.length > 0 && results.map((result) => {

                    if(result.summary.length > 100)
                    {
                        result.summary = result.summary.slice(0, 99) + "..."
                    }

                    return (<Grid item xs={12} sm={6} md={4}>
                        <ResultCard>
                            <CardActionArea>
                                <CardMedia component="img" height="150" image={result.images.picture_url} alt="Property Image" />
                                <CardContent height="200px">
                                    <Typography gutterBottom variant="subtitle1" component="div" textAlign="left">
                                        {result.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign="left">
                                        {result.summary}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <div style={{float: "left"}}>
                                <Typography variant="button" color="text.secondary" style={{position: "absolute", bottom: "2px"}} >
                                    &#36;{result.price.$numberDecimal} / Night
                                </Typography>
                            </div>
                        </ResultCard>
                    </Grid>)
                })}
            </Grid>
        </Box>
    )
}

export default SearchPage;