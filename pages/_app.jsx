// MobX state management
import { Provider } from 'mobx-react'
import { useEffect, useState, useMemo } from 'react'
import RootStore from '@/stores/RootStore'
import Head from 'next/head'
// Theme
import ThemeProvider from '@/stores/providers/ThemeProvider'

// Global Styles

function MyApp({ Component, pageProps }) {
  // Créer le store une seule fois avec useMemo
  const store = useMemo(() => RootStore.create(), [])
  const [isStoreReady, setIsStoreReady] = useState(false)
  const getLayout = Component.getLayout ?? ((page) => page)

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

  return getLayout(
    <Provider {...storeProps}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
