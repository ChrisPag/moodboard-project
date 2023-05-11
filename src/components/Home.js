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
  let [resultNum, setResultNum] = useState();
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [showNums, setShowNums] = useState(false);
  
  /*** Set up masonry when images load ***/
  const gridRef = useRef();

  if(gridRef.current){
    const masonry = new Masonry(gridRef.current, {
      isFitWidth: true, 
      transitionDuration: 0 
    });
  
    imagesLoaded( gridRef.current ).on( 'progress', function() {
      /*layout Masonry after each image loads*/
      masonry.layout();
    });
  }
  
  /*** Refresh page when logo is clicked ***/
  function refreshPage() {
    window.location.reload(false);
  }

  /*** Fetch the data using the user's query ***/
  const url =
  `https://api.unsplash.com/search/photos/?page=${page}&per_page=25&query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}`

  const {data: imageData, isLoaded, errorMessage, numPosts} = useFetch(url);
  const [displayedImgs, setDisplayedImgs] = useState([]);

  /*** Showing "colourful" query on window load ***/
  useEffect(() => {
    setQuery("colourful");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(userInput.toUpperCase());
    setPage(1);
    setShowNums(true);
  }

  /*** Handle results pages, update number of results ***/
  const nextPage = () =>{
    let tempResults = resultNum;
    setPage(++page);
    setResultNum({start: (tempResults.start + 25), end: (tempResults.end+25)});
  }

  const prevPage = () =>{
    let tempResults = resultNum;
    if(page>=2){
      setPage(--page);
      setResultNum({start: (tempResults.start - 25), end: (tempResults.end-25)});
    }
  }

  useEffect(()=>{
    if(page ===1){
      if(imageData.total > 25){
        setResultNum({start:1, end:25});
      }
      else{
        setResultNum({start:1, end: imageData.total});
      }
    }
  },[isLoaded])

  
  /*** Change like button src, update likedImages ***/
  const red = 'red2.png';
  const white = 'white2.png';
  const [likedImages, setLikedImages] = useState([]); //holds image url, alt, and heart
  const [count, setCount] = useState(0);

  useEffect(()=>{
    setDisplayedImgs(imageData.results);
    if (imageData.results){
      for(const element of imageData.results){ //add heart property to each result
        element.heart = 'white2.png';
      }
    }
    
  },[numPosts, imageData, query])

  useEffect(()=>{
    setDisplayedImgs(displayedImgs);
    setCount(likedImages.length);
  }, [displayedImgs, likedImages])

  const handleClick = (index) =>{
    let tempArray = [...displayedImgs];
    if(tempArray[index].heart === red){
      tempArray[index].heart = white;
      setLikedImages(likedImages.filter(likedImages => likedImages.url !== displayedImgs[index].urls.small));
    }

    else{
      tempArray[index].heart = red;
      setLikedImages(theArray => [...theArray, {
        url: displayedImgs[index].urls.small,
        alt: displayedImgs[index].alt_description
      }]);
    }
    setDisplayedImgs(tempArray);
  }

  /*const handleDelete = (url) =>{
    setLikedImages(likedImages.filter(likedImages => url !== likedImages.url))
    const index = displayedImgs.findIndex(element => element.urls.small === url);
    let tempArray = [...displayedImgs];
    tempArray[index].heart = white;
    setDisplayedImgs(tempArray);
  }*/

  return (
    <div className="Home">
      <div className="homeHeader">
        <img className="logo" src="logo.png" alt="moodscape logo" onClick={refreshPage}></img>
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
      </div>
        
      <div className="Content">
        <div className="cart" >
          <div className="cartCounter"><p>{count}</p></div>
            <div className="cartButton">
              <img src="cart.png" className="cartIcon" alt="cart icon"/>
            </div>
              
            <div className="popup" >
              <div className="popupBox" >
                  {likedImages && 
                  (likedImages.map((likedImages, i)=>(
                  <div key={i}>
                      <img className="popupImage" src={likedImages.url} alt={likedImages.alt} />
                      
                      {/*<img src="trash.png" className="trash" alt="trash can" onClick={()=>handleDelete(likedImages.url)}></img>*/}
                  </div>
                  )))}
                </div>
                <div className='createSection'>
                  <button  id="create" className="createBtn" onClick = {()=> props.updateLikes(likedImages)}>
                     <Link to="/moodboard">Create Moodboard</Link>
                  </button>
                </div>
            </div>
          </div> 

        {showNums && 
        <div id="results">
          <h1>{query}</h1>
          <p>Showing {resultNum.start} - {resultNum.end} out of {imageData.total} results</p>
        </div>}
        <div className="grid" ref={gridRef}>
        {imageData && isLoaded && 
          (displayedImgs.map((image, i)=>(
          <div key={i}>
              <img  className="images" src={image.urls.small} alt={image.alt_description} ></img>
              <span><button className='likeButton' onClick={()=>handleClick(i)}>
                <img className="heart" alt="like button" src={image.heart}></img></button>
              </span>
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