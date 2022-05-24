import React, { useEffect, useState } from "react";
import JoblyApi from '../helpers/api';
import Job from "./Job";
import { v4 as uuidv4 } from 'uuid';

import Grid from '@mui/material/Grid';

export default function Jobs() {
    const [allJobs, setAllJobs] = useState([]);
    useEffect(() => {
        async function fetchJobs() {
            const response = await JoblyApi.getJobs();
            setAllJobs(response.jobs);
        };
        fetchJobs();
    }, [])


    return <>
        <Grid spacing={3} container>
            {allJobs.length === 0 ? "Loading..." : allJobs.map(c => {
                return <Job
                    id={c.id}
                    title={c.title}
                    companyName={c.companyName}
                    equity={c.equity}
                    salary={c.salary}
                    companyHandle={c.companyHandle}
                    key={uuidv4()}
                    gutterBottom />
            })}

        </Grid>
    </>
}

