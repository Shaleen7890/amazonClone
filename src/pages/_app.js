import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps, session }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>

  )
}

export default MyApp
        {/* <SessionProvider session={session}>
          <Component {...pageProps}/>
        </SessionProvider> */}
