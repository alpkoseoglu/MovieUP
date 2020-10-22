import Page from "../components/page"
import Head from "next/head"
import {useEffect, useState} from "react"

import SingleMovie from "../components/SingleMovie"

const Favorites = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites"))
        setMovies(favorites)
        
    },[])

    return (
        <Page>
            <Head>
                <title>MovieUp - Favorites</title>
            </Head>
            <div className="breadcrumbs">
                <span>Home / </span><span>Favorites</span>
            </div>
            <div className="favorites-header">
                <h2>Favorites</h2>          
            </div>
            <div className="results-container">
                {movies && movies.map(movie => <SingleMovie key={movie} mov={movie} type={""}/>)}
            </div>
        </Page>
    )
}

export default Favorites