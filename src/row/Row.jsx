import React from 'react'
import axios from "./../axios"
import { useState, useEffect } from 'react';
import './row.css'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

const handleClick = (movie) => {
  if (trailerUrl) {
    setTrailerUrl("");
  } else {
    movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((err) => console.log(err));
  }
};


  return (
    <div className="text-white pl-5">
      <h2 className='text-[25px] font-bold'>{title}</h2>
      <div className="row-poster flex gap-3 p-5 overflow-x-auto overflow-y-hidden">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            // className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`${
                isLargeRow
               ? "h-[250px] hover:scale-110 transition-transform duration-300 cursor-pointer object-contain"
               :"h-[100px] hover:scale-110 transition-transform duration-300 cursor-pointer object-contain"}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row