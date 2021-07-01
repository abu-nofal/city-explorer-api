'use strict'
class Movie{
    constructor(data){
      this.average_votes = data.vote_average;
  
      this.total_votes=data.vote_count

      this.popularity=data.popularity
  
      this.released_on=data.release_date

      if(data.poster_path){

        this.image_url= 'https://image.tmdb.org/t/p/w185'+data.poster_path
      }
  
  }
  }

module.exports=Movie