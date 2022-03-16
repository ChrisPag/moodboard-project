import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {useState, useCallback, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import React , { Component}  from 'react';
import ColorPicker from './ColorPicker';

//example
function Moodboard(props) {
  const navigate = useNavigate();
  const [canvasPhotos, setCanvasPhotos] = useState([]);
  const [state, updateState] = React.useState('#FFFFFF');

/* Changing the background color value */
  const handleInput = (e) => {
    updateState(e.target.value);
  }

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
        <ColorPicker value={state} onChange={handleInput} />
      </div>
      <div className='main'>
        <div className='sidebar'>
            {props.likes && 
              (props.likes.map((likes, i)=>(
              <div className="moodboard-imgs" key={i}>
                  <img src={likes.url} alt={likes.alt} index={i} />
                  <button onClick={()=>addToCanvas(i)} className="addButton"><img src="add.png" className="plus"></img></button>
              </div>
              )))}

          {!props.likes &&
          <p>Could not load images</p>}
        </div> 
      </div>
      <div className= "canvas" id="canvasColor" style={{backgroundColor: state}}>
        {/* The canvas is where liked images (beside the sidebar) can be added to*/}

          {canvasPhotos.map((photo, i)=>{
          return (
            
          <Draggable 
          bounds="parent">
            <img src={photo.url} alt={photo.alt} index={i} className="moodImages" />
          </Draggable>)
        })}
      </div>
    </div>
  );
}
  
export default Moodboard;