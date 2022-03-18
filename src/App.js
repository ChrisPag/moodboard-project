import './css/App.css';
import Home from './components/Home.js';
import Moodboard from './components/Moodboard.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import React , { Component}  from 'react';

function App() {
  const [likes, setLikes] = useState();
 
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home updateLikes={likes =>setLikes(likes)} />}/>
          <Route path="/moodboard" element ={<Moodboard likes = {likes} key={likes} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;