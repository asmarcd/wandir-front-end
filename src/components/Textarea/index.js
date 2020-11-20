import React, { useState, useEffect, useContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import GeoStateContext from "../../contexts/GeoStateContext";
// import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form, Button } from "react-bulma-components";
import API from "../../utils/API";
import "./style.css";
import styles from "./styles"
const { Input, Field, Control, Label } = Form;

function TextArea(props) {

  const { geoState, inputState, handleInputChange, fireRefresh } = useContext(GeoStateContext);
  //Map over the geostate to create an array of objs in the format metions needs for lookup
  const newGeo = geoState.map((e) => {
    return { id: e.id, display: e.place };
  });

  // holds every mention created in the inputState.title
  const [geoTagState, setgeoTagState] = useState([]);

  // useEffect(()=>{
  //     setGeoTagState(props.geo)
  // })

  // handles the form being submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.handleClick()
    //parse through the input body and pull out any geotag names, as long as it still exists in body
    const filter = geoTagState.filter((e) => inputState.body.includes(e.place));
    // then take all those geotags and create an arry of the ids
    const geoIds = filter.map((e) => e.id);
    // create the entry passing in the inputState as the body
    API.createEntry(inputState).then((res) => {
      // After the entry is created, create an association between it and all the points mentioned (held in geoIds above)
      API.addGeotoEntry(geoIds, res.id).then((res) => {
        console.log(res);
      });
    });
    fireRefresh();
  };

  const handleEdit = event => {
    event.preventDefault();
    props.handleClick()

    const filter = geoTagState.filter((e) => inputState.body.includes(e.place));
    const geoIds = filter.map((e) => e.id);

    API.updateEntry(inputState).then(res => {
      API.addGeotoEntry(geoIds, inputState.id)
    });
  };

  return (
    <div>
      <form>
        <Field>
          <Label>Title</Label>
          <Control>
            <Input
              onChange={handleInputChange}
              value={inputState.title}
              name="title"
              placeholder="Title (required)"
            />
          </Control>
        </Field>
        <Field>
          <Label>Date</Label>
          <Control>
            <Input
              onChange={handleInputChange}
              value={inputState.date}
              name="date"
              type="date"
              placeholder="Title (required)"
            />
          </Control>
        </Field>
        {inputState.id === "" ? <Button className="textBtn" onClick={handleFormSubmit}>
          Submit
        </Button> : <Button className="textBtn" onClick={handleEdit}>
          Save
        </Button>}
      </form>
      <MentionsInput
      style={styles}
        
        // Allows for there to be a space in the place name
        allowSpaceInQuery={true}
        value={inputState.body}
        onChange={handleInputChange}
      >
        <Mention
          style={styles}
          className="mention"
          // specifys when to start the mention lookup
          trigger="@"
          // what data array do we feed in?
          data={newGeo}
          // How do we want the display to showup
          displayTransform={(id, display) => `@${display}`}
          // function that fires on add of mention
          // here we are pushing that particular mention up to geoTagState
          // we use that send what geotags are present in handleFormSubmit
          onAdd={(id, display) =>
            setgeoTagState((geoTagState) => [
              ...geoTagState,
              { id: id, place: display },
            ])
          }
        />
       
      </MentionsInput>
    </div>
  );
}

export default TextArea;
// onKeyDown={handleGeoTag}
