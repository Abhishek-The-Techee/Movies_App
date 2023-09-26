import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const Account = props => {
  const userName = localStorage.getItem('userName')
  const password = localStorage.getItem('password')

  const astericPassword = '*'.repeat(password.length)

  return (
    <div className="account-container">
      <Header />
    </div>
  )
}
export default Account
