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
