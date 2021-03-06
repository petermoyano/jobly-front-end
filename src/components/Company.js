import * as React from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



function Company({ name, handle, description, numEmployees, logoUrl }) {

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {numEmployees} employees
                </Typography>
                <Typography variant="body2">
                    Company description: {description}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/companies/${handle}`}>
                    <Button size="small">See job postings</Button>
                </Link>
            </CardActions>
        </React.Fragment>
    );


    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Box>
                <Card variant="outlined">{card}</Card>
            </Box>
        </ Grid>
    );
}

export default Company;