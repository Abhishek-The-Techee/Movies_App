import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import SlickMovieCard from '../SlickMovieCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {
    originalsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginals()
  }

  getOriginals = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
        title: each.title,
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.posterPath,
      }))
      this.setState({
        originalsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderOriginalsView = () => {
    const {originalsData} = this.state

    return (
      <div className="originals-main-container">
        <SlickMovieCard moviesData={originalsData} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height="48px" width="48px" color="#D81F26" />
    </div>
  )

  tryAgain = () => {
    this.getOriginals()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695617707/alert-triangle_qmybuz.png"
        alt="failure view"
        className="warning-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="originals-retry-btn"
        onClick={this.tryAgain}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default Originals
