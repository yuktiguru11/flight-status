import axios from "axios";
import { useEffect, useState } from "react";
import FlightDetails from "./FlightDetails";
import {  useNavigate } from 'react-router-dom';

function FlightGrid (){

    const[data, setData]= useState([]) 
    const[clicked, setClicked]= useState(false)
    const navigate = useNavigate();
  const handleClick = () => {
    setClicked(true);
    navigate('/details'); 
}
const fetchData = () => {
    axios.get('https://flight-status-mock.core.travelopia.cloud/flights')
        .then(response => {
            // Handle the API response data
            setData(response.data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
};

useEffect(()=>{
  fetchData();
  setInterval(fetchData, 50000);

    
},[])
    return (
        <>
            <table className="table-auto border-separate border border-slate-500 ">
<thead>
    <tr>
      <th>Flight Number</th>
      <th>Airline</th>
      <th>Origin</th>
      <th>Destination</th>
      <th>Departure Time</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={handleClick}>
                {clicked && <FlightDetails flightId={item.id}/>}
              <td>{item.flightNumber}</td>
              <td>{item.airline}</td>
              <td>{item.origin}</td>
              <td>{item.destination}</td>
              <td>{item.departureTime}</td>
              <td>{item.status}</td>
              {/* Render additional columns as needed */}
            </tr>
          ))}
        </tbody>
</table>
        </>
    )

}

export default FlightGrid;