import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import Draggable from "react-draggable";


function Moodboard(props) {
  const navigate = useNavigate();
  return (
    <div className="Moodboard">
      <button onClick={()=> navigate(-1)}>Back</button>
      {props && 
        (props.likes.map((likes, i)=>(
        <div className="moodboard-imgs" key={i}>
          <Draggable>
            <img src={likes}></img>
          </Draggable>
        </div>
      )))}
    </div>
  );
  }
  
  export default Moodboard;