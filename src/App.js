import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/search" component={Search} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

//
