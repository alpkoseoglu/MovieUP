import {createContext, useReducer, useEffect} from "react"
import SearchResults from "../pages/search-results"
import AppReducer from "./AppReducer"

const initialState = {
    favoritesList: [],
    searchResultsList: []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Local Storage
    useEffect(() => {
        initialState.favoritesList = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
        initialState.searchResultsList = localStorage.getItem("searchResults") ? JSON.parse(localStorage.getItem("searchResults")) : []
    },[])

    useEffect( () => {
        if(localStorage && state.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(state.favoritesList))
            localStorage.setItem("searchResults", JSON.stringify(state.searchResultsList))
        }
    }, [state])

    // Actions
    const addMovieToFavorites = movie => {
        dispatch({type: "ADD_MOVIE_TO_FAVORITES", payload: movie})
        let prev = JSON.parse(localStorage.getItem("favorites")) || []
        prev = [...prev, movie]
        localStorage.setItem("favorites", JSON.stringify(prev))
        
    }

    const updateSearchResultsList = item => {
        dispatch({type: "UPDATE_RESULTS_LIST", payload: item})
        localStorage.setItem("searchResults", JSON.stringify(item))
    }
/*
    const recursiveFetch = async (query,year) => {
        const getMovies = async (pageNo=1) => {
            let apiResults = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${query}&y=${year}&page=${pageNo}`)
            .then(resp => resp.json())
            return apiResults
        }
        const getAll = async (pageNo = 1) => {
            const results = await getMovies(pageNo)
            console.log("Retrieving data from api for page :" + pageNo)
            if(results.length > 0) {
                return results.concat(await getAll(pageNo+1))
            } else {
                dispatch({type: "UPDATE_RESULTS_LIST", payload: item})
            }
        }
        
    }
*/
    const getAllMovies = async (query,year,type) => {
        const promises = [] 
        let response = []

        updateSearchResultsList([])
    
        for (let i = 1; i < 10; i++) {
            promises.push(
                await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${query}&y=${year}&page=${i}`).then(resp => resp.json()).then((data) => {
                    if (!data.Error) {
                        response = [...response, ...data.Search]
                    }
                    //console.log(res)
                })
            )
        }
        Promise.all(promises).then(() => {
        //setResults([...response])
        console.log("Promises Resolved!")
        })

        localStorage.setItem("searchResults", JSON.stringify(response))
        localStorage.setItem("searchType", JSON.stringify(type))
        window.location = "/search-results"
    }

    return (
        <GlobalContext.Provider 
            value={{
                favoritesList: state.favoritesList, 
                searchResultsList: state.searchResultsList, 
                addMovieToFavorites,
                updateSearchResultsList,
                getAllMovies,
                }}>
            {props.children}
        </GlobalContext.Provider>
    )
}