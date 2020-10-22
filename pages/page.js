import Navigation from "../components/navigation"
import Head from "next/head"

const Page = ({children}) => {
    return (
        
        <div className="page">
            <Head>
                <title>MovieUp</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://kit.fontawesome.com/4b6c7a7fa2.js" crossOrigin="anonymous"></script>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
            </Head>
            <Navigation />
            <main>
                {children}
            </main>
        </div>
        
    )
}

export default Page