import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
  const [userState, setUserState] = useState(
  );
  const [refresh, setRefresh] = useState(true
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.checkAuth(token).then(profileData => {
      if (profileData) {
        setUserState({
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          token: token,
          isLoggedIn: true
        }, handleFilterContent(profileData.id, "all"))
        setInputState({
          ...inputState,
          UserId: profileData.id,
        });
      } else {
        // TODO: change the user id 1 hardcodes
        localStorage.removeItem("token");
        setUserState({
          id: "",
          name: "",
          email: "",
          token: "",
          isLoggedIn: false
        }, handleFilterContent(1, "all"))
        setInputState({
          ...inputState,
          UserId: 1,
        });
      }

    })
  }, [refresh]);

  const [inputState, setInputState] = useState({
    title: "",
    date: "",
    body: "",
    UserId: ""
  });

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
    setInputState({
      ...inputState,
      title: "",
      date: "",
      body: ""
    });
  };

  const handleFilterContent = (id, type) => {
    if (type === "all") {
      API.getUserData(id).then(async (userdata) => {
        if (userdata) {
          await setGeoState(userdata.geo);
          await setJournalEntries(userdata.entry.map(({ id, title, date, body }) => ({ id, title, date, body })));
          await setPhotos(userdata.photo.map(({ id, url, EntryId: entryId, GeroId: geoId }) => ({ id, url, entryId, geoId })));
        }
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
  const fireRefresh = () => {
    setRefresh(!refresh)
  }

  const handleLogout = () => {
    console.log("Fire logout");
    localStorage.removeItem("token");
    setUserState({
      id: "",
      name: "",
      email: "",
      token: "",
      isLoggedIn: false
    })
  }

  return (
    <GeoStateContext.Provider value={{ geoState, journalEntries, photos, inputState, userState, editEntry, handleInputChange, handleFilterContent, deleteReset, fireRefresh }}>

      <Router>
        <div className="App">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <LandingPage fireRefresh={fireRefresh} />
            </Route>
            <Route path="/dashboard">
              <Hero handleLogout={handleLogout} />
              <div className="container">
                <div className="columns">
                  <div className="column">
                    <Map />
                  </div>
                  <div className="column">
                    <WindowNav handleViewSwitch={handleViewSwitch} />
                    <div className="columns">
                      {/* Router buttons for map and journal */}
                      <div className="column">
                        {viewState === "journal" ? <Journal /> : <Photos />}
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
