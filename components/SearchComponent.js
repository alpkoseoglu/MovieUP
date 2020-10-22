import {useState} from "react"

import {useContext} from "react"
import {GlobalContext} from "../context/GlobalState"

const SearchComponent = () => {

    const {getAllMovies} = useContext(GlobalContext)

    const [query, setQuery] = useState("")
    const [year, setYear] = useState("")
    const [type, setType] = useState("")
    const [types] = useState(["Action", "Comedy", "Romance", "Horror", "Sci-Fi", "Biography", "Drana", "Adventure", "Thriller", "Short", "Western", "History", "Fantasy", "Animation", "Crime", "Family", "Music", "Musical", "Documentary", "War", "Mystery", "Sport"])

    const handleQuery = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    const handleYear = (e) => {
        e.preventDefault()
        setYear(e.target.value)
    }
    const handleType = (e) => {
        e.preventDefault()
        setType(e.target.value)
    }

    return (
        <div className="wide-search">
            <ul className="wide-search-list">
                <li className="wide-search-list-items">
                    <select onChange={handleYear} name="year" className="year">
                        <option value="">Year</option>
                        {
                            [...Array(120)].map((year,i) => <option key={i} value={2020 - i}>{2020 - i}</option>)
                        }
                        
                    </select>
                </li>
                <li className="wide-search-list-items">
                    <select onChange={handleType} name="genre" className="genre">
                        <option value="">Type</option>
                        {
                            types.sort().map(type => <option key={type} value={type}>{type}</option>)
                        }
                    </select>
                </li>
                <li className="wide-search-list-items">
                    <input onChange={handleQuery} type="text" placeholder="Enter movie name here "/>
                    <i className="fas fa-search"></i>
                </li>
                <li className="wide-search-list-items">
                    <button onClick={() => getAllMovies(query,year,type)} type="submit" className="search-movie">Search &#10132;</button>
                </li>
            </ul>
        </div>
    )
}

export default SearchComponent