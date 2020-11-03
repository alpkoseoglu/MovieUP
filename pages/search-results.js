import { useState, useEffect, useContext } from "react"

import Page from "./Page"
import Head from "next/head"
import SearchComponent from "../components/SearchComponent"
import SingleMovie from "../components/SingleMovie"
import Pagination from "../components/Pagination"

import { GlobalState2 } from "../context/GlobalState2"

const SearchResults = () => {
    const [movies, setMovies] = useState([])
    const [type, setType] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [moviePerPage] = useState(5)
    const [currentMovies, setCurrentMovies] = useState([])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const { loading, searchResults, searchParams } = useContext(GlobalState2)

    useEffect(() => {
        let indexOfLastMovie = currentPage * moviePerPage
        let indexOfFirstMovie = indexOfLastMovie - moviePerPage
        setCurrentMovies(movies.slice(indexOfFirstMovie, indexOfLastMovie))
    }, [currentPage])

    useEffect(() => {
        setMovies(searchResults.sort((a, b) => b.Year - a.Year))
    }, [searchResults])

    useEffect(() => {
        setType(searchParams.type)
        setCurrentMovies(searchResults.slice(0, moviePerPage))
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <Page>
            <Head>
                <title>MovieUp - Search Results</title>
            </Head>
            <SearchComponent />
            <div className="breadcrumbs">
                <span>Home / </span>
                <span>Search results</span>
            </div>
            <div className="results-header">
                <h2>
                    Search Result : <span>{searchParams.query}</span>
                </h2>
            </div>
            <div className="results-container">
                {currentMovies.length > 0 ? (
                    currentMovies.map((mov, i) => <SingleMovie key={i} mov={mov.imdbID} type={type} />)
                ) : (
                    <h1>Not Found!</h1>
                )}
            </div>
            <Pagination moviePerPage={moviePerPage} totalMovies={movies.length} paginate={paginate} />
        </Page>
    )
}

export default SearchResults
