// MobX state management
import { Provider } from 'mobx-react'
import { useEffect, useState, useMemo } from 'react'
import RootStore from '@/stores/RootStore'
// Theme
import ThemeProvider from '@/stores/providers/ThemeProvider'

// Global Styles

function MyApp({ Component, pageProps }) {
  // Créer le store une seule fois avec useMemo
  const store = useMemo(() => RootStore.create(), [])
  const [isStoreReady, setIsStoreReady] = useState(false)

  useEffect(() => {
    const initializeStore = async () => {
      try {
        await store.initialize()
        setIsStoreReady(true)
      } catch (error) {
        console.error('Failed to initialize store:', error)
      }
    }

    initializeStore()
  }, [store])

  if (!isStoreReady) {
    return null // ou un composant de chargement
  }

  const storeProps = {
    store
  }

  return (
    <Provider {...storeProps}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
