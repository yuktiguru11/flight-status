import axios from "axios";
import { useEffect, useState } from "react"; 
import {  useNavigate } from 'react-router-dom';

function FlightDetails(flightId){
const[flightData, setflightData]= useState([]) 

  

const flightDetails = (flightId) => {
  axios.get('https://flight-status-mock.core.travelopia.cloud/flights/'+flightId)
      .then(response => {
          // Handle the API response data
          setflightData(response.data);
          console.log(flightData)
      })
      .catch(error => {
          // Handle errors
          console.error('Error fetching data:', error);
      });
}

flightDetails();

    return (
        <>
        {flightData.map((item) => (
            <div>
            <li key={item.id}>Flight Number : {item.flightNumber}</li>
            <li key={item.id}>Airplane: {item.airline}</li>
            <li key={item.id}>Origin : {item.origin}</li>
            <li key={item.id}>Destination : {item.destination}</li>
            </div>
            
        ))}
        </>
    )
}

export default FlightDetails;