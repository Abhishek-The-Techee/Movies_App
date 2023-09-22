import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserNameField = () => {
    const {userName} = this.state

    return (
      <>
        <label className="label-text" htmlFor="user-name">
          USERNAME
        </label>
        <br />
        <input
          className="user-input"
          type="text"
          id="user-name"
          value={userName}
          placeholder="Username"
          onChange={this.onChangeUserName}
        />
        <br />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="input-fields-container">
        <label className="label-text" htmlFor="user-name">
          PASSWORD
        </label>
        <br />
        <input
          className="user-input"
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt-token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695027857/Group_7399_evjy6s.png"
            alt="logo"
            className="logo-image"
          />
        </div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Login</h1>
            {this.renderUserNameField()}
            {this.renderPasswordField()}
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
