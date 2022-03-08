import './css/App.css';
import Home from './components/Home.js';
import Moodboard from './components/Moodboard.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  const [likes, setLikes] = useState();
 
  return (
    
    <Router>
      <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home updateLikes={likes =>setLikes(likes)} />}/>
          <Route path="/moodboard" element ={<Moodboard likes = {likes} />}/>
        </Routes>
      </div>
      </DndProvider>
    </Router>
  );
}

export default App;