import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import Draggable from "react-draggable";


function Moodboard(props) {
  const navigate = useNavigate();
  return (
    <div className="Moodboard">
      <div className="moodHeader"> 
        <button id="back" className="btn" onClick={()=> navigate(-1)}>Back</button>
      </div>
      <div className='main'>
          <div className='sidebar'>
              {props && 
                (props.likes.map((likes, i)=>(
                <div className="moodboard-imgs" key={i}>
                  <Draggable>
                    <img src={likes}></img>
                  </Draggable>
                </div>
              )))}
          </div>
      </div>
    </div>
  );
  }
  
  export default Moodboard;