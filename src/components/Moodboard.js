import '../css/Moodboard.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import ColorPicker from './ColorPicker';
import React from 'react';
import screenshot from './Screenshot';

function Moodboard(props) {
  const navigate = useNavigate();
  const canvasRef = useRef();

  /*** User inputs filename ***/
  const [moodboardName, setMoodboardName] = useState();
  const [nameInput, setNameInput] = useState("");

  const handleName = (e) =>{
    e.preventDefault();
    setMoodboardName(nameInput);
    screenshot(canvasRef.current, moodboardName);
  }
  
  useEffect(()=>{
    setMoodboardName(nameInput);
  },[nameInput]);

  /* Changing the background color value */
  const [state, updateState] = useState('#f8f8f8');
  const handleInput = (e) => {
    updateState(e.target.value);
  }

  /*** Add to canvas ***/
  const [canvasPhotos, setCanvasPhotos] = useState([]);
  const addToCanvas = (index) =>{
    const movedPhotos = props.likes.filter((photo)=> props.likes.url === photo.index);
    setCanvasPhotos((canvasPhotos)=> [...canvasPhotos, 
      { url: movedPhotos[index].url,
        alt: movedPhotos[index].alt,
      }]);
  } 

  /*** Remove from canvas ***/
  const removeFromCanvas = (index) =>{
    let tempArray = canvasPhotos.filter(canvasPhotos=> canvasPhotos.url !==
      props.likes[index].url
    );
    
    setCanvasPhotos(tempArray);
  }

  /*** Move to front button ***/
  const zIndexList = new Array(canvasPhotos.length).fill(0);
  const [zIndexProp, setzIndex] = useState([]);
  const moveToFront = (index) =>{
    let tempArray = [...zIndexList]; //set the temp array to original array (all 0)
    if(tempArray[index]===1){
      tempArray[index] = 0;
    }
    else{
      tempArray[index] = 1;
    }
    setzIndex(tempArray); //change the zIndex of the given image only
  } 

  /*** Update when new photo is added ***/
  useEffect(()=>{
    setCanvasPhotos(canvasPhotos);
    setzIndex(zIndexList);
  },[canvasPhotos]);

  return (
    <div className="Moodboard">
      <div className="moodHeader"> 
        <button id="back" className="btn" onClick={()=> navigate(-1)}>Back</button>
        <ColorPicker value={state} onChange={handleInput} title="Change Background Color"/>
        <form onSubmit={handleName}>
          <input type ="text"
            placeholder="Moodboard Name"
            value = { nameInput }
            onChange={(e) => setNameInput(e.target.value)}
            className="nameInput"
          ></input>
          <button id="download" className="btn" >Download</button>
        </form>
        
      </div>
      <div className='main'>
        <div className='sidebar'>
          {props.likes && 
            (props.likes.map((likes, i)=>(
            <div className="sidebarImages" key={i}>
                <img src={likes.url} alt={likes.alt} index={i} />
                <span> 
                  <button onClick={()=>addToCanvas(i)} className="addButton" title="Add to Moodboard">
                    <img className="addImage" src="add.png" alt="add"></img>
                  </button> 
                </span>
            </div>
            )))}
          {!props.likes &&
          <p>Could not load images</p>}
        </div> 
        
        <div ref={canvasRef} className= "canvas" id="canvasColor" style={{backgroundColor: state}}>
          {/* The canvas is where liked images (beside the sidebar) can be added to*/}
            {canvasPhotos.map((photo, j)=>{
            return (
            
            <Draggable bounds="parent" key={j}>
              <div  className="draggable"  style={{zIndex: zIndexProp[j]}}>
                <div className='hoverMenu'>
                  <button className="front" title="Bring to Front" type='button' onClick={() =>moveToFront(j)}>
                    <img className="frontImage" src="front.png" alt="move to front"></img>
                  </button>
                  <button className="remove" title="Remove" type='button' onClick={() =>removeFromCanvas(j)}>
                    <img className="removeImage" src="trash.png" alt="trash bin"></img>
                  </button>
                </div>
                <img  src={photo.url} alt={photo.alt} index={j} className="moodImages"/>
              </div>
            </Draggable>
            )
          })}
       
        </div>
      </div>
    </div>

  );
}
  
export default Moodboard;