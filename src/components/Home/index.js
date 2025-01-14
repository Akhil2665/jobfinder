import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-container">
      <Header />

      <div className="home-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>

        <p className="home-description">
          Millions of people searching for jobs, salary information, company
          reviews, find the job that fits your abilites and potential
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Find Job
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
