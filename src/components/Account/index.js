import {Redirect} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
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
    <>
      <div className="account-container">
        <Header className="account-header-container" />
        <div className="account-sub-container">
          <div className="account-sub-details-container">
            <h1 className="account-name">Account</h1>
            <hr className="horizontal-line horizontal-line1" />
            <div className="membership-container">
              <p className="membership-name">Member ship</p>
              <div className="membership-sub-container">
                <p className="membership-mail">rahul@gmail.com</p>
                <p className="membership-password">Password ********** </p>
              </div>
            </div>
            <hr className="horizontal-line horizontal-line2" />
            <div className="plan-details-container">
              <p className="plan-details-name">Plan details</p>
              <div className="plan-details-sub-container">
                <p className="plan-details-premium-name">Premium</p>
                <p className="plan-details-ultrahd-name">Ultra HD</p>
              </div>
            </div>
            <hr className="horizontal-line horizontal-line3" />
          </div>
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <div className="account-footer-container">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Account
