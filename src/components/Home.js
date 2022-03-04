/* This file is a container for the search bar,
search results (content) and button to link
to the moodboard creation page*/
import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
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
    const ImageId = document.getElementById("heart");
    let newArray = [...liked];

    if(newArray[index]==='Like'){
      newArray[index] = 'Unlike';
      ImageId.src = "red.png";
      setLikedImages(oldArray => [...oldArray, imageGroup[index].urls.small]);
    }
    else{
      newArray[index] = 'Like';
      ImageId.src = "white.png";
      setLikedImages(likedImages.filter(likedImages => likedImages !== imageGroup[index].urls.small))
    }
    setLiked(newArray);
  }

  const grid = document.querySelector('.grid');
  const masonry = new Masonry(grid, {
    isFitWidth: true,  
});

  imagesLoaded( grid ).on( 'progress', function() {
    // layout Masonry after each image loads
    masonry.layout();
  });
 

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

        

        {showButton && <button id="removeResults" id="clear" className="btn" onClick = {removeResults}>Clear</button>}
      </div>
        
      <div className="Content">
        <div className="grid">
        {imageData && isLoaded && 
           (imageGroup.map((image, i)=>(
          <div  key={i}>
              <img  className="images" src={image.urls.small} alt={image.alt_description} ></img>
              <span><button className='likeButton' onClick={()=>handleClick(i)}> {liked[i]} <img Id="heart" src="white.png"></img> </button></span>
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