import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <ul className="social-media-icons-list">
      <li>
        <FaGoogle className="social-media-icon" />
      </li>
      <li>
        <FaTwitter className="social-media-icon" />
      </li>
      <li>
        <FaInstagram className="social-media-icon" />
      </li>
      <li>
        <FaYoutube className="social-media-icon" />
      </li>
    </ul>
    <p className="contact-us-text">Contact Us</p>
  </div>
)
export default Footer
