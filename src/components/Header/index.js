import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showSearchBar: false,
    showMenu: false,
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({showSearchBar: !prevState.showSearchBar}))
  }

  onClickShowMenuIcon = () => {
    this.setState({showMenu: true})
  }

  onClickCloseMenuIcon = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showSearchBar, showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassName
    let popularClassName
    let accountClassName

    switch (path) {
      case '/popular':
        homeClassName = 'in-active'
        popularClassName = 'active'
        accountClassName = 'in-active'
        break
      case '/profile':
        homeClassName = 'in-active'
        popularClassName = 'in-active'
        accountClassName = 'active'
        break
      default:
        homeClassName = 'active'
        popularClassName = 'in-active'
        accountClassName = 'in-active'
        break
    }

    const searchBtnClassName = showSearchBar
      ? 'active-search-btn'
      : 'normal-search-btn'
    const searchIconClassName = showSearchBar ? null : 'search-icon'

    return (
      <nav className="navbar-container">
        <div className="navbar-elements-container">
          <div className="logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695027857/Group_7399_evjy6s.png"
                alt="website logo"
                className="nav-logo"
              />
            </Link>
            <ul className="nav-items-list">
              <Link to="/" className="nav-link">
                <li className={`nav-item-text ${homeClassName}`}>Home</li>
              </Link>
              <Link to="/" className="nav-link">
                <li className={`nav-item-text ${popularClassName}`}>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="left-container">
            {showSearchBar && (
              <input
                type="search"
                className="search-box"
                placeholder="Search"
                onKeyDown={this.onChangeSearchInput}
              />
            )}
            <Link to="/search" className="nav-link">
              <button
                type="button"
                className={searchBtnClassName}
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="#ffffff"
                  className={searchIconClassName}
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>
            <Link to="/Account">
              <img
                src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695346664/Avatar_q8lmoc.png"
                alt="profile"
                className={`avatar ${accountClassName}`}
              />
            </Link>
            {showMenu ? (
              <ImCross
                size={15}
                color="white"
                className="menu-close-icon"
                onClick={this.onClickCloseMenuIcon}
              />
            ) : (
              <MdMenuOpen
                size={30}
                color="white"
                className="menu-open-icon"
                onClick={this.onClickShowMenuIcon}
              />
            )}
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
