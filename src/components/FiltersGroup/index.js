import EmploymentTypeFilter from '../EmploymentTypeFilter'
import SalaryFilterItem from '../SalaryFilterItem'

import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <div className="filter-group">
      <div className="filter-type-container">
        <h1 className="filter-heading">Type Of Employment</h1>
        <ul className="filter-list-container">
          {employmentTypesList.map(eachType => (
            <EmploymentTypeFilter
              employmentTypeDetails={eachType}
              key={eachType.employmentTypeId}
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
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
