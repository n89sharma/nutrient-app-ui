// @flow
import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApplicationContainer from './ApplicationContainer'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['roboto'].join(','),
    fontSize: 15
  },
  palette: {
    primary: {
      main: '#039be5',
      light: '#63ccff',
      dark: '#006db3'
    },
    secondary: {
      main: '#d32f2f'
    }
  }
})

class App extends Component {
  render () {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Route path='/' exact component={ApplicationContainer} />
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
