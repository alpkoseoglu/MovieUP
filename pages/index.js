import Page from "./Page"
import Head from "next/head"
import SearchComponent from "../components/SearchComponent"

const HomePage = () => {
    return (
        <Page>
            <Head>
                <title>MovieUp - Homepage</title>
            </Head>
            <main>
                <div className="hero">
                    <div className="hero-text">
                        <h1>Welcome to<br/><span>MovieUP</span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
                    </div>
                    <SearchComponent/>
                </div>
                <div className="carusel">
                    <div className="carusel-header">
                        <h2>Popular Movies</h2>
                        <a href="">View more &#10132;</a>
                    </div>
                    <div className="carusel-area">
                        <button className="arrow left">&#60;</button>
                        <div className="movie-card">
                            <div className="poster"><img src="/poster.jpg" alt="poster" /></div>
                            <div className="movie-details">
                                <div className="imdb-info">
                                    <a href=""><img src="/imdb.png" alt="imdb" /></a>
                                    <p>7.8</p>
                                    <button>Action</button>
                                    <button>Biography</button>
                                </div>
                                <div className="movie-title-details">
                                    <h6>1978</h6>
                                    <h3>The Godfather</h3>
                                    <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <div className="actions">
                                    <button><i className="far fa-heart"></i> Add to Favorites</button>
                                    <a href=""><small>View Details</small></a>
                                </div>
                            </div>
                        </div>
                        <button className="arrow right">&#62;</button>
                    </div>
                </div>
            </main>
        </Page>    
    )
}
  export default HomePage