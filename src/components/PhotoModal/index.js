import React, {useContext, useState} from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Input from "react-bulma-components";
import API from "../../utils/API";
import 'react-dropdown/style.css';
import "./style.css"
import GeoStateContext from '../../contexts/GeoStateContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


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
  const [editState, setEditState] = useState({id:id});
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
    const data = {geoid: editState}
    console.log("entry handle update")
    API.updatePhoto(editState,).then(res=>{
      console.log(res)
    })
  }

  


  // Set dropdown menues

  const {geoState,journalEntries}=useContext(GeoStateContext)

 
// update geo tag photo
  // const handleInputChange = (e) => {
  //   console.log(e)
  //   // this conditional checks for an e.target.name
  //   // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
    
  //   const name = e.target.name;
    
  //   const value = e.target.value;
  //   setEditState({
  //     ...editState,
  //     [name]: value,
  //   });
  // };

  const handleInputChangeGeo = (e) => {
    console.log(e)
    // this conditional checks for an e.target.name
    // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
    
    const value = e.value;
    setEditState({
      ...editState,
      geoid: e.value,
      geoName: e.label,
    });
  };

  const handleInputChangeJournal = (e) => {
    console.log(e)
    // this conditional checks for an e.target.name
    // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
    
    const value = e.value;
    setEditState({
      ...editState,
      entryid: e.value,
      entryName: e.label,
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
          

          <Dropdown className="dropDown" options={geoState.map((geoOption) => ( { value: geoOption.id, label:geoOption.place }))} onChange={handleInputChangeGeo} value={editState.geoName} name="geoid" placeholder="Select a Geo Location" />
          <Dropdown className="dropDown" options={journalEntries.map((entOption) => ({value:entOption.id, label:entOption.title}))} onChange={handleInputChangeJournal} value={editState.entryName} name="entryid" placeholder="Select a Journal Entry" />
          {/* <Dropdown options={journalEntries.map((entOptions) => (entOptions.title))} /*onChange={this._onSelect}  placeholder="Select a Journal Entry" /> */}
          
          
          <img className="modalThumb" src={url} />
          <form>
        {/* <input
            onChange={handleInputChange}
            value={editState.geoid}
            name="geoid"
            placeholder="Title (required)"
          /> */}
           
            <button className="addGeo" onClick={handleUpdate}>Submit</button>
            {/* <button className="photoDelete" onClick={e => deleteClick(id)}>Delete</button> */}
          </form>
        </Modal>
      </div>
    );
}
