
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



function Company({company}) {

    console.log(company)

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {company.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {company.numEmployees} employees
                </Typography>
                <Typography variant="body2">
                    {company.description}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">+ Info</Button>
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