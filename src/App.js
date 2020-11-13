import logo from "./logo.svg";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hero from "./components/Hero";
import WindowNav from "./components/WindowNav";
import Map from "./pages/Map";
import Journal from "./pages/Journal";
import Photos from "./pages/Photos";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Hero />
      <div class="container">
        <div class="columns">
          <div class="column">
            <Map />
          </div>
          <div class="column">
            <Router>
              <WindowNav />
              <div class="columns">
                {/* Router buttons for map and journal */}
                <div class="column">
                  <Route exact path="/" component={Journal} />
                  <Route exact path="/photos" component={Photos} />
                </div>
              </div>
            </Router>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
