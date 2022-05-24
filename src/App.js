import './App.css';
import Companies from './components/Companies';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';


function App() {



  return (
    <div className="App">
      <Container>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />>
          </Routes>
        </BrowserRouter>
      </ Container>
    </div>
  );
}

export default App;
