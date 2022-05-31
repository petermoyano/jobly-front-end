import React, { useEffect, useState } from "react";
import JoblyApi from '../api/api';
import Job from "./Job";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';


export default function FilteredCompanyJobs() {
    const [CompanyInfo, setCompanyInfo] = useState([]);
    const { companyHandle } = useParams();

    useEffect(() => {
        async function fetchJobs() {
            const response = await JoblyApi.getCompany(companyHandle);
            setCompanyInfo(response.company);
        };
        fetchJobs();
    }, [companyHandle])


    return <>
        {CompanyInfo.length === 0 ? "Loading..." 
        :
                <div>
                    <h1>{CompanyInfo.name}</h1>
                    <h4>{CompanyInfo.description}</h4>
                    <h5>Number of employees: {CompanyInfo.numEmployees}</h5>
                </div>}
        <Grid spacing={3} container>
            {CompanyInfo.length === 0 ? "Loading..." : CompanyInfo.jobs.map(c => {
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

