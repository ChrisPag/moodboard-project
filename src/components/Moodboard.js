import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {useState, useCallback, useEffect} from 'react';
import Draggable from 'react-draggable';
//example
function Moodboard(props) {
  const navigate = useNavigate();
  const [canvasPhotos, setCanvasPhotos] = useState([]);

  const addToCanvas = (index) =>{
    const movedPhotos = props.likes.filter((photo)=> props.likes.url === photo.index);
    setCanvasPhotos((canvasPhotos)=> [...canvasPhotos, movedPhotos[index]]);
  }

  useEffect(()=>{
    console.log(canvasPhotos);
    setCanvasPhotos(canvasPhotos);
  },[canvasPhotos]);

  return (
    
    <div className="Moodboard">
      <div className="moodHeader"> 
        <button id="back" className="btn" onClick={()=> navigate(-1)}>Back</button>
      </div>
      <div className='main'>
        <div className='sidebar'>
            {props.likes && 
              (props.likes.map((likes, i)=>(
              <div className="moodboard-imgs" key={i}>
                  <img src={likes.url} alt={likes.alt} index={i} />
                  <button onClick={()=>addToCanvas(i)}>Add</button>
              </div>
              )))}

          {!props.likes &&
          <p>Could not load images</p>}
        </div> 
      </div>
      <div className= "canvas">
        {/* The canvas is where liked images (beside the sidebar) can be added to*/}

          {canvasPhotos.map((photo, i)=>{
          return (
      
          <Draggable 
          bounds="parent">
            <img src={photo.url} alt={photo.alt} index={i}  />
          </Draggable>)
        })}
      </div>
    </div>
  );
}
  
export default Moodboard;