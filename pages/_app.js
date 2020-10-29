import "../styles/style.scss"

import { GlobalStateProvider2 } from "../context/GlobalState2"

export default function MyApp({ Component, pageProps }) {
    return (
        <GlobalStateProvider2>
            <Component {...pageProps} />
        </GlobalStateProvider2>
    )
}
