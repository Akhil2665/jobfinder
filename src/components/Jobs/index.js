import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import EmploymentTypeFilter from '../EmploymentTypeFilter'
import SalaryFilterItem from '../SalaryFilterItem'

import JobCard from '../JobCard'
import ProfileCard from '../ProfileCard'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeJobType: [],
    searchInput: '',
    activeSalaryRange: [],
    profileDetails: {},
  }

  componentDidMount() {
    this.getJobs()
    console.log(this.props)
  }

  getUpdatedProfileData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeJobType, activeSalaryRange, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileUrl = 'https://apis.ccbp.in/profile'

    const profileResponse = await fetch(profileUrl, options)
    const response = await fetch(apiUrl, options)
    if (profileResponse.ok) {
      const fetchedProfileData = await profileResponse.json()
      const updatedProfileData = this.getUpdatedProfileData(
        fetchedProfileData.profile_details,
      )
      this.setState({profileDetails: updatedProfileData})
    }

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(jobObject => ({
        companyLogoUrl: jobObject.company_logo_url,
        employmentType: jobObject.employment_type,
        jobDescription: jobObject.job_description,
        id: jobObject.id,
        title: jobObject.title,
        rating: jobObject.rating,
        location: jobObject.location,
        packagePerAnnum: jobObject.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  getDetailsOfJob = id => {
    console.log('successs', id)
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-products-container">
        <ul className="jobs-list">
          {jobsList.map(jobObject => (
            <JobCard
              jobData={jobObject}
              getDetailsOfJob={this.getDetailsOfJob}
              key={jobObject.id}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onchangeSearchInput = event => {
    const searchInputValue = event.target.value
    this.setState({searchInput: searchInputValue})
  }

  // onChange={this.onchangeSearchInput}

  renderInputSearchElement = () => {
    const {searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props
    console.log(employmentTypesList, salaryRangesList)
    return (
      <div className="search-input-container">
        <input
          className="input-search-element"
          placeholder="Search"
          type="search"
          value={searchInput}
          onChange={this.onchangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  changeActiveJobType = selectedType => {
    const {activeJobType} = this.state
    const updatedJobTypeList = activeJobType.includes(selectedType)
      ? null
      : [...activeJobType, selectedType]
    if (!activeJobType.includes(selectedType)) {
      this.setState({activeJobType: updatedJobTypeList}, this.getJobs)
    }
    // this.setState(prevState => {
    //   activeJobType: if (!prevState.activeJobType.includes(selectedType)) {
    //     return [...prevState.activeJobType, selectedType]
    //   }
    //   return null
    // }, this.getJobs)
  }

  onChangeSalaryList = selectedRange => {
    const {activeSalaryRange} = this.state
    const updatedactiveSalaryRange = activeSalaryRange.includes(selectedRange)
      ? null
      : [...activeSalaryRange, selectedRange]
    if (!activeSalaryRange.includes(selectedRange)) {
      this.setState({activeJobType: updatedactiveSalaryRange}, this.getJobs)
    }
    // this.setState(prevState => {
    //   if (!prevState.activeSalaryRange.includes(selectedRange)) {
    //     return [...prevState.activeSalaryRange, selectedRange]
    //   }
    // }, this.getJobs)
  }

  renderFilterGroup = () => {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="filter-group">
        <div className="filter-type-container">
          <h1 className="filter-heading">Type Of Employment</h1>
          <ul className="filter-list-container">
            {employmentTypesList.map(eachType => (
              <EmploymentTypeFilter
                employmentTypeDetails={eachType}
                key={eachType.employmentTypeId}
                changeActiveJobType={this.changeActiveJobType}
              />
            ))}
          </ul>
        </div>
        <div className="filter-type-container">
          <h1 className="filter-heading">Salary Range</h1>
          <ul className="filter-list-container">
            {salaryRangesList.map(eachRange => (
              <SalaryFilterItem
                salaryRangeDetails={eachRange}
                key={eachRange.salaryRangeId}
                onChangeSalaryList={this.onChangeSalaryList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderSidebar = () => {
    const {profileDetails} = this.state

    return (
      <>
        <ProfileCard profileDetails={profileDetails} />
        {this.renderFilterGroup()}
      </>
    )
  }

  render() {
    const {salaryRangesList, employmentTypesList} = this.state
    console.log(salaryRangesList, employmentTypesList)
    return (
      <div className="all-jobs-section">
        <Header />
        <div className="jobs-main-container">
          <div className="app-side-bar">{this.renderSidebar()}</div>
          <div className="job-content-container">
            {this.renderInputSearchElement()}
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
