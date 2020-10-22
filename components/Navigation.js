import Link from "next/link"
import {useContext, useState} from "react"
import {GlobalContext} from "../context/GlobalState"

const Navigation = () => {
    const {getAllMovies} = useContext(GlobalContext)

    const [query, setQuery] = useState("")

    const handleQuery = (e) => {
        setQuery(e.target.value)
    }

    const submit = (e) => {
        //e.preventDefault()
        if (e.keyCode == 13) {
            getAllMovies(query, "", "")
        } 
    }

    return (
        <header>
            <div className="logo">
            <Link href="/"><h2>Movie<span>UP</span></h2></Link>
            </div>
            <nav>
                <ul className="nav-list">
                    <Link href="/"><li className="nav-list-item">Home</li></Link>
                    <Link href="/favorites"><li className="nav-list-item">Favorites</li></Link>
                </ul>
            </nav>
            <div className="search">
                <input onChange={handleQuery} onKeyDown={submit} type="text" placeholder="Enter movie name here "/>
                <i className="fas fa-search"></i>
            </div>
        </header>
    )
}

export default Navigation

/*
        <nav>
            <div className="links">
                <div className="logo">
                    <span className="movie">Movie</span><span className="up">UP</span>
                </div>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/favorites">
                    <a className="yellow">Favorites</a>
                </Link>
            </div>
            <input type="text" placeholder="Enter movie name here"/>
        </nav>
        */