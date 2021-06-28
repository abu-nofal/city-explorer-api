const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData= require('./data/weather.json')
require('dotenv').config();
app.use(cors()) // after you initialize your express app instance


const PORT=process.env.PORT

// app.listen(process.PORT) // kick start the express server to work
app.listen(PORT, ()=>{
    console.log('started server on port 8000')
}) // kick start the express server to work


// a server endpoint (api)
app.get('/',  (req, res) =>{ // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})





app.get('/weather', (req, res)=>{
     
  res.send(weatherData)
    
})

app.get('/weather?city_name=Amman', (req, res)=>{
     
    res.send(weatherData.find(({ city_name }) => city_name === 'Amman'))
      
  })




class Forecast {
    constructor(data){
        this.description = data.weather.description

        this.date= data.valid_date;
    }
}



app.get('*',(req,res)=>{
   
    res.status(404).send('invalid request to backend')
});