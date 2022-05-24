import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function Job({ id, title, companyName, equity, salary, companyHandle }) {

    const card = (
        <>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Job posting number { }
                </Typography>
                <Typography variant="h5" component="div">
                    {companyName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {salary}
                </Typography>
                <Typography variant="body2">
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Apply</Button>
            </CardActions>
        </>
    );


    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

export default Job;