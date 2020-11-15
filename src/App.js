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

  useEffect(() => {
    // need to replace this hardcode with the return from the login/token stuff
    API.getUserData(userState.id).then((userdata) => {
      // cycle through both the geo and entry records for the included photos
      let geoPhoto = userdata.geo.map((e) => e.Photos);
      let entryPhoto = userdata.entry.map((e) => e.Photos);
      // flatten the array of arrays to one array
      geoPhoto = geoPhoto.flat();
      // entryPhoto = entryPhoto.flat();
      // join the two arrays together
      const photos = geoPhoto//.concat(entryPhoto);

      setGeoState(userdata.geo);
      setJournalEntries (userdata.entry.map(({id,title,date,body})=>({id,title,date,body})));
      setPhotos(photos.map(({id,url,EntryId:entryId,GeroId:geoId})=>({id,url,entryId,geoId})));
    });
  }, []);

  const handleViewSwitch = (event) =>{
    console.log(event)
    if(event.target.id==="journalBtn"){
      setViewState("journal")
    }else if(event.target.id==="photoBtn"){
      setViewState("button")
    }
  }

  return (

    <GeoStateContext.Provider value={{geoState,journalEntries,photos,userState}}>
      <div className="App">
        <Hero />
        <div class="container">
          <div class="columns">
            <div class="column">
              <Map />
            </div>
            <div class="column">
              <Router>
                <WindowNav handleViewSwitch={handleViewSwitch}/>
                <div class="columns">
                  {/* Router buttons for map and journal */}
                  <div class="column">
                    {viewState==="journal"? <Journal /> : <Photos />}
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
