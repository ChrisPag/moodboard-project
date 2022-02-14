import '../css/Content.css';
import useFetch from './useFetch';

const Home = ({query}) =>{

  const {data: imageData, isLoaded, errorMessage} = useFetch(
    "https://api.unsplash.com/search/photos/?page=1&query=" +
    query +
    "&client_id=" + 
    process.env.REACT_APP_ACCESS_KEY);

  return (
    <div className="Content">
        {imageData && isLoaded && 
          (imageData.map((image, i)=>(
            <div className="images" key={i}>
                <img src={image.urls.small}></img>
            </div>
        )))}

        {!isLoaded && !errorMessage && <p>Loading...</p>}
        {errorMessage && <p>
          {errorMessage}</p>}
      
    </div>
  );
}

export default Home;
