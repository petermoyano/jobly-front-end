import './App.css';
import Companies from './components/Companies';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


function App() {
  
  

  return (
    <div className="App">
      <Container>
      <Typography variant="h1" gutterBottom>Peter's Jobly app</Typography>
      <Companies />
      </ Container>
    </div>
  );
}

export default App;
