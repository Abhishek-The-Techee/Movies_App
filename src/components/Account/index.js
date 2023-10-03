import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="hr-line" />
        <div className="member-details-container">
          <p className="membership-heading">Member ship</p>
          <div>
            <p className="member-mail">Abhishek@gmail.com</p>
            <p className="member-password">Password: *********</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details-container">
          <p className="membership-heading">Plan Details</p>
          <div className="plan-container">
            <p className="premium-text">Premium</p>
            <p className="ultra-hd-text">Ultra HD</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="button-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Account
