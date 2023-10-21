import {Link} from 'react-router-dom'

import './index.css'

const SimilarMovieCard = props => {
  const {cardDetails} = props
  const {posterPath, title, id} = cardDetails

  return (
    <Link to={`/movies/${id}`} key={id}>
      <img src={posterPath} alt={title} className="movie-image" />
    </Link>
  )
}
export default SimilarMovieCard
