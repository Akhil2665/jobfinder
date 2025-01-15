import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <div className="each-skill-container">
      <img src={imageUrl} className="skill-image" alt="skill" />
      <p className="skill">{name}</p>
    </div>
  )
}

export default SkillCard
