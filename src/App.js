import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Account from './components/Account'
import Popular from './components/Popular'
import Search from './components/Search'
import TrendingNow from './components/TrendingNow'
import MovieItemDetails from './components/MovieItemDetails'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/trending" component={TrendingNow} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
