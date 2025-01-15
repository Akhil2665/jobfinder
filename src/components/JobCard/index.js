import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    title,
    companyLogoUrl,
    rating,
    id,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item" key={id}>
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
          <h3 className="description-heading">Description</h3>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
