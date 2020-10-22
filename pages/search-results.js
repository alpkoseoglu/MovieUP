import {useState, useEffect} from "react"

import Page from "./Page"
import Head from "next/head"
import SearchComponent from "../components/SearchComponent"
import SingleMovie from "../components/SingleMovie"

const SearchResults = () => {

    const [movies, setMovies] = useState([])
    const [type, setType] = useState("")

    useEffect(() => {
        if(localStorage.getItem("searchResults").length > 0) {
            setMovies(JSON.parse(localStorage.getItem("searchResults")).sort((a,b) => +b.Year - +a.Year))
            setType(JSON.parse(localStorage.getItem("searchType")))
        } else {
            console.log("Local Storage is empty")
        } 
    },[])

    return (
        <Page>
            <Head>
                <title>MovieUp - Search Results</title>
            </Head>
            <SearchComponent />
            <div className="breadcrumbs">
                <span>Home / </span><span>Search results</span>
            </div>
            <div className="results-header">
                <h2>Search Result : <span>{}</span> </h2>          
            </div>
            <div className="results-container">
                { movies.length > 0 ? movies.map((mov,i) => (
                    <SingleMovie key={i} mov={mov.imdbID} type={type} />
                ))
                : <h1>Not Found!</h1>
            }
            </div>
        </Page>
    )
}

export default SearchResults