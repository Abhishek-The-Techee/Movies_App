import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginPage'
import Home from './components/Home'
import Header from './components/Header'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Account from './components/Account'
import Popular from './components/Popular'
import FailureView from './components/FailureView'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/header" component={Header} />
    <Route exact path="/footer" component={Footer} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/failure-view" component={FailureView} />
    <Route component={NotFound} />
  </Switch>
)

export default App
