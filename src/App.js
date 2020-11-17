import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hero from "./components/Hero";
import WindowNav from "./components/WindowNav";
import Map from "./components/Map";
import Journal from "./components/Journal";
import Photos from "./components/Photos";
import Footer from "./components/Footer";
import API from "./utils/API";
import GeoStateContext from "./contexts/GeoStateContext";

function App() {
  const [geoState, setGeoState] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [viewState, setViewState] = useState("journal")
  //
  const [userState, setUserState] = useState({
    id: 1,
    username: "User1",
    email: "user1@gmail.com",
    token: "",
    isLoggedIn: true,
  });

  const [inputState, setInputState] = useState({
    title: "",
    date: "",
    body: "",
    UserId: userState.id
  });

  useEffect(() => {
    handleFilterContent(0, "all")

  }, []);

  const editEntry = res => {
    setInputState({
      id: res[0].id,
      title: res[0].title,
      date: res[0].date,
      body: res[0].body
    });
  };

  // handles the input change by the user
  const handleInputChange = (e) => {
    let name;
    // this conditional checks for an e.target.name
    // if it doesn't exist it is coming from the text area (body). I couldn't figure out how to attach a name to that field
    if (e.target.name) {
      name = e.target.name;
    } else name = "body";
    const value = e.target.value;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleViewSwitch = (event) => {
    console.log(event)
    if (event.target.id === "journalBtn") {
      setViewState("journal")
    } else if (event.target.id === "photoBtn") {
      setViewState("button")
    }
  }
  // const updateGeoFnc =(newGeo,id) =>{
  //   if(id){
  //     console.log()
  //     const geoPop = geoState.filter(e=>e.id!=id)
  //     setGeoState(geoPop); 
  //   }else{
  //     setGeoState(geoState => [...geoState, newGeo]);
  //     console.log(newGeo)
  //   }

  // }

  const deleteReset = () => {
    API.getUserData(userState.id).then(userdata => {
      setJournalEntries(userdata.entry.map(({ id, title, date, body }) => ({ id, title, date, body })));
    });
  };

  const handleFilterContent = (id, type) => {
    if (type === "all") {
      API.getUserData(userState.id).then(async (userdata) => {
        await setGeoState(userdata.geo);
        await setJournalEntries(userdata.entry.map(({ id, title, date, body }) => ({ id, title, date, body })));
        await setPhotos(userdata.photo.map(({ id, url, EntryId: entryId, GeroId: geoId }) => ({ id, url, entryId, geoId })));
      });
    }
    if (type === "geo") {
      API.filterByPoint(id).then((geodata) => {
        // cycle through both the geo and entry records for the included photos
        setGeoState(geodata);
        if (geodata[0].Entries.length > 0) {
          console.log("true")
          setJournalEntries(geodata[0].Entries.map(({ id, title, date, body }) => ({ id, title, date, body })));
        }
        if (geodata[0].Photos.length > 0) {
          console.log("true")
          setPhotos(geodata[0].Photos.map(({ id, url, EntryId: entryId, GeroId: geoId }) => ({ id, url, entryId, geoId })));
        }

      });
    }
    // return null

  }

  return (

    <GeoStateContext.Provider value={{ geoState, journalEntries, photos, inputState, userState, editEntry, handleInputChange, handleFilterContent, deleteReset }}>
      <div className="App">
        <Hero />
        <div class="container">
          <div class="columns">
            <div class="column">
              <Map />
            </div>
            <div class="column">
              <Router>
                <WindowNav handleViewSwitch={handleViewSwitch} />
                <div class="columns">
                  {/* Router buttons for map and journal */}
                  <div class="column">
                    {viewState === "journal" ? <Journal /> : <Photos />}
                    {/* <Route exact path="/Journal" component={Journal} />
                    <Route exact path="/photos" component={Photos} /> */}
                  </div>
                </div>
              </Router>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </GeoStateContext.Provider>
  );
}

export default App;
