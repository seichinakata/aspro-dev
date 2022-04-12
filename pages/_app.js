import '../styles/globals.css'
import AppContext from '../context/AppContext'
import useApp from '../hooks/useApp'
import theme from '../src/theme';
import { ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }) {
  const app = useApp();
  const appValue = {
    ...app,
  }

  return (
    <AppContext.Provider value={appValue}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default MyApp
