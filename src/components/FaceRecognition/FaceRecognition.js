import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl , box}) =>{
    
    // const {leftCol , topRow , rightCol , bottomRow } = box;
    let faces;
    if(Array.isArray(box)){
        faces =  box.map((face,i) => {
        const {leftCol , topRow , rightCol , bottomRow } = face;
        return (<div 
             key = {i}
            className = 'bounding-box'
            style = {{left : leftCol , top : topRow , right : rightCol , bottom : bottomRow}}
            ></div>);
    });
    }
    
    return (
        <div className = 'center ma'>
         <div className = 'absolute mt2'>
            <img id='inputImage' src = {imageUrl} alt='' width = '400px' height = 'auto'/>
          {faces}
        </div>   
        </div>
    );
}

export default FaceRecognition;