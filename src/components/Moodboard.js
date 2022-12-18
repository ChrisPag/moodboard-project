import '../css/Moodboard.css';
import '../css/Headers.css';

import { useNavigate } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import ColorPicker from './ColorPicker';
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
  const [state, updateState] = useState('#eeeeee');
  const handleInput = (e) => {
    updateState(e.target.value);
  }

  /*** Add to canvas ***/
  const [canvasPhotos, setCanvasPhotos] = useState([]);
  const addToCanvas = (index) =>{
    //using canvasIndex for id is problematic
    const canvasIndex = canvasPhotos.length;
    const movedPhotos = props.likes.filter((photo)=> props.likes.url === photo.index);
    setCanvasPhotos((canvasPhotos)=> [...canvasPhotos, 
      { url: movedPhotos[index].url,
        alt: movedPhotos[index].alt,
        id: canvasIndex,
        zIndex: canvasIndex +1
      }]);
  } 

  /*** Remove from canvas ***/
  const removeFromCanvas = (id) =>{
    let tempArray = canvasPhotos.filter(element=> element.id !== id);
    setCanvasPhotos(tempArray);
  }

  /*** Move to front button ***/
  const moveToFront = (index) =>{
    let tempArray = [...canvasPhotos]; 
    
    //map canvasPhotos zIndexes to get max value
    const zIndexes = canvasPhotos.map(photos =>{
      return photos.zIndex;
    })
    if(tempArray[index].zIndex < Math.max(...zIndexes)){
      //make the clicked image's zindex max, make the rest lower by 1
      tempArray[index].zIndex = Math.max(...zIndexes) + 1;
      for(const element of tempArray){ 
        element.zIndex = element.zIndex - 1;
      }
    }
    setCanvasPhotos(tempArray);
  } 

  /*** Update when new photo is added ***/
  useEffect(()=>{
    setCanvasPhotos(canvasPhotos);
    console.log(canvasPhotos);
  },[canvasPhotos]);

  return (
    <div className="Moodboard">
      <div className="moodHeader"> 
        <button id="back"  onClick={()=> navigate(-1)}><img src="back.png" alt="back" width="20px" class="backArrow"/></button>
        <ColorPicker value={state} onChange={handleInput} title="Change Background Color"/>
       
        <form onSubmit={handleName} className="moodForm">
          <input type ="text"
            placeholder="Moodboard Name"
            value = { nameInput }
            onChange={(e) => setNameInput(e.target.value)}
            className="nameInput"
          ></input>
          <div>
            <button id="download" className="downloadBtn" >Download</button>
          </div>
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
                    <img className="addImage" src="add2.png" alt="add"></img>
                  </button> 
                </span>
            </div>
            )))}
          {!props.likes &&
          <p className="empty">There are no liked images yet.</p>}
        </div> 
        
        <div ref={canvasRef} className="canvas" id="canvasColor" style={{backgroundColor: state}}>
          {/* The canvas is where liked images (beside the sidebar) can be added to*/}
            {canvasPhotos.map((photo, j)=>{
            return (
            
            <Draggable bounds= "parent" key={j} >
              <div  id="test" className="draggable" style={{zIndex: photo.zIndex}} >
                <div className='hoverMenu'>
                  <button className="front" title="Bring to Front" type='button' onClick={() =>moveToFront(j)}>
                    <img className="frontImage" src="front.png" alt="move to front"></img>
                  </button>
                  <button className="remove" title="Remove" type='button' onClick={() =>removeFromCanvas(photo.id)}>
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