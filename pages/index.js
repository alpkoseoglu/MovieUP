import Page from "./Page"
import Head from "next/head"
import Link from "next/link"
import SearchComponent from "../components/SearchComponent"
import { useEffect, useContext, useState } from "react"
import { GlobalState2 } from "../context/GlobalState2"
import { ids } from "../data/data"

const HomePage = ({ movies }) => {
    const { getFavoritesFromLocalStorage } = useContext(GlobalState2)

    const [currentMovie, setCurrentMovie] = useState(0)

    const goLeft = () => {
        currentMovie == 0 ? setCurrentMovie(movies.length - 1) : setCurrentMovie(currentMovie - 1)
    }
    const goRight = () => {
        currentMovie == movies.length - 1 ? setCurrentMovie(0) : setCurrentMovie(currentMovie + 1)
    }

    useEffect(() => {
        if (localStorage) {
            if (localStorage.getItem("favorites")) {
                getFavoritesFromLocalStorage(JSON.parse(localStorage.getItem("favorites")))
            } else {
                localStorage.setItem("favorites", JSON.stringify([]))
            }
        }
    }, [])
    return (
        <Page>
            <Head>
                <title>MovieUp - Homepage</title>
            </Head>
            <main>
                <div className="hero">
                    <div className="hero-text">
                        <h1>
                            Welcome to
                            <br />
                            <span>MovieUP</span>
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris
                        </p>
                    </div>
                    <SearchComponent />
                </div>
                <div className="carusel">
                    <div className="carusel-header">
                        <h2>Popular Movies</h2>
                        <Link href="/popular-movies">
                            <a>View more &#10132;</a>
                        </Link>
                    </div>
                    <div className="carusel-area">
                        <button className="arrow left" onClick={goLeft}>
                            &#60;
                        </button>

                        {movies && (
                            <div key={currentMovie} className="movie-card">
                                <div className="poster">
                                    <img
                                        src={
                                            movies[currentMovie].Poster == "N/A"
                                                ? "/image-not-available.png"
                                                : movies[currentMovie].Poster
                                        }
                                        alt={`${movies[currentMovie].Title} movie poster.`}
                                    />
                                </div>
                                <div className="movie-details">
                                    <div className="imdb-info">
                                        <Link href={`https://www.imdb.com/title/${movies[currentMovie].imdbID}`}>
                                            <a target="_blank">
                                                <img src="/imdb.png" alt="imdb" />
                                            </a>
                                        </Link>
                                        <p>{movies[currentMovie].imdbRating}</p>
                                        <button>{movies[currentMovie].Genre.split(" ")[0].replace(",", "")}</button>
                                        <button>
                                            {movies[currentMovie].Genre.split(" ").length > 1
                                                ? movies[currentMovie].Genre.split(" ")[1].replace(",", "")
                                                : ""}
                                        </button>
                                    </div>
                                    <div className="movie-title-details">
                                        <h6>{movies[currentMovie].Year}</h6>
                                        <h3>{movies[currentMovie].Title}</h3>
                                        <p>{movies[currentMovie].Plot}</p>
                                    </div>
                                    <div className="actions">
                                        <button>
                                            <i className="far fa-heart"></i> Add to Favorites
                                        </button>
                                        <Link href={`/movie/${movies[currentMovie].imdbID}`}>
                                            <a>
                                                <small>View Details</small>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button className="arrow right" onClick={goRight}>
                            &#62;
                        </button>
                    </div>
                </div>
            </main>
        </Page>
    )
}

export async function getStaticProps() {
    let movies = []

    for (let i = 0; i < ids.length; i++) {
        const res = await fetch(`https://www.omdbapi.com/?i=${ids[i]}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        const resp = await res.json()
        movies.push(resp)
    }

    return {
        props: { movies }
    }
}

export default HomePage
