import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="footer-container">
      <FaGoogle className="google-icon" />
      <FaTwitter className="twitter-icon" />
      <FaInstagram className="insta-icon" />
      <FaYoutube className="youtube-icon" />
      <p className="contact-us">Contact us</p>
    </div>
  </div>
)
export default Footer
