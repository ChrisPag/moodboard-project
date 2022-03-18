/* This file is a container for the search bar, search results (content) and button 
to link to the moodboard creation page*/
import '../css/Home.css';
import '../css/Modal.css';
import React from 'react';
import useFetch from './useFetch';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import IntroModal from './IntroModal';

function Home(props) {
  let [page, setPage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  
  /*** Set up masonry when images load ***/
  const gridRef = useRef();
  const masonry = new Masonry(gridRef.current, {
    isFitWidth: true, 
    transitionDuration: 0 
  });

  imagesLoaded( gridRef.current ).on( 'progress', function() {
    /*layout Masonry after each image loads*/
    masonry.layout();
  });

  /*** Refresh page when logo is clicked ***/
  function refreshPage() {
    window.location.reload(false);
  }

  /*** Fetch the data using the user's query ***/
  const url =
  `https://api.unsplash.com/search/photos/?page=${page}&per_page=25&query=${query} &client_id=${
  process.env.REACT_APP_ACCESS_KEY}`

  const {data: imageData, isLoaded, errorMessage, numPosts} = useFetch(url);
  const [imageGroup, setImageGroup] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
    setPage(1);
  }

  /*** Showing "popular" query on window load ***/
  useEffect(() => {
    setQuery("colourful");
  }, []);

  /*** Handle results pages ***/
  const nextPage = () =>{
    setPage(++page);
  }

  const prevPage = () =>{
    if(page>=2){
      setPage(--page);
    }
  }

  /** Change like button text, adds/removes liked images to array
  *** likedArray is the initial array with heart image src values
  *** liked holds the heart image src values
  *** likedImages holds the actual image src values ***/
  const red = 'red.png';
  const white = 'white.png';
  const [likedImages, setLikedImages] = useState([]);
  const likedArray = new Array(numPosts).fill(white);
  const [liked, setLiked] = useState([]);

  useEffect(()=>{
    setLiked(likedArray);
    setImageGroup(imageData.results);
  },[numPosts, imageData, query])
 
  useEffect(()=>{
      setLikedImages(likedImages);
  }, [liked])

  const handleClick = (index) =>{
    let newArray = [...liked];
    if(newArray[index]===red){
      newArray[index] = white;
      setLikedImages(likedImages.filter(likedImages => likedImages.url !== 
        imageGroup[index].urls.small))
    }
    else{
      newArray[index] = red;
      setLikedImages(theArray => [...theArray, {
        url: imageGroup[index].urls.small,
        alt: imageGroup[index].alt_description
      }]);
    }
    setLiked(newArray);
  }

  return (
    <div className="Home">
      <div className="homeHeader">
        <img className="logo" src="logo.png" onClick={refreshPage}></img>
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
        <button  id="create" className="btn" onClick = {()=> props.updateLikes(likedImages)}>
          <Link to="/moodboard">Create Moodboard</Link>
        </button>
      </div>
        
      <div className="Content">
        <div className="grid" ref={gridRef}>
        {imageData && isLoaded && 
          (imageGroup.map((image, i)=>(
          <div  key={i}>
              <img  className="images" src={image.urls.small} alt={image.alt_description} ></img>
              <span><button className='likeButton' onClick={()=>handleClick(i)}> <img className="heart" alt="like button" src={liked[i]}></img> </button></span>
          </div>
        )))}
        </div>

        {!isLoaded && !errorMessage && <p>Loading...</p>}
        {errorMessage && <p> {errorMessage}</p>}

        {query && <button onClick = {nextPage} id="nextPage" className="btn">Next</button>}
        {query && page>=2 &&
         <button onClick = {prevPage} id="prevPage" className="btn">Previous</button>}
      </div>
      <IntroModal /> 
    </div>
  );
}

export default Home;