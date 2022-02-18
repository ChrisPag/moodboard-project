/* This file displays the search results (images), loading state,
error message, and like buttons */
import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';

const Content = ({query, page}) =>{
  
  const url =
  `https://api.unsplash.com/search/photos/?page=${page}
  &query=${query}
  &client_id=${
  process.env.REACT_APP_ACCESS_KEY}`

  //Fetch the data using the user's query
  const {data: imageData, isLoaded, errorMessage, numPosts} = useFetch(url);

  /* Create an array to store like states */
  const likedArray = new Array(numPosts).fill('Like');
  const [liked, setLiked] = useState([]);

  useEffect(()=>{
    setLiked(likedArray);
  },[numPosts, imageData])
  
  //Update like state onClick
  const handleClick = (index) =>{
    let newArray = [...liked];
  
    if(newArray[index]==='Like'){
      newArray[index] = 'Unlike';
    }
    else{
      newArray[index] = 'Like';
    }
    setLiked(newArray);
  }

  
  return (
    <div className="Content">
      {imageData && isLoaded && 
        (imageData.results.map((image, i)=>(
          <div className="images" key={i}>
              <img src={image.urls.small}></img>

              <button onClick={()=>handleClick(i)}>{liked[i]}</button>
          </div>
      )))}

      {!isLoaded && !errorMessage && <p>Loading...</p>}
      {errorMessage && <p>
        {errorMessage}</p>}
      
      
    </div>
  );
}

export default Content;
