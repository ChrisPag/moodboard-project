import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function Moodboard(props) {
  const navigate = useNavigate();
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="Moodboard">
      <div className="moodHeader"> 
        <button id="back" className="btn" onClick={()=> navigate(-1)}>Back</button>
      </div>
      <div className='main'>
        <div className='sidebar'>
            {props.likes && 
              (props.likes.map((likes, i)=>(
              <div className="moodboard-imgs" key={i}>
                  <img src={likes}></img>
              </div>
            )))}

          {!props.likes &&
          <p>Could not load images</p>}
        </div> 
      </div>
    </div>
    </DndProvider>
  );
  }
  
  export default Moodboard;