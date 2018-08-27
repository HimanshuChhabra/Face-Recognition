import React, { Component } from 'react';
import './App.css';
import  Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'bbb6d56ed3604c09b7a6b66259083071'
 });

const particlesOptions = {
  particles: {
    number : {
      value : 30,
      density: {
        enable : true,
        value_area : 800
      }
    }
  }
};

class App extends Component {
constructor(){
  super();
  this.state = {
    input : '',
    imageUrl : '',
    box : [],
    route : 'signin',
    isSigngedIn : false
  }
}

// Bounding Box is the percentage of the image
calcFaceLocations = (response) => {
  //const faceBoundaries = response.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  const regions = response.outputs[0].data.regions;
  const boxes = regions.map( (region) =>{
    const bound = region.region_info.bounding_box;
    return {
    leftCol : bound.left_col * width,
    topRow : bound.top_row * height,
    rightCol : width - (bound.right_col * width),
    bottomRow : height - (bound.bottom_row * height)
    }
  }
  );
  /*
  return {
    leftCol : faceBoundaries.left_col * width,
    topRow : faceBoundaries.top_row * height,
    rightCol : width - (faceBoundaries.right_col * width),
    bottomRow : height - (faceBoundaries.bottom_row * height)
  }*/
  return boxes;
}

displayBox = (boxes) => {
this.setState({box : boxes});
}

onInputChange = (event) => {
  this.setState({input : event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl : this.state.input});
  
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then( (response) => {
      this.displayBox(this.calcFaceLocations(response));
    }
  ).catch((err) => console.log(err));
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState({isSigngedIn : false , route : 'signin'});
  }else if (route === 'home'){
    this.setState({isSigngedIn : true});
  }
  this.setState({route : route});
}

render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSigngedIn}/>
       { this.state.route === 'home' ?
       <div>
        <Logo />
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box}/>
        </div>
      :
       (
        (this.state.route === 'signin') ? 
        <Signin onRouteChange = {this.onRouteChange}/>
        : <Register onRouteChange = {this.onRouteChange}/>
       )
       }
      </div>
    );
  }
}

export default App;
