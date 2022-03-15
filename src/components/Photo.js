import {useDrag} from 'react-dnd';
import {useEffect} from 'react';
import React from 'react'



function Photo(props) {
    /* useDrag hook is taking two arguments
    ** {isDragging} is a bool that determines if something is currently be dragged
    ** drag references which element you want to make draggable */
   
    const [{isDragging}, drag, preview] = useDrag(()=>({
        type: "image",
        item:{ index: props.index},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
   

    /*useEffect(()=>{
        console.log(isDragging);
    })*/

    return (  
        <img ref={drag} src={props.url} role="image"></img>
    );
}

export default Photo;