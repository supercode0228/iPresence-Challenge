import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import configureStore from './store'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <Switch>
            {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  component={route.component}
                  key={route.name}
                />
              )
            })}
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
