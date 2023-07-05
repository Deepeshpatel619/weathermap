const mongoose=require("mongoose");
const mySecret="DATABASE URL";

mongoose.connect(mySecret,{useNewUrlParser:true, useUnifiedTopology:true})
                   .then(()=>console.log("connected"))
                   .catch((err)=>console.log(err));


const weatherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country: String,
    lon:Number,
    lat:Number,
    temp:Number,
    status:String
});

const Forecast=new mongoose.model("Forecast",weatherSchema);


// const createForecast=new Forecast({
    // name:"bhopal",
    // country:"IN",
    // lon: 77.4,
    // lat: 23.2667,
    // temp:35,
    // status:"sunny"
// });
// const data= createForecast.save();

module.exports=Forecast;
