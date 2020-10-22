import "../styles/style.scss"

import {GlobalProvider} from "../context/GlobalState"

export default function MyApp({ Component, pageProps }) {
    return (
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
      )
  }