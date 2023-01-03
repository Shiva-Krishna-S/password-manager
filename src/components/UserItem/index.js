import './index.css'

const UserItem = props => {
  const {userDetails, deleteUser} = props
  const {
    id,
    website,
    username,
    password,
    isHidden,
    initialClassName,
  } = userDetails

  const initial = username ? username[0].toUpperCase() : ''

  const onDeleteUser = () => {
    deleteUser(id)
  }

  return (
    <li className="list-item">
      <div className={initialClassName}>
        <p className="initial">{initial}</p>
      </div>
      <div className="user-details-container">
        <p className="text">{website}</p>
        <p className="text">{username}</p>
        <p>
          {isHidden ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="masked-image"
            />
          ) : (
            <p className="text">{password}</p>
          )}
        </p>
      </div>
      <button type="button" onClick={onDeleteUser} className="delete-button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default UserItem
