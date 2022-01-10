import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./LandingPage.css";

const ResultCard = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '900px',
    position: 'relative',
    color: '#E6E6FA',
    backgroundColor: 'rgb(0,0,0)'
}))


const LandingPage = () => {
    return (
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={0} sm={1}></Grid>
                <Grid item xs={12} sm={9}>
                    <ResultCard>
                        <CardContent>
                            <Typography variant="h4" >Airbnb Sample App</Typography>
                        </CardContent>
                        <CardMedia component="img" height="65%" image={require("../../assets/10751.jpg")} alt="Property Image" />
                        <CardContent >
                            <Typography gutterBottom variant="subtitle1" component="div" textAlign="left">
                                Please note that this is only a demo app where all the test data is derived from MongoDB's sample data set.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div>
                                <Button size="large" variant="contained" style={{position: "absolute", bottom: "10px", right: "10px", background: 'linear-gradient(to left, #8A2BE2, #9932CC)', fontSize: '1rem'}} href="/searchproperty" >Explore Now</Button>
                            </div>
                        </CardActions>
                    </ResultCard>
                </Grid>
                <Grid item xs={0} sm={1}></Grid>
            </Grid>     
    )
}

export default LandingPage;