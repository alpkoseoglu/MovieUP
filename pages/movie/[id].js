import { useContext } from "react"

import Page from "../Page"
import Head from "next/head"
import Link from "next/link"
import SearchComponent from "../../components/SearchComponent"
import { ids } from "../../data/data"

import { GlobalState2 } from "../../context/GlobalState2"

const MovieDetails = ({ movie }) => {
    const { favorites, addToFavorites } = useContext(GlobalState2)

    const storedMovie = favorites.find((fav) => movie.imdbID == fav.imdbID)

    return (
        <Page>
            <Head>
                <title>MovieUp - Movie Details</title>
            </Head>
            <SearchComponent />
            <div className="breadcrumbs">
                <span>Home / </span>
                <span>Movie Details</span>
            </div>
            <div className="results-header">
                <h2>Movie Details</h2>
            </div>
            <div className="results-container">
                <div className="movie-card">
                    <div className="poster">
                        <div className="image-div">
                            <img
                                src={movie.Poster == "N/A" ? "./image-not-available.png" : movie.Poster}
                                alt={`${movie.Title} movie poster`}
                            />
                        </div>
                        <button>{movie.Genre ? movie.Genre.split(" ")[0].replace(",", "") : "Not Found"}</button>
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
            </div>
        </Page>
    )
}

export async function getStaticPaths() {
    const paths = ids.map((id) => {
        return { params: { id } }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    let data = await fetch(`https://www.omdbapi.com/?i=${params.id}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
    let movie = await data.json()

    return {
        props: { movie }
    }
}

export default MovieDetails
