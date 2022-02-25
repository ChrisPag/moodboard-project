/* This file is a container for the search bar,
search results (content) and button to link
to the moodboard creation page*/
import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Masonry from 'masonry-layout';

function Home(props) {
  let [page, setPage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [imageGroup, setImageGroup] = useState();
  const [likedImages, setLikedImages] = useState([]);

  const grid = document.querySelector('.grid');
  const masonry = new Masonry(grid);

  /* Fetch the data using the user's query */
  const url =
  `https://api.unsplash.com/search/photos/?page=${page}
  &query=${query}
  &client_id=${
  process.env.REACT_APP_ACCESS_KEY}`

  const {data: imageData, isLoaded, errorMessage, numPosts} = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
    setShowButton(!showButton);
  }

  const removeResults = () =>{
    setQuery("");
    setShowButton(false);
  }

  const showMore = () =>{
    setPage(++page);
  }

  /* Change like button text, add/remove liked images to array*/
  const likedArray = new Array(numPosts).fill('Like');
  const [liked, setLiked] = useState([]);

  useEffect(()=>{
    setLiked(likedArray);
    setImageGroup(imageData.results);

    if(query===""){
      setLikedImages([]);
    }
  },[numPosts, imageData, query])
  
  useEffect(()=>{
      setLikedImages(likedImages);
      console.log(likedImages);
  }, [liked])

  const handleClick = (index) =>{
    let newArray = [...liked];
  
    if(newArray[index]==='Like'){
      newArray[index] = 'Unlike';
      setLikedImages(oldArray => [...oldArray, imageGroup[index].urls.small]);
    }
    else{
      newArray[index] = 'Like';
      setLikedImages(likedImages.filter(likedImages => likedImages !== imageGroup[index].urls.small))
    }
    setLiked(newArray);
  }

  return (
    <div className="Home">
      <button id="create" onClick = {()=> props.updateLikes(likedImages)}>
        <Link to="/moodboard">Create Moodboard</Link>
      </button>

      <div className="Search">
        <form onSubmit = {handleSubmit}>
            <input type ="text"
            placeholder="Search..."
            value = { userInput }
            onChange={(e) => setUserInput(e.target.value)}
            className="searchInput"
            ></input>
            <button className="submit" type="submit">Go</button>
        </form>
      </div>

      {showButton && <button id="removeResults" onClick = {removeResults}>Clear</button>}

      <div className="Content">
        <div className="grid">
        {imageData && isLoaded && 
          (imageGroup.map((image, i)=>(
          <div className="images" key={i}>
            <img src={image.urls.small} alt={image.alt_description}></img>
            <button onClick={()=>handleClick(i)}>{liked[i]}</button>
          </div>
        )))}
        </div>

        {!isLoaded && !errorMessage && <p>Loading...</p>}
        {errorMessage && <p> {errorMessage}</p>}

        {query && <button onClick = {showMore}>Next Page</button>}
      </div>
    </div>
  );
}

export default Home;