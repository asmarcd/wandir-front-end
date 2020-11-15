import React, { useState, useEffect, useContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import GeoStateContext from "../../contexts/GeoStateContext";
// import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Form, Button } from 'react-bulma-components'
import API from '../../utils/API'
import './style.css';
const {Input, Field, Control, Label} = Form

 

function TextArea (props) {
  const { geoState } = useContext(GeoStateContext);
    const newGeo = geoState.map(e=>{
        return {id:e.id,display:e.place}
    })
    const [inputState, setInputState] = useState({
        title:"",
        date:"",
        body:"",
    })
    const [geoTagState, setgeoTagState] = useState([
    ])
    

    // useEffect(()=>{
    //     setGeoTagState(props.geo)
    // })

    const handleInputChange = (e) =>{
        let name
        // this conditional checks for an e.target.name
        // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
        if(e.target.name){
            name = e.target.name 
        }else(
            name = "body"
        )
        const value = e.target.value
        setInputState({
            ...inputState,
            [name]: value
            })
    }
    
    const handleFormSubmit = (event) =>{
        event.preventDefault();
        //parse through the input body and pull out any geotag names
        const testString ="this is @[Green Lake](1) and also @[kirkland](12)"
        const filter = geoTagState.filter(e=>testString.includes(e.place))
        console.log(filter)
        API
        //pass those geotag names
    }
    
    return(
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
              <Label>date</Label>
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
            <Button color="primary" rounded outlined  onClick={handleFormSubmit}>
              Submit
            </Button>
          </form>
          <MentionsInput className={"journal-entry"} allowSpaceInQuery={true} value={inputState.body} onChange={handleInputChange}>
            <Mention
                className="mention"
                trigger="@"
                data={newGeo}
                displayTransform= {(id, display) => `@${display}`}
                onAdd = {(id, display) =>  setgeoTagState(geoTagState => [...geoTagState, {id:id,place:display}])}     
            />
        </MentionsInput>
        </div>
    )
}

export default TextArea
// onKeyDown={handleGeoTag}