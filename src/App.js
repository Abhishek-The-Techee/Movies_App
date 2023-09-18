import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginPage'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
  </Switch>
)

export default App
