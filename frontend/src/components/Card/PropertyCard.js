import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResultCard = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '450px',
    position: 'relative',
    backgroundColor: 'rgb(245,245,250)'
}))

const PropertyCard = ({result}) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ResultCard>
                <CardActionArea>
                    <CardMedia component="img" height="300" image={result.images.picture_url} alt="Property Image" />
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
        </Grid>
    )
}

export default PropertyCard;