import '../css/Home.css';
import useFetch from './useFetch';

function Search() {
    const searchQuery = "candy";

    const url = "https://api.unsplash.com/search/photos/?page=1&query=" +
    searchQuery +
    "&client_id=" + 
    process.env.REACT_APP_ACCESS_KEY;

    const {data: imageData, isLoaded} = useFetch(url);

    const handleSubmit = () => {
        console.log("sup");
    }

    console.log(imageData);

    return (
        <div className="Search">
            <form onSubmit = {handleSubmit}>
                <input type ="text"placeholder="Search..."></input>
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
