import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import UserItem from '../UserItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    usersList: [],
    searchInput: '',
  }

  deleteUser = id => {
    const {usersList} = this.state
    this.setState({usersList: usersList.filter(eachUser => eachUser.id !== id)})
  }

  onAddUser = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newUser = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      isHidden: true,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      usersList: [...prevState.usersList, newUser],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      usersList: prevState.usersList.map(eachUser => ({
        ...eachUser,
        isHidden: !eachUser.isHidden,
      })),
    }))
  }

  getSearchResults = () => {
    const {searchInput, usersList} = this.state
    const searchResults = usersList.filter(eachUser =>
      eachUser.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {websiteInput, usernameInput, passwordInput, searchInput} = this.state

    const searchResults = this.getSearchResults()

    const noPasswords = searchResults.length === 0

    return (
      <div className="app-container">
        <div className="app-content-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-image"
          />
          <div className="app-top-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="form-image"
            />
            <form className="form-container" onSubmit={this.onAddUser}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  htmlFor="website"
                  className="web-logo"
                />
                <hr className="separator" />
                <input
                  id="website"
                  type="text"
                  value={websiteInput}
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  className="input-bar"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  htmlFor="username"
                  className="web-logo"
                />
                <hr className="separator" />
                <input
                  id="username"
                  type="text"
                  value={usernameInput}
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  className="input-bar"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  htmlFor="password"
                  className="web-logo"
                />
                <hr className="separator" />
                <input
                  id="password"
                  type="password"
                  value={passwordInput}
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  className="input-bar"
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="app-bottom-container">
            <div className="bottom-section-top-container">
              <div className="passwords-count-container">
                <h1 className="passwords-count-text">Your Passwords</h1>
                <p className="passwords-count">
                  {noPasswords ? 0 : searchResults.length}
                </p>
              </div>
              <div className="search-container">
                <div className="search-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-image"
                  />
                  <hr className="separator" />
                  <input
                    type="search"
                    value={searchInput}
                    placeholder="Search"
                    onChange={this.onChangeSearchInput}
                    className="search-input-container"
                  />
                </div>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="show-passwd-section-container">
              <div className="show-passwd-container">
                <input
                  id="pass1"
                  type="checkbox"
                  value="Show Password"
                  onChange={this.onShowPassword}
                  className="checkbox"
                />
                <label htmlFor="pass1" className="show-passwd-text">
                  Show Passwords
                </label>
              </div>
            </div>
            {!noPasswords && (
              <ul className="passwords-list-container">
                {searchResults.map(eachUser => (
                  <UserItem
                    key={eachUser.id}
                    userDetails={eachUser}
                    deleteUser={this.deleteUser}
                  />
                ))}
              </ul>
            )}
            {noPasswords && (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwd-image"
                />
                <p className="no-passwd-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
