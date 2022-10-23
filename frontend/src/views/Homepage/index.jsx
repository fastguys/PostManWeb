import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "../TopBar/TopBar";
import "./homepage.css"
const HomePage = () => {
  //
  const [searchLocationBox, setSearchLocationBox] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // handle the search location box change
  const handleChange = (event) => {
    setSearchLocationBox(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("searchLocationBox", searchLocationBox);
    // set the search location
    setSearchLocation(searchLocationBox);
    setSearchLocationBox("");
  };

  // handle the search location, TODO: need to call google map API later
  useEffect(() => {
    if (searchLocation) {
      console.log("searchLocation", searchLocation);
    }
    // console.log("searchLocation", searchLocation);
  }, [searchLocation]);






  if (!localStorage.getItem("authenticated")) {
    return <Navigate to="/" replace={true}/>;
  } else {
    return (
        <div>
          <ResponsiveAppBar />
          <div className="task-taker-panel">
            <div className="task-taker-title">
              <div>Task Taker Page</div>
            </div>
            <div className="task-taker-panel-left">
              <div className="task-taker-search-bar">
                <form onSubmit={handleSubmit} >
                  <input type="text" value={searchLocationBox} onChange={handleChange} placeholder="Enter address you want to search for task..." className="task-taker-search-input"/>
                  <input type="submit" value="Submit" />
                </form>
              </div>
              <div className="task-taker-search-map">
                <div>Map</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default HomePage;
