import '../css/Home.css';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';

function Search() {
    const [userInput, setUserInput] = useState('');
    const searchQuery = "candy";

    const url = "https://api.unsplash.com/search/photos/?page=1&query=" +
    searchQuery +
    "&client_id=" + 
    process.env.REACT_APP_ACCESS_KEY;

    const {data: imageData, isLoaded} = useFetch(url);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInput);
    }

    return (
        <div className="Search">
            <form onSubmit = {handleSubmit}>
                <input type ="text"
                placeholder="Search..."
                value = { userInput }
                onChange={(e) => setUserInput(e.target.value)}
                ></input>
                <button type="submit">Go</button>
            </form>

            {imageData && isLoaded &&
            (imageData.map((image, i)=>(
                <div className="images" key={i}>
                    <img src={image.urls.small}></img>
                </div>
            )))}
        </div>
    );
}

export default Search;
