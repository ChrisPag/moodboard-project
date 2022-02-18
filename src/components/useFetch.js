/*This hook fetches data from a given url and in addition to
the data it returns an isLoaded state and an error message 
if there is an error*/

import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [numPosts, setNumPosts] = useState(0);
    /*const url = 
    `https://api.unsplash.com/search/photos/?page=${page}
    &query=${query}
    &client_id=${
    process.env.REACT_APP_ACCESS_KEY}`*/

    useEffect(() => {
        fetch(url)
        .then(response => {
            if(!response.ok){
            throw Error('Could not fetch the data');
            }
            setIsLoaded(false);
            return response.json()
        })
    
        .then(data =>{
            setData(data);
            setIsLoaded(true);
            setNumPosts(data.results.length);
            console.log(data);
        })

        .catch(error => {
            setErrorMessage(error.message);
        })
    }, [url]);

    return {data, isLoaded, errorMessage, numPosts};
  }
  
export default useFetch;