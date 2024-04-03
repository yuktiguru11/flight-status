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
        <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-900 py-10">
	        <h1 class="text-lg text-gray-400 font-medium">Flight Status</h1>
	        <div class="flex flex-col mt-6">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-hidden sm:rounded-lg"></div>
        
                    <table className="shadow-lg bg-white">
                        <thead>
                            <tr>
                            <th className="bg-blue-100 border text-left px-8 py-4">Flight Number</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Airline</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Origin</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Destination</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Departure Time</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Status</th>
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
                </div>
			</div>
		</div>
    )

}

export default FlightGrid;