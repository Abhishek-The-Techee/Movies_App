import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <Footer />
      </div>
    )
  }
}
export default Home
