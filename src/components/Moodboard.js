import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {useState, useCallback, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import React , { Component}  from 'react';
import ColorPicker from './ColorPicker';
//import { Resizable, ResizableBox } from 'react-resizable';

function Moodboard(props) {
  const navigate = useNavigate();
  const [canvasPhotos, setCanvasPhotos] = useState([]);
  const zIndexList = new Array(canvasPhotos.length).fill(0);
  const [zIndexProp, setzIndex] = useState([]);

  const resizeRef = useRef();

  const addToCanvas = (index) =>{
    const movedPhotos = props.likes.filter((photo)=> props.likes.url === photo.index);
    setCanvasPhotos((canvasPhotos)=> [...canvasPhotos, movedPhotos[index]]);
  }

  /* Changing the background color value */
  const [state, updateState] = React.useState('#FFFFFF');
  

  const handleInput = (e) => {
    updateState(e.target.value);
  }

  useEffect(()=>{
    setCanvasPhotos(canvasPhotos);
    setzIndex(zIndexList);
    console.log(canvasPhotos);
    console.log(zIndexProp);
  },[canvasPhotos]);

  const moveToFront = (index) =>{
    //set the temp array to original array (all 0)
    let tempArray = [...zIndexList];
    if(tempArray[index]===1){
      tempArray[index] = 0;
    }
    else{
      tempArray[index] = 1;
    }

    //change the zIndex of the given image only
    setzIndex(tempArray);

    console.log(zIndexProp);
  }

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
          {canvasPhotos.map((photo, j)=>{
          return (
          
          <Draggable
          bounds="parent">
            <div className="draggable" key={j} style={{zIndex: zIndexProp[j]}}>
              
              <button ref={resizeRef}>move</button>
              <button className="move" type='button' onClick={() =>moveToFront(j)}>Move to front</button>
              <img  src={photo.url} alt={photo.alt} index={j} className="moodImages"
              //style={{width: size.x, height: size.y}} 
              />
            </div>
          </Draggable>
          )
        })}
      </div>
    </div>
  );
}
  
export default Moodboard;