import {Component} from 'react'

import {
  LoginBgContainer,
  LogoContainer,
  LogoImage,
  LoginFormContainer,
  FormContainer,
  LoginHeading,
  UserInput,
  LabelText,
  LoginButton,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
  }

  renderUserNameField = () => {
    const {userName} = this.state

    return (
      <>
        <LabelText htmlFor="user-name">USERNAME</LabelText>
        <UserInput
          type="text"
          id="user-name"
          value={userName}
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <LabelText htmlFor="user-name">PASSWORD</LabelText>
        <UserInput
          type="password"
          id="password"
          value={password}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    return (
      <LoginBgContainer>
        <LogoContainer>
          <LogoImage
            src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695027857/Group_7399_evjy6s.png"
            alt="logo"
          />
        </LogoContainer>
        <LoginFormContainer>
          <FormContainer>
            <LoginHeading>Login</LoginHeading>
            {this.renderUserNameField()}
            {this.renderPasswordField()}
            <LoginButton>Login</LoginButton>
          </FormContainer>
        </LoginFormContainer>
      </LoginBgContainer>
    )
  }
}
export default LoginForm
