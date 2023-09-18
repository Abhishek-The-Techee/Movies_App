import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  background-color: #000000;
  height: 100vh;
  padding: 40px;
  @media screen and (min-width: 768px) {
    background-image: url('https://res.cloudinary.com/dnebrhaqh/image/upload/v1695018234/loginbgimg_fv7xf9.png');
    height: 100vh;
    width: 100vw;
    background-size: cover;
    padding: 10px;
  }
`
export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`
export const LogoImage = styled.img`
  height: 27px;
  width: 100px;
  margin-30px;
  @media screen and (min-width: 768px) {
    height: 42px;
    width: 180px;
    margin-left: 100px;
    margin-top: 30px;
  }
`
export const LoginFormContainer = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
export const FormContainer = styled.div`
  margin-top: 120px;
  @media screen and (min-width: 768px) {
    height: 350px;
    width: 400px;
    border-radius: 8px;
    background-color: #131413;
    margin: 20px;
    opacity: 90%;
    padding: 20px;
    padding-left: 30px;
  }
`
export const LoginHeading = styled.h1`
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  font-family: 'Roboto';
  padding-bottom: 35px;
  @media screen and (min-width: 768px) {
    text-align: center;
    padding-bottom: 20px;
  }
`
export const UserInput = styled.input`
  width: 80%;
  height: 30px;
  background-color: #5e615f;
  color: #ffffff;
  border: none;
  outline: none;
  padding: 5px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 300px;
    height: 30px;
  }
`
export const LabelText = styled.div`
  color: #f7fcf9;
  font-family: 'Roboto';
  font-size: 14px;
  padding-bottom: 3px;
`
export const LoginButton = styled.button`
  height: 36px;
  width: 80%;
  background-color: #fa0710;
  font-family: 'Roboto';
  margin-top: 30px;
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    width: 300px;
  }
`
