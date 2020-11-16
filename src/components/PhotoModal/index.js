import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
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
            <input />
            <button className="addGeo">Submit</button>
          </form>
        </Modal>
      </div>
    );
}
