import { createContext, useState } from "react"

import { useRouter } from "next/router"

//import slug from "slug"
/*
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH_TERMS":
            return {
                ...state,
                searchTitle: action.payload.title,
                movieType: action.payload.type,
                year: action.payload.year
            }
        case "SET_SEARCH_RESULTS":
            return {
                ...state,
                searchResultsList: [...state.searchResultsList, action.payload]
            }
        case "ADD_MOVIE_TO_FAVORITES":
            return {
                ...state,
                favoritesList: [...action.payload, state.favoritesList]
            }
        case "UPDATE_LOCAL_STORAGE":
            let prev = JSON.parse(localStorage.getItem("favorites")) || []
            prev = [...prev, action.payload]
            localStorage.setItem("favorites", JSON.stringify(prev))
            return action.payload
        case "UPDATE_CONTEXT_FAVORITES":
            return {
                ...state,
                favoritesList: [JSON.parse(localStorage.getItem("favorites")) || []]
            }
        case "DELETE_MOVIE_FROM_FAVORITES":
            return {
                ...state,
                favoritesList: [...state.favoritesList.filter((movie) => movie !== action.payload)]
            }
        default:
            return state
    }
}

const initialState = {
    favoritesList: [],
    searchResultsList: [],
    searchTitle: "",
    movieType: "",
    year: ""
}
*/
export const GlobalState2 = createContext()

export const GlobalStateProvider2 = ({ children }) => {
    //const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useState({
        query: "",
        type: "",
        year: ""
    })
    const [searchResults, setSearchResults] = useState([])
    const [favorites, setFavorites] = useState([])

    // Functions for search and keep parameters and results
    const setSearchParameters = (query, year, type) => {
        setSearchParams({
            query: query,
            type: type,
            year: year
        })
    }

    const setResults = (movies) => {
        setSearchResults(movies)
    }

    const isLoading = (loading) => {
        setLoading(loading)
    }

    const router = useRouter()

    const searchMovies = async (name, year) => {
        //let totalPage = 0
        isLoading(true)
        const getMovies = async (pageNo = 1) => {
            let apiResults = await fetch(
                `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${name}&y=${year}&page=${pageNo}`
            ).then((resp) => resp.json())
            return apiResults
        }
        let total = []
        const getAll = async (pageNo = 1) => {
            const results = await getMovies(pageNo)
            total = [...total, ...results.Search]
            console.log("Retrieving data from api for page :" + pageNo)
            if (results.Response == "False" || results.Search.length < 10 || pageNo == 5) {
                setResults(total)
                isLoading(false)
                router.push("/search-results")
                return
            } else {
                return total.concat(await getAll(pageNo + 1))
            }
            /*if (pageNo == 1) {
                totalPage = Math.ceil(results.totalResults / 10)
            }
            if (pageNo <= totalPage) {
                return results.Search.concat(await getAll(pageNo + 1))
            } else {
                setResults(results)
                isLoading(false)
                router.push("/search-results")
            }
            */
        }
        getAll()
    }
    /*
    const searchMovies = async (name, year) => {
        let pageNo = 1
        let movies = []

        isLoading(true)

        while (1) {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${name}&y=${year}&page=${pageNo}`
            )
            const resp = await res.json()
            if (resp.Response == "False" || resp.Search.length < 10 || pageNo >= 100) {
                setResults(movies)
                isLoading(false)
                console.log(movies)
                break
            } else {
                movies.concat(resp.Search)
                pageNo++
            }
        }
        console.log(movies)
        router.push("/search-results")
    }
*/
    const getFavoritesFromLocalStorage = (favs) => {
        setFavorites(favs)
    }

    const addToFavorites = (movie) => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || []
        favorites = [...favorites, movie]
        localStorage.setItem("favorites", JSON.stringify(favorites))
        setFavorites(favorites)
    }
    // End of functions

    return (
        <GlobalState2.Provider
            value={{
                setSearchParameters,
                isLoading,
                loading,
                searchResults,
                favorites,
                searchMovies,
                searchParams,
                addToFavorites,
                getFavoritesFromLocalStorage
            }}
        >
            {children}
        </GlobalState2.Provider>
    )
}

//export default GlobalState2
