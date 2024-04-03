import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter  as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FlightGrid from "./FlightGrid";
import FlightDetails from "./FlightDetails";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<FlightGrid/>}/>
          <Route path="/details" component = {FlightDetails}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
