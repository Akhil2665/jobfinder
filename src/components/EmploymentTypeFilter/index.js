import './index.css'

const EmploymentTypeFilter = props => {
  const {employmentTypeDetails, changeActiveJobType} = props
  const {employmentTypeId, label} = employmentTypeDetails
  const updateEmploymentType = changeActiveJobType(employmentTypeId)
  return (
    <li className="each-list-item">
      <input
        className="filter-input"
        type="checkbox"
        onClick={updateEmploymentType}
        id={employmentTypeId}
      />
      <label className="input-label-filter" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeFilter
