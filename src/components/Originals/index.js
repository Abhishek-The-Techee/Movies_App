import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

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
      header: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.result.map(each => ({
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
      <Slider {...settings}>
        {originalsData.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <div className="slick-item" key={each.id}>
              <img
                src={each.backdropPath}
                alt="movie poster"
                className="originals-img"
              />
            </div>
          </Link>
        ))}
      </Slider>
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
