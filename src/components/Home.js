/* This file is a container for the search bar,
search results (content) and button to link
to the moodboard creation page*/

import '../css/Home.css';
import Search from './Search.js'
import {NavLink} from 'react-router-dom';

function Home() {

  return (
    <div className="Home">
      <button id="create">
        <NavLink to="/moodboard">Create Moodboard
        </NavLink>
      </button>

      <Search />
    </div>
  );
}

export default Home;
