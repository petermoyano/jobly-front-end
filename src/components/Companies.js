import React, { useEffect, useState } from "react";
import JoblyApi from '../helpers/api';
import { v4 as uuidv4 } from 'uuid';

export default function Companies() {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        function fetchCompanies() {
            JoblyApi.getCompanies().then((response) => {
                setCompanies(response.companies)
                console.log(companies)
            });
        }
        fetchCompanies();
    }, [])

    return <>
        <ul>
            {companies.map(c => { return <li>{c.name}</li> })}
        </ul>
    </>
}

