import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {useDrop} from 'react-dnd';
import Photo from './Photo'
import {useState} from 'react';
import { customDragLayer } from './customDragLayer';


function Moodboard(props) {
  const navigate = useNavigate();
  const [canvas, setCanvas] = useState([]);
  
  /* useDrop accepts two arguments
  ** {isOver} determines if an image is dropped
  ** drop references where the images can be dropped and calls a function */
  const [{isOver}, drop] = useDrop(({
    accept: "image",
    drop: (item) => addToCanvas(item.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addToCanvas = (index) =>{
    const canvasPhotos = props.likes.filter((photo)=> props.likes.url === photo.index);
    setCanvas((canvas)=> [...canvas, canvasPhotos[index]]);
  }

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
                  <Photo url={likes.url} alt={likes.alt} index={i} />
              </div>
            )))}

          {!props.likes &&
          <p>Could not load images</p>}
        </div> 
      </div>
      <div className= "canvas" ref={drop}>
        {canvas.map((photo, i)=>{
          return <Photo url={photo.url} alt={photo.alt} key={i} />
        })}
      </div>
    </div>
  );
  }
  
  export default Moodboard;