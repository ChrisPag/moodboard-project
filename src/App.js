import './css/App.css';
import Home from './components/Home.js';
import Moodboard from './components/Moodboard.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/moodboard" element ={<Moodboard />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
