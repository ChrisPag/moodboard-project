import '../css/Moodboard.css';

function Moodboard(props) {
  if(props){
    console.log(props.likes);
  }
  
    return (
      <div className="Moodboard">
       {props && 
          (props.likes.map((likes, i)=>(
          <div className="moodboard-imgs" key={i}>
            <img src={likes} alt="image"></img>
          </div>
        )))}
      </div>
    );
  }
  
  export default Moodboard;