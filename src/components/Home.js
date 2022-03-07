/* This file is a container for the search bar,
search results (content) and button to link
to the moodboard creation page*/
import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

function Home(props) {
  let [page, setPage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [imageGroup, setImageGroup] = useState();
  const [likedImages, setLikedImages] = useState([]);

  const red = 'red.png';
  const white = 'white.png';

  /*Set up masonry when images load*/
  const gridRef = useRef();
  const masonry = new Masonry(gridRef.current, {
    isFitWidth: true,  
  });

  imagesLoaded( gridRef.current ).on( 'progress', function() {
    // layout Masonry after each image loads
    masonry.layout();
  });

  /* Fetch the data using the user's query */
  const url =
  `https://api.unsplash.com/search/photos/?page=${page}
  &query=${query}
  &client_id=${
  process.env.REACT_APP_ACCESS_KEY}`

  const {data: imageData, isLoaded, errorMessage, numPosts} = useFetch(url);

  /*window.onscroll = function(ev) {
    //const bottom = ev.target.scrollHeight - ev.target.scrollTop === ev.target.clientHeight;
    if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight) {
      infiniteScroll()
  }
      
  };

  function infiniteScroll(){
      setPage((oldPage) => {
          return oldPage + 1;
      });
      console.log(page);
  }*/

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput);
    setShowButton(!showButton);
  }

  const showMore = () =>{
    setPage(++page);
  }

  /* This code changes like button text, adds/removes liked images to array
  ** likedArray is the initial array with heart image src values
  ** liked holds the heart image src values
  ** likedImages holds the actual image src values
  */
  const likedArray = new Array(numPosts).fill(white);
  const [liked, setLiked] = useState([]);

  useEffect(()=>{
    setLiked(likedArray);
    setImageGroup(imageData.results);
  },[numPosts, imageData, query])
  
  useEffect(()=>{
      setLikedImages(likedImages);
      console.log(likedImages);
  }, [liked])

  const handleClick = (index) =>{
    let newArray = [...liked];

    if(newArray[index]===red){
      newArray[index] = white;
      setLikedImages(likedImages.filter(likedImages => likedImages !== imageGroup[index].urls.small))
    }
    else{
      newArray[index] = red;
      setLikedImages(theArray => [...theArray, imageGroup[index].urls.small]);
    }
    setLiked(newArray);
  }

  return (
    <div className="Home">
      <div className="homeHeader">
        <img className="logo" src="logo.png"></img>
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
              <span><button className='likeButton' onClick={()=>handleClick(i)}> <img className="heart" src={liked[i]}></img> </button></span>
          </div>
        )))}
        </div>

        {!isLoaded && !errorMessage && <p>Loading...</p>}
        {errorMessage && <p> {errorMessage}</p>}

        {query && <button onClick = {showMore} id="nextPage" className="btn">Next Page</button>}
      </div>
    </div>
  );
}

export default Home;