import '../css/Moodboard.css';

function Moodboard(props) {
    return (
      <div className="Moodboard">
        {(props.likedImages.map((image, i)=>(
            <div className="likedImages" key={i}>
                <img src={image}></img>
            </div>
        )))}
        
      </div>
    );
  }
  
  export default Moodboard;