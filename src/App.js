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
import LandingPage from "./components/LandingPage";

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
  useEffect(() => {
    handleFilterContent(0, "all")
  }, []);
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
    console.log("delete reset")
    API.getUserData(userState.id).then(async (userdata) => {
      await setJournalEntries(userdata.entry.map(({ id, title, date, body }) => ({ id, title, date, body })));
    });
  };
  const handleFilterContent = (id, type) => {
    if (type === "all") {
      API.getUserData(userState.id).then(async (userdata) => {
        await setGeoState(userdata.geo);
        await setJournalEntries(userdata.entry.map(({ id, title, date, body }) => ({ id, title, date, body })));
        await setPhotos(userdata.photo.map(({ id, url, EntryId: entryId, GeroId: geoId }) => ({ id, url, entryId, geoId })));
        console.log(userdata)
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
    <GeoStateContext.Provider value={{ geoState, journalEntries, photos, userState, handleFilterContent, deleteReset }}>
      
      <Router>
       <div className="App">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
             <Route exact path="/Login">
              <LandingPage />
            </Route> 
            <Route path="/">
            <Hero />
        <div className="container">
          <div className="columns">
            <div className="column">
              <Map />
            </div>
            <div className="column">
                <WindowNav handleViewSwitch={handleViewSwitch}/>
                <div className="columns">
                  {/* Router buttons for map and journal */}
                  <div className="column">
                    {viewState==="journal"? <Journal /> : <Photos />}
                    {/* <Route exact path="/Journal" component={Journal} />
                    <Route exact path="/photos" component={Photos} /> */}
                  </div>
                </div>
              
            </div>
          </div>
        </div>
        <Footer />
            </Route>
          </Switch>
       </div>
      </Router>
    </GeoStateContext.Provider>
  );
}

export default App;
