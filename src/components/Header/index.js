import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {menuCard: false, searchBarIcon: false}

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      searchBarIcon: !prevState.searchBarIcon,
    }))
  }

  onClickShowMenu = () => {
    this.setState({menuCard: true})
  }

  onClickHideMenu = () => {
    this.setState({menuCard: false})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    const {menuCard, searchBarIcon} = this.state
    return (
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661067122/Group_7399_qgg6lb.png"
            alt="website logo"
            className="movies-website-logo1"
          />
        </Link>
        <ul className="header-list">
          <Link to="/">
            <li className="header-home-text">Home</li>
          </Link>
          <Link to="/popular">
            <li className="header-popular-text">Popular</li>
          </Link>
        </ul>
        <Link to="/search">
          {searchBarIcon && (
            <input
              type="search"
              className="input-box"
              onKeyDown={this.onChangeSearchInput}
              placeholder="search"
            />
          )}
          <button
            type="button"
            testid="searchButton"
            className="search-button"
            onClick={this.onClickSearchIcon}
          >
            <HiOutlineSearch className="search-icon" />
          </button>
        </Link>
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661179324/Avatar_lyzyss.png"
            alt="profile"
            className="avatar-logo"
          />
        </Link>
        <MdMenuOpen className="mobile-device" onClick={this.onClickShowMenu} />
        {menuCard && (
          <div className="mobile-devices-header">
            <ul className="mobile-device-order-list">
              <Link to="/">
                <li className="mobile-header">Home</li>
              </Link>
              <Link to="/popular">
                <li className="mobile-header">Popular</li>
              </Link>
              <Link to="/account">
                <li className="mobile-header">Account</li>
              </Link>
              <ImCross onClick={this.onClickHideMenu} />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
