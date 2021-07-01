'use strict'
const WEATHER_API_KEY= process.env.WEATHER_API_KEY;
const Forecast=require('../model/Forecast.Model');
const Cache=require('../memory/Cache.memory')
const axios = require('axios'); // require the package


let cahe1=new Cache();
cahe1['data']=[]
let dayM;
let dateByDay;
const weatherControl=(req, res)=>{
    let weather=[];
    let lat=req.query.lat;
    let lon=req.query.lon;
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    let day=new Date();
    let dayChange=day.getDate();

    if(lat&&lon){
      if(cahe1.data.length>0 && dayChange===dateByDay){
        weather=cahe1.data.map(item=>{
          return new Forecast(item);
        })
        res.json(weather)
        
        
      }else{

        dayM =new Date();
        dateByDay =dayM.getDate();
          axios.get(url).then(response => {
          weather=response.data;
        let  forecast=response.data.data.map(item=>{
            return new Forecast(item)
          })
          res.json(forecast)
          cahe1['data']=response.data.data;
         
        }).catch(err=>{
          res.status(500).send(`error in getting data ==> ${err}`)
        })

      }
    }else{
      res.send('pleass provide your city name')
    }

   
  
}

module.exports=weatherControl;