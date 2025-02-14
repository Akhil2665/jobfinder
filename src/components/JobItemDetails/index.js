import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {FaStar, FaShareSquare} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import SimilarJobCard from '../SimilarJobCard'
import SkillCard from '../SkillCard'
import Header from '../Header'

// import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},

    skillData: {},
    lifeAtCompanydata: {},
    apiStatus: apiStatusConstants.initial,
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    companyWebsiteUrl: data.company_website_url,
    jobDescription: data.job_description,
    id: data.id,
    title: data.title,
    rating: data.rating,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
  })

  getFormattedLifeAtCompanyData = data => ({
    imageUrl: data.image_url,
    description: data.description,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedSkillData = fetchedData.job_details.skills.map(eachObj => ({
        imageUrl: eachObj.image_url,
        name: eachObj.name,
      }))
      const lifeAtCompanyUpdateddata = this.getFormattedLifeAtCompanyData(
        fetchedData.job_details.life_at_company,
      )

      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
        skillData: updatedSkillData,
        lifeAtCompanydata: lifeAtCompanyUpdateddata,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" className="button" onClick={this.getJobData}>
          Retry
        </button>
      </Link>
    </div>
  )

  renderSkillContainer = () => {
    const {skillData} = this.state

    return (
      <div>
        <h1 className="description-heading">Skills</h1>
        <ul className="skills-container">
          {skillData.map(eachSkill => (
            <SkillCard skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {lifeAtCompanydata} = this.state
    const {imageUrl, description} = lifeAtCompanydata
    return (
      <div>
        <h1 className="description-heading">Life At Company</h1>
        <div className="life-at-comapny-container">
          <p className="description-company-life">{description}</p>
          <img src={imageUrl} className="company-image" alt="life at company" />
        </div>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobData

    return (
      <div className="job-details-success-view">
        <div className="job-item-details-card">
          <div className="card-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="content-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="work-type-container">
            <div className="left-container">
              <div className="icon-and-detail">
                <IoLocationOutline />
                <p className="work-about">{location}</p>
              </div>
              <div className="icon-and-detail">
                <MdWork />
                <p className="work-about">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <div className="description-container">
            <div className="description-link-container">
              <h3 className="description-heading">Description</h3>
              <a
                className="link"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit
                <FaShareSquare />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          {this.renderSkillContainer()}
          {this.renderLifeAtCompany()}
        </div>

        <h1 className="similar-products-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobCard
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
