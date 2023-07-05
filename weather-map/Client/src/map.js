import { React, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "./marker.png";
import L, { marker } from "leaflet";

import './Popup.css';


const mark = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 30],
});  
  
function makeMarker(city){ 
    console.log(city.status)
    const temperature=parseFloat(city.temp- 273.15);
    return( 
        <>
        <Marker
        position={[city.lat,city.lon]}
        icon={mark}
    >
        <Popup  >
           <div className="head">
           <p className="name">{city.name} <span>{city.country}</span></p> 
           <p>Temperature: {temperature.toFixed(2)} &deg;C</p>
           <p>{city.status}</p>
           </div>
           
        </Popup>
    </Marker>
    </> 
    );
}
 function Map(props) { 
     console.log(props.data)
   
    const [centre, setCentre] = useState([23.2599333, 77.41261499999996])
    return (
        <div className='map'>
            <MapContainer style={{ height: "100vh" }} center={centre} zoom={5} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                   {props.data.map((city)=>makeMarker(city))}
        
            </MapContainer>
        </div>
    );

} 

export {Map,makeMarker,mark};