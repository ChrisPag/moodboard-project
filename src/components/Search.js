import '../css/Home.css';
import '../css/Content.css';

import Content from './Content.js'
import { useState } from 'react';

const Search = () => {
    const [userInput, setUserInput] = useState("");
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(userInput);
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

            <Content query = {query} />
        </div>
    );
}

export default Search;
