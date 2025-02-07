import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {shortBio, profileImageUrl, name} = profileDetails
  console.log(profileImageUrl)
  return (
    <div className="profile-card">
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
      </div>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
