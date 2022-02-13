import '../css/Home.css';
import Search from './Search.js'

function Home() {
  return (
    <div className="Home">
      <Search />
      <button id="create">Create!</button>
    </div>
  );
}

export default Home;
