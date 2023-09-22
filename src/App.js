import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginPage'
import Home from './components/Home'
import Header from './components/Header'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/header" component={Header} />
  </Switch>
)

export default App
