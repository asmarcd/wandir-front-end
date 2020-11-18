import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Input from "react-bulma-components";
import API from "../../utils/API";
import "./style.css"



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
   
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root')

export default function PhotoModal({ id, url, entryId, geoId, ...rest }) {
  const [editState, setEditState] = useState({id:id, geoid:4, entryid:2});
    var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
 
  const handleUpdate=(event)=>{
    event.preventDefault()
    console.log("entry handle update")
    API.updatePhoto(editState).then(res=>{
      console.log(res)
    })
  }

  const handleInputChange = (e) => {
    console.log(e)
    // this conditional checks for an e.target.name
    // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
    
    const name = e.target.name;
    
    const value = e.target.value;
    setEditState({
      ...editState,
      [name]: value,
    });
  };

    return (
      <div {...rest}>
        <button onClick={openModal}>Edit</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>{geoId}</h2>
          <img className="modalThumb" src={url} />
          <p>Add geo tag</p>
          <form>
          <input
              onChange={handleInputChange}
              value={editState.geoid}
              name="geoid"
              placeholder="Title (required)"
            />
            <button className="addGeo" onClick={handleUpdate}>Submit</button>
          </form>
        </Modal>
      </div>
    );
}
