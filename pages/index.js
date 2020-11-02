import Page from "./Page"
import Head from "next/head"
import Link from "next/link"
import SearchComponent from "../components/SearchComponent"
import { useEffect, useContext, useState } from "react"
import { GlobalState2 } from "../context/GlobalState2"

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
                        <a href="">View more &#10132;</a>
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
                                        <button>{movies[currentMovie].Genre.split(" ")[0]}</button>
                                        <button>
                                            {movies[currentMovie].Genre.split(" ").length > 1
                                                ? movies[currentMovie].Genre.split(" ")[1]
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
                                        <Link href="#">
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
    const ids = [
        "tt0111161",
        "tt0068646",
        "tt0071562",
        "tt0468569",
        "tt0050083",
        "tt0108052",
        "tt0167260",
        "tt0110912",
        "tt0060196",
        "tt0137523"
        /*"tt7286456",
        "tt0120737",
        "tt0109830",
        "tt1375666",
        "tt0080684",
        "tt0167261",
        "tt0133093",
        "tt0073486",
        "tt0099685",
        "tt0047478",
        "tt0114369",
        "tt0317248",
        "tt0118799",
        "tt0102926",
        "tt0076759",
        "tt0038650",
        "tt0120815",
        "tt0245429",
        "tt0120689",
        "tt0110413",
        "tt0056058",
        "tt0816692",
        "tt0114814",
        "tt0110357",
        "tt0120586",
        "tt0088763",
        "tt0253474",
        "tt0027977",
        "tt0103064",
        "tt1675434",
        "tt0054215",
        "tt0172495",
        "tt0021749",
        "tt0407887",
        "tt2582802",
        "tt0064116",
        "tt0482571",
        "tt4154796",
        "tt0034583",
        "tt0095327",
        "tt0047396",
        "tt0095765",
        "tt0078748",
        "tt0082971",
        "tt0209144",
        "tt0078788",
        "tt0032553",
        "tt0405094",
        "tt4154756",
        "tt1853728",
        "tt4633694",
        "tt0081505",
        "tt0050825",
        "tt0910970",
        "tt0043014",
        "tt0057012",
        "tt0119698",
        "tt0364569",
        "tt0051201",
        "tt1345836",
        "tt0087843",
        "tt6751668",
        "tt0090605",
        "tt0169547",
        "tt2380307",
        "tt5311514",
        "tt0112573",
        "tt0082096",
        "tt1187043",
        "tt0986264",
        "tt0086190",
        "tt0114709",
        "tt0105236",
        "tt0086879",
        "tt5074352",
        "tt0119217",
        "tt0361748",
        "tt0022100",
        "tt0180093",
        "tt0062622",
        "tt0052357",
        "tt0338013",
        "tt0033467",
        "tt0093058",
        "tt2106476",
        "tt0053125",
        "tt0066921",
        "tt0208092",
        "tt0211915",
        "tt0012349"
        */
    ]

    let movies = []

    for (let i = 0; i < ids.length; i++) {
        const res = await fetch(`https://www.omdbapi.com/?i=${ids[i]}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        const resp = await res.json()
        movies.push(resp)
    }
    /*
    ids.map(async (id) => {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        const resp = await res.json()
        movies.push(resp)
    })
*/
    //const res = await fetch(`https://www.omdbapi.com/?i=tt0012349&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
    //const movies = [await res.json()]

    return {
        props: { movies }
    }
}

export default HomePage
