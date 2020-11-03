import { useState, useEffect, useContext } from "react"

import Page from "./Page"
import Head from "next/head"
import Link from "next/link"
import SearchComponent from "../components/SearchComponent"
import Pagination from "../components/Pagination"
import { ids } from "../data/data"

import { GlobalState2 } from "../context/GlobalState2"

const PopularMovies = ({ movies }) => {
    const { favorites, addToFavorites } = useContext(GlobalState2)

    const [currentPage, setCurrentPage] = useState(1)
    const [moviePerPage] = useState(5)
    const [currentMovies, setCurrentMovies] = useState([])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        let indexOfLastMovie = currentPage * moviePerPage
        let indexOfFirstMovie = indexOfLastMovie - moviePerPage
        setCurrentMovies(movies.slice(indexOfFirstMovie, indexOfLastMovie))
    }, [currentPage])

    return (
        <Page>
            <Head>
                <title>MovieUp - Popular Movies</title>
            </Head>
            <SearchComponent />
            <div className="breadcrumbs">
                <span>Home / </span>
                <span>Popular Movies</span>
            </div>
            <div className="results-header">
                <h2>Popular Movies</h2>
            </div>
            <div className="results-container">
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie, i) => (
                        <div key={i} className="movie-card">
                            <div className="poster">
                                <div className="image-div">
                                    <Link href="/movie/[id]" as={`/movie/${movie.imdbID}`}>
                                        <img
                                            src={movie.Poster == "N/A" ? "./image-not-available.png" : movie.Poster}
                                            alt={`${movie.Title} movie poster`}
                                        />
                                    </Link>
                                </div>
                                <button>{movie.Genre ? movie.Genre.split(" ")[0] : "Not Found"}</button>
                                <button
                                    onClick={() => addToFavorites(movie)}
                                    disabled={favorites.find((fav) => movie.imdbID == fav.imdbID)}
                                >
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
                    ))
                ) : (
                    <h1>Not Found!</h1>
                )}
            </div>
            <Pagination moviePerPage={moviePerPage} totalMovies={movies.length} paginate={paginate} />
        </Page>
    )
}

export async function getStaticProps() {
    let movies = []

    for (let i = 0; i < ids.length; i++) {
        let data = await fetch(`https://www.omdbapi.com/?i=${ids[i]}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        let res = await data.json()
        movies = [...movies, res]
    }
    return {
        props: { movies }
    }
}

export default PopularMovies
