import './css/App.css';
import Home from './components/Home.js';
import Moodboard from './components/Moodboard.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [word, setWord] = useState();
  console.log(word)
  return (
    <Router>
    <div className="App">
      
      <Routes>
        <Route exact path="/" element=
          {<Home changeWord={word =>setWord(word)} />}
        />
        <Route path="/moodboard" element ={<Moodboard />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
