import React from 'react'
import ReactDOM from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// const queryClient = new QueryClient()

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    {/* <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider> */}
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
