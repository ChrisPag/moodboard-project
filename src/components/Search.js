import '../css/Home.css';

import Content from './Content.js'
import { useState } from 'react';

const Search = () => {
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
                <button id="removeResults" onClick = {removeResults}>Remove results</button>}

            <Content query = {query} />
        </div>
    );
}

export default Search;
