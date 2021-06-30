'use strict'
const MOVIE_API_KEY=process.env.MOVIE_API_KEY
const Movie=require('../model/Movie.Model')
const axios = require('axios'); // require the package



const moviesControl=(req, res)=>{
   let city_name=req.query.city
  let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`

  let moveResponce=axios.get(urlMove).then(response => {
    let movie=response.data.results.map(item=>{
      return new Movie(item)
    })
    res.json(movie)
  }).catch(err=>{
    res.status(500).send(`error in getting data ==> ${err}`)
})
}

module.exports=moviesControl;

