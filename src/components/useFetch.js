import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

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
            console.log(data);
            setData(data.results);
            setIsLoaded(true);
        })

        .catch(error => {
            setErrorMessage(error.message);
        })
    }, [url]);

    return {data, isLoaded, errorMessage};
  }
  
export default useFetch;