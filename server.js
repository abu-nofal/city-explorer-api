const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios'); // require the package
// const weatherData= require('./data/weather.json')
require('dotenv').config();
app.use(cors()) // after you initialize your express app instance

// inside your callback function


const PORT=process.env.PORT
const WEATHER_API_KEY= process.env.WEATHER_API_KEY
const MOVIE_API_KEY=process.env.MOVIE_API_KEY




app.get('/',  (req, res) =>{ 
  res.send('Hello World') 
})



// ================================== for weather 

app.get('/weather', (req, res)=>{
    let weather;
    let lat=req.query.lat;
    let lon=req.query.lon;
    

let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
let weatherbitResponde=axios.get(url).then(response => {
  weather=response.data;
  let forecast=weather.data.map(item=>{
    return new Forecast(item)
  })
  // console.log(forecast)
  res.json(forecast)
}).catch(err=>{
  res.status(500).send(`error in getting data ==> ${err}`)
})
  
})

// /movies?city=amman
// ========================================= for movei api 
app.get('/movies', (req, res)=>{
   let city_name=req.query.city
  let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`

  let moveResponce=axios.get(urlMove).then(response => {
    // console.log(response.data.results);
    let movie=response.data.results.map(item=>{
      return new Movie(item)
    })
    res.json(movie)
  }).catch(err=>{
    res.status(500).send(`error in getting data ==> ${err}`)
})


})



class Forecast {
    constructor(data){
        this.description = data.weather.description;

        this.date=data.valid_date
       
    }
}

class Movie{
  constructor(data){
    this.average_votes = data.vote_average;

    this.total_votes=data.vote_count

    this.image_url=data.backdrop_path

    this.popularity=data.popularity

    this.released_on=data.release_date
   
}
}

app.listen(PORT, ()=>{
  console.log('started server on port 8000')
}) 
