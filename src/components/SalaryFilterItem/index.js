import './index.css'

const SalaryFilterItem = props => {
  const {salaryRangeDetails, onChangeSalaryList} = props
  const {salaryRangeId, label} = salaryRangeDetails
  const updateSalaryRange = onChangeSalaryList(salaryRangeId)
  return (
    <li className="each-list-item">
      <input
        className="filter-input"
        type="checkbox"
        id={salaryRangeId}
        onClick={updateSalaryRange}
      />
      <label className="input-label-filter" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryFilterItem
