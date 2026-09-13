import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ScrollToTop from './components/ScrollToTop.jsx'

// A single shared query client. All data currently comes from the mocked
// async layer in src/lib/api.js -- swapping to a real backend later only
// means changing what that layer's functions call, not any component code.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <ScrollToTop />
        
        <Provider store={store}>
          <App />
          </Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
)
