import '../css/Home.css';
import { useState, useEffect } from 'react';

function Search() {
    const [data, setData] = useState(null);
    const url = "https://api.unsplash.com/photos/random/?client_id=" 
    + process.env.REACT_APP_ACCESS_KEY;

    useEffect(() => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok){
            throw Error('Could not fetch the data');
            }
            return response.json()
          })
    
          .then(data =>{
            setData(data);
        })

        
    }, [url]);

    console.log(data);
    const handleSubmit = () => {
        console.log("sup");
    }

    return (
        <div className="Search">
            <form onSubmit = {handleSubmit}>
                <input type ="text"placeholder="Search..."></input>
                <button type="submit">Go</button>
            </form>

            {data && <img src={data.urls.small}></img>}
        </div>
    );
}

export default Search;
