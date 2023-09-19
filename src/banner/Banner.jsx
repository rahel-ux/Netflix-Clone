import { useState, useEffect } from 'react';
import './banner.css';
import axios from '../axios';
import requests from '../requests';


const Banner = () => {
    const [movie, setMovie] = useState({})

    useEffect(()=>{
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ]
                );
        };
        fetchData()

    }, [])


    // const truncate = (str, n) => (str.length > n ? str.substr(0, n)+ "..." : str);
    const truncate = (str, n) => 
       str?.length > n ? str.substr(0, n - 1) + "..." : str;
    

// console.log(movie)
  return (
    <>
      <div
        style={{
          background: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundSize: "cover",
        }}
        className='banner'
      >
        <div className="pt-[200px] pl-[50px] w-[400px] text-white flex flex-col gap-5">
          <h1 className="font-bold text-4xl">
            {movie?.name || movie?.title || movie?.original_name}
          </h1>
          <div className="flex gap-3">
            <button className="px-4 py-1 bg-[#3939399d] text-[#fff] outline-none border-none rounded-sm hover:text-[#000] hover:bg-[#e6e6e6]">
              Play
            </button>

            <button className="px-4 py-1 bg-[#3939399d] text-[#fff] outline-none border-none rounded-sm hover:text-[#000] hover:bg-[#e6e6e6]">
              My List
            </button>
          </div>
          <p>
            {truncate(
              `${movie?.overview}`, 150
            )}
          </p>
        </div>
        <div className="banner-faded" />
      </div>
    </>
  );
}

export default Banner