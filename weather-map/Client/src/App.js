import React,{useState,useEffect} from "react";
import {Map} from './map';



function App() { 
  const [data,setData]=useState([]);
  useEffect(()=>{
      fetch("https://weathermap.arjunpatel38.repl.co/data")
       .then((res)=>res.json())
        .then((result)=>{setData(result)});
  },[]); 
   return(
     <Map data={data}/> 
    );
} 

export default App;
