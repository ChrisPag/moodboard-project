import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';

const Home = ({query}) =>{

  const {data: imageData, isLoaded, errorMessage} = useFetch(
    "https://api.unsplash.com/search/photos/?page=1&query=" +
    query +
    "&client_id=" + 
    process.env.REACT_APP_ACCESS_KEY);

  const likedArray = new Array(imageData.length).fill('Like');
  console.log(likedArray);
  const [liked, setLiked] = useState([]);
  useEffect(()=>{
    setLiked(likedArray);
  },[imageData.length, imageData])
  
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
          (imageData.map((image, i)=>(
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

export default Home;
