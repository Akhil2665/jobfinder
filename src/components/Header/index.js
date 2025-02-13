import {Link, withRouter} from 'react-router-dom'
// import {MdLogout} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <AiFillHome />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/jobs" className="nav-link">
                <BsFillBriefcaseFill />
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
            data-testid="logoutButtonMobile"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-image"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

// <li className="nav-menu-item-mobile">
//   <Link to="/login" className="nav-link">
//     <img
//       src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
//       alt="nav cart"
//       className="nav-bar-image"
//     />
//   </Link>
// </li>

// <div className="nav-bar-mobile-logo-container">
//           <Link to="/">
//             <img
//               className="website-logo"
//               src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//               alt="website logo"
//             />
//           </Link>
//           <button
//             type="button"
//             className="nav-mobile-btn"
//             onClick={onClickLogout}
//           >
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
//               alt="nav logout"
//               className="nav-bar-image"
//             />
//           </button>
//         </div>
