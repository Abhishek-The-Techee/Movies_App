import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
// import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initiaL: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchedMovies: [],
    apiStatus: apiStatusConstants.initiaL,
  }

  componentDidMount() {
    this.getSearchedMovies()
  }

  getSearchedMovies = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      header: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))
      this.setState({
        searchedMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getSearchedMovies()
  }

  searchInput = text => {
    this.setState({searchInput: text}, this.getSearchedMovies)
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" size={35} color=" #D81F26" />
    </div>
  )

  renderMoviesNotFoundView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-result-container">
        <img
          src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695617724/Group_7394_uaqq6w.png"
          alt="no movies"
          className="not-found-img"
        />
        <p className="no-result-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchedMovies} = this.state

    return (
      <>
        {searchedMovies.length > 0 ? (
          <div className="searched-movies-bg-container">
            <ul className="searched-movies-list">
              {searchedMovies.map(each => (
                <Link to={`/movies/${each.id}`} key={each.id}>
                  <li className="searched-item" key={each.id}>
                    <img
                      src={each.posterPath}
                      alt={each.title}
                      className="searched-poster"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          this.renderMoviesNotFoundView()
        )}
      </>
    )
  }

  renderSearchResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-bg-container">
        <Header searchInput={this.searchInput} />
        {this.renderSearchResult()}
      </div>
    )
  }
}
export default Search
