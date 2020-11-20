import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Hero from "./components/Hero";
import WindowNav from "./components/WindowNav";
import Map from "./components/Map";
import Journal from "./components/Journal";
import Photos from "./components/Photos";
import Footer from "./components/Footer";
import API from "./utils/API";
import GeoStateContext from "./contexts/GeoStateContext";
import LandingPage from "./components/LandingPage";
import stringSimilarity from 'string-similarity';


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
  const [filterState, setFilterState] = useState(false)
  const params = useParams();
  useEffect(() => {
    console.log(params.urlid)
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
    // This converts the date format stored in MySQL to a format that the front end can read and display properly
    const dateTime = res[0].date;
    console.log(dateTime)
    let dateTimeParts = dateTime.split(/[- : T]/);
    console.log(dateTimeParts)
    let showDate = `${dateTimeParts[0]}-${dateTimeParts[1]}-${dateTimeParts[2]}`

    setInputState({
      id: res[0].id,
      title: res[0].title,
      date: showDate,
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
    setInputState({
      ...inputState,
      title: "",
      date: "",
      body: "",
      id: ""
    },fireRefresh());
  };

  const handleFilterContent = (id, type, isOpen) => {
    
    if (type === "all") {
      setFilterState(false)
      API.getUserData(id).then((userdata) => {
        if (userdata) {
          setGeoState(userdata.geo);
          setJournalEntries(userdata.entry);
          setPhotos(userdata.photo);
        }
      });
    } else if (type === "geo") {
      setFilterState(true)
      API.filterByPoint(id).then((geodata) => {
        // cycle through both the geo and entry records for the included photos
        setGeoState(geodata);
        if (geodata[0].Entries.length > 0) {
          console.log("true")
          setJournalEntries(geodata[0].Entries);
        }else{
          setJournalEntries([])
        }
        if (geodata[0].Photos.length > 0) {
          console.log("true")
          setPhotos(geodata[0].Photos);
        }else{
          setPhotos([])
        }
      });
    } else if (type === "entry") {
      setFilterState(true)
      console.log("FIlter by entry", id, isOpen)
      if (isOpen) {
        fireRefresh()
      }
      API.filterByEntry(id).then((entrydata) => {
        console.log(entrydata)
        if (entrydata[0].Geos.length > 0) {
          setGeoState(entrydata[0].Geos)
        } else {
          setGeoState([])
        }
        if (entrydata[0].Photos.length > 0) {
          setPhotos(entrydata[0].Photos)
        } else {
          setPhotos([])
        }
      })
    }
    // return null
  }


  const handleSearchBar = (query) => {
    setFilterState(true)
    const geoFilter = geoState.filter(e => {
      if (stringSimilarity.compareTwoStrings(query.toLowerCase(), e.place.toLowerCase()) > .8) {
        return true
      } else if (e.region && stringSimilarity.compareTwoStrings(query.toLowerCase(), e.region.toLowerCase()) > .8) {
        return true
      } else {
        return false
      }
    })
    const entryFilter = journalEntries.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))
    setGeoState(geoFilter);
    setJournalEntries(entryFilter);
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
            <Route path="/dashboard/:urlid">
              <Hero handleLogout={handleLogout} fireRefresh={fireRefresh} handleSearch={handleSearchBar} />
              <div className="container">
              {filterState?<button onClick={fireRefresh}>unfilter view</button>:null}
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
