const express = require("express");
const requests = require('requests');
const app = express();
const cors = require('cors');
const Forecast = require('./database.js');
const { response } = require("express");

const PORT = process.env.PORT || 8080;
app.use(cors());

const cities=[
        'Betul',
        'Bhind',
        'Bhopal',
        'Burhanpur',
        'Chhatarpur',
        'Chhindwara',
        'Damoh',
        'Datia',
        'Dewas',
        'Dhar',
        'Dindori',
        'Guna',
        'Gwalior',
        'Harda',
        'Hoshangabad',
        'Indore',
        'Jabalpur',
        'Jhabua',
        'Katni',
        'Mandla',
        'Mandsaur',
        'Morena',
        'Narsinghpur',
        'Panna',
        'Rewa',
        'Rajgarh',
        'Ratlam',
        'Raisen',
        'Sagar',
        'Satna',
        'Sehore',
        'Vidisha',
];
async function find() {
    let info =new Promise(function(resolve,reject){
        Forecast.find({},(err,data)=>{
          if(err) return reject(err);  
        // console.log(data)
          resolve(data);
        });
    });
    return info;
} 

function updateData(city){
    let message='';
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${city},{country%20code}&appid=APIKEY`)
    .on('data', function (chunk) {
        const jsondata = JSON.parse(chunk);
        const data = [{
            name: jsondata.name,
            country: jsondata.sys.country,
            lon: jsondata.coord.lon,
            lat: jsondata.coord.lat,
            temp: jsondata.main.temp,
            status: jsondata.weather.main
        }]; 
        Forecast.create(data)
            .then((data)=>{
            message="Sucessfully Added!";    
            // console.log(data)
        }).catch((err)=>console.log("Error while updating :"+err));
    })
    .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
    });
    return message;
}

app.get('/data',async (req, res) => {
    const data = await find();
    res.json(data);
})
app.get('/', (req, res) => {
    res.send("HOME")
}) 

app.get('/update',(req, res) => {
       let response=""; 
       cities.map( async(cityName)=>{
         response =await updateData(cityName) 
        });
        res.send(response);
});

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`server is started at http://localhost:${PORT}/`)

}); 
