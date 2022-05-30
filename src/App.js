import './App.css';
import Companies from './components/Companies';
import Jobs from './components/Jobs'
import Container from '@mui/material/Container';
import Home from './components/Home';
import Navbar from './components/Navbar';
import FilteredCompanyJobs from './components/FilteredCompanyJobs';
import SignInSide from './components/SignInSide';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {


  
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignInSide />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:companyHandle" element={<FilteredCompanyJobs />} />
            <Route path="/jobs" element={<Jobs />} />
            {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}
          </Routes>
        </BrowserRouter>
      </ Container>
    </div>
  );
}

export default App;
