import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import GlobalStyle from './styles/globals.js'
import theme from './styles/theme'
import HeaderGate from './components/HeaderGate'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <HeaderGate>
          <GlobalStyle />
          <App />
        </HeaderGate>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
