import { useState, useEffect, useContext } from "react"
import Link from "next/link"

import { GlobalState2 } from "../context/GlobalState2"

const SingleMovie = ({ mov, type }) => {
    const { favorites, addToFavorites } = useContext(GlobalState2)

    const [movie, setMovie] = useState({})

    let storedMovie = favorites.find((item) => item.imdbID === mov)

    useEffect(() => {
        const fetchMovie = () => {
            fetch(`https://www.omdbapi.com/?i=${mov}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((data) => data.json())
                .then((resp) => {
                    if (resp.Genre.includes(type)) {
                        setMovie(resp)
                    }
                })
        }
        fetchMovie()
    }, [])

    if (!movie.Title) {
        return null
    }
    return (
        <div className="movie-card">
            <div className="poster">
                <div className="image-div">
                    <img
                        src={movie.Poster == "N/A" ? "./image-not-available.png" : movie.Poster}
                        alt={`${movie.Title} movie poster`}
                    />
                </div>
                <button>{type ? type : movie.Genre ? movie.Genre.split(" ")[0] : "Not Found"}</button>
                <button onClick={() => addToFavorites(movie)} disabled={storedMovie}>
                    <i className="far fa-heart"></i>
                </button>
            </div>
            <div className="movie-details">
                <div className="imdb-info">
                    <Link href={`https://www.imdb.com/title/${movie.imdbID}`}>
                        <a target="_blank">
                            <img src="/imdb.png" alt="imdb" />
                        </a>
                    </Link>
                    <p>{movie.imdbRating}</p>
                </div>
                <div className="movie-title-details">
                    <h6>{movie.Year}</h6>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Plot}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleMovie

/*
        return (
            <div className="movie-card">
                <div className="poster">
                    <img src={movie.Poster !== "N/A" ? movie.Poster : "./poster.jpg"} alt="poster"/>
                    <button>{type ? type : movie.Genre ? movie.Genre.split(" ")[0] : "Not Found"}</button>
                    <button onClick={() => addMovieToFavorites(movie)} disabled={storedMovie}><i className="far fa-heart"></i></button>
                </div>
                <div className="movie-details">
                    <div className="imdb-info">
                        <Link href={`https://www.imdb.com/title/${movie.imdbID}` }><a target="_blank"><img src="/imdb.png" alt="imdb" /></a></Link>
                        <p>7.8</p>
                    </div>
                    <div className="movie-title-details">
                        <h6>{movie.Year}</h6>
                        <h3>{movie.Title}</h3>
                        <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
        )
    */
