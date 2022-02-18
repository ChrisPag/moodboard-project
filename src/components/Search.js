import '../css/Home.css';

import Content from './Content.js'
import { useState, useEffect } from 'react';

const Search = () => {
    let [page, setPage] = useState(1);
    const [userInput, setUserInput] = useState("");
    const [query, setQuery] = useState("");
    const [showButton, setShowButton] = useState(false);

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

            {showButton &&
                <button id="removeResults" onClick = {removeResults}>Clear</button>}

            <Content query = {query} page = {page} />

            <button onClick = {showMore}>Show More</button>
        </div>
    );
}

export default Search;
