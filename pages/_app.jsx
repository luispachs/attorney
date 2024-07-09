// MobX state management
import mobxStore from '../stores/AppStore'
import { Provider as MobxProvider } from 'mobx-react'
// Theme
import ThemeProvider from '../stores/providers/ThemeProvider'

// Global Styles

const App = ({ Component, pageProps }) => {
    return (
        <MobxProvider store={mobxStore}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </MobxProvider>
    )
}

export default App
