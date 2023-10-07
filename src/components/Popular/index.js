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
      headers: {
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
    console.log(popularMovies)

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

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        height={80}
        width={80}
        color="#D81F26"
        testid="loader"
      />
    </div>
  )

  renderMovies = () => {
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
      <div className="popular-bg-container">
        <Header />
        <div className="result-container">{this.renderMovies()}</div>
        <Footer />
      </div>
    )
  }
}
export default Popular
