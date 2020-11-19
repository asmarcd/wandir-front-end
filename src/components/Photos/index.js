import React,{useContext} from "react";
import "./style.css";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery.min.js";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PhotoComponent from '../PhotoComponent'
import GeoStateContext from '../../contexts/GeoStateContext'
import API from "../../utils/API";


export default function Photos() {
  const {photos, userState, fireRefresh}=useContext(GeoStateContext)
  // Setup the cloudinary widget. Cloudinary is being declared through a script in index in public
  let widget = window.cloudinary.createUploadWidget({
    // using kemps cloudinary account
    cloudName: "k3m9",
    uploadPreset: "ulnivdif"},
    // callback function for the result that contains the url
    (error, result) => {handlePhoto(result)})
  console.log(photos)
  // handle the photo upload
  const handlePhoto =(result) =>{
    // seems like cloudinary runs alot in the background so just grab the event success
    if(result.event==="success"){
      // send that info as to the api route to create the new photo
      API.createPhoto({name:"",url:result.info.url, userid:userState.id}).then(res=>{
        // refresh the page
        fireRefresh()
      })
    }
    
  }
  // fire the open widget on button click
  const showWidget = (widget) => {
    widget.open()
  }

  
  return (
    <div id="photoWindow">
      <div id = 'photo-form-container'>
        {/* button to open cloudinary widget */}
        <button className="button" id="addPhotoBtn" onClick={(e)=>{showWidget(widget)}}>Add Photo</button>
      </div>
      <div id="gallery">
        <div className="columns is-multiline is-mobile">
        
        {/* Image template */}
        {photos.map((photo, i) => (<PhotoComponent key={i} {...photo}/>))}
    

        </div>
        
      </div>
    </div>
  );
}