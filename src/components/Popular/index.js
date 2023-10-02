import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMoviesVideos()
  }

  getPopularMoviesVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      header: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {popularMovies} = this.state

    return (
      <div className="popular-result-bg-container">
        <ul className="popular-movies-list">
          {popularMovies.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id} target="blank">
              <li className="popular-item" key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="popular-image"
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onRetry = () => {
    this.getPopularMoviesVideos()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  render() {
    return (
      <div className="popular-bg-container">
        <Header />|
        <div className="result-container">{this.renderFailureView()}</div>
        <Footer />
      </div>
    )
  }
}
export default Popular
