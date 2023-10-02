import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    )
  }
}
export default Home
