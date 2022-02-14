import '../css/Home.css';
import useFetch from './useFetch';

const Home = ({query}) =>{

  const {data: imageData, isLoaded} = useFetch(
    "https://api.unsplash.com/search/photos/?page=1&query=" +
    query +
    "&client_id=" + 
    process.env.REACT_APP_ACCESS_KEY);


  return (
    <div className="Home">

      <button id="create">Create!</button>
        {imageData && isLoaded &&
          (imageData.map((image, i)=>(
            <div className="images" key={i}>
                <img src={image.urls.small}></img>
            </div>
        )))}
      
    </div>
  );
}

export default Home;
