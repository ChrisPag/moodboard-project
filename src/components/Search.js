import '../css/Home.css';

import Home from './Home.js'
import { useState, useEffect } from 'react';

const Search = () => {
    const [userInput, setUserInput] = useState("");
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(userInput);
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

            <Home query = {query} />
        </div>
    );
}

export default Search;
