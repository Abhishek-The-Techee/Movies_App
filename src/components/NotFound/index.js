import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-desc">
      We are sorry the page you requested could not be found
    </p>
    <p className="not-found-desc second">Please go back to the homepage</p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
