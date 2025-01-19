import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    id,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="similar-job-item-card" key={id}>
        <div className="card-role-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <div className="description-container">
          <h3 className="description-heading">Description</h3>
          <p className="job-description">{jobDescription}</p>
        </div>

        <div className="similar-job-work-type-container">
          <div className="icon-and-detail">
            <IoLocationOutline />
            <p className="work-about">{location}</p>
          </div>
          <div className="icon-and-detail">
            <MdWork />
            <p className="work-about">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobCard
