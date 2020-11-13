import logo from "./logo.svg";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import Hero from "./components/Hero";
import WindowNav from "./components/WindowNav"
import Map from "./pages/Map";
import Journal from "./pages/Journal"
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
            {/* switch buttons */}
            <WindowNav />
            <div class="columns">
              {/* Router buttons for map and journal */}
              <div class="column">
                <Journal />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
