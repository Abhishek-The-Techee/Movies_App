import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import SimilarMovieCard from '../SimilarMovieCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedGenresList = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      console.log(updatedGenresList)
      const updatedSimilarMoviesList = data.movie_details.similar_movies.map(
        each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const updatedSpokenLanguagesList = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          englishName: each.english_name,
        }),
      )
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: updatedGenresList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: updatedSimilarMoviesList,
        spokenLanguages: updatedSpokenLanguagesList,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getMovieDetails()
  }

  renderLoadingView = () => (
    <div className="container-view">
      <Header />
      <div className="loader-container">
        <Loader
          type="TailSpin"
          height="53.33px"
          width="53.33px"
          color="#D81F26"
        />
      </div>
      <Footer />
    </div>
  )

  renderFailureView = () => (
    <div className="container-view">
      <Header />
      <div className="loader-container">
        <FailureView onRetry={this.onTryAgain} />
      </div>
      <Footer />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetailsList} = this.state

    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieDetailsList
    console.log({genres})

    const inHours = Math.floor(runtime / 60)
    const inMinutes = runtime % 60
    const runTimeInHoursAndMinutes = `${inHours}h ${inMinutes}m`
    const certificateName = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const year = date.getFullYear()

    return (
      <div className="success-view-main-container">
        <div
          className="success-view-container"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            minHeight: '501px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <div className="movie-details-content-view">
            <h1 className="movie-heading">{title}</h1>
            <div className="time-date-container">
              <p className="time-text">{runTimeInHoursAndMinutes}</p>
              <p className="adult-text">{certificateName}</p>
              <p className="time-text">{year}</p>
            </div>
            <p className="overview-text">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-info-container">
          <div className="movie-info-items">
            <h1 className="info-heading">Genres</h1>
            <ul className="info-list">
              {genres.map(each => (
                <li className="list-item" key={each.id}>
                  <p className="list-text">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-info-items">
            <h1 className="info-heading">Audio Available</h1>
            <ul className="info-list">
              {spokenLanguages.map(each => (
                <li className="list-item" key={each.id}>
                  <p className="list-text">{each.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-info-items">
            <h1 className="info-heading">Rating Count</h1>
            <p className="count-text">{voteCount}</p>
            <h1 className="info-heading">Rating Average</h1>
            <p className="count-text">{voteAverage}</p>
          </div>
          <div className="movie-info-items">
            <h1 className="info-heading">Budget</h1>
            <p className="count-text">{budget}</p>
            <h1 className="info-heading">Release Date</h1>
            <p className="count-text">{releaseDate}</p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="more-like-this-heading">More like this</h1>
          <div className="similar-movies-list">
            {similarMovies.map(each => (
              <SimilarMovieCard cardDetails={each} key={each.id} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderMovieDetailsView = () => {
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
    return <div>{this.renderMovieDetailsView()}</div>
  }
}
export default MovieItemDetails
