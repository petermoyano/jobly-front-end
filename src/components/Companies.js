import React, { useEffect, useState } from "react";
import JoblyApi from '../helpers/api';
import Company from "./Company";
import { v4 as uuidv4 } from 'uuid';

import Grid from '@mui/material/Grid';

export default function Companies() {
    const [allCompanies, setAllCompanies] = useState([]);
    useEffect(() => {
        async function fetchCompanies() {
            const response = await JoblyApi.getCompanies()
            setAllCompanies(response.companies);
        };
        fetchCompanies();
    }, [])

    return <>
        <Grid spacing={3} container>

            {allCompanies.length === 0 ? "Loading..." : allCompanies.map(c => {
                return <Company
                    name={c.name}
                    description={c.description}
                    handle={c.handle}
                    numEmployees={c.numEmployees}
                    logoUrl={c.logoUrl}
                    key={uuidv4()}
                    gutterBottom />
            })}

        </Grid>
    </>
}

