const React = require("react");
const PropTypes = require("prop-types");
const Link = require("react-router-dom").Link;
const UserPreview = require("./userpreview");

class UserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;

    this.setState(() => ({ username: value }));
  }

  handleSubmit(e) {
    e.preventDefault;

    this.props.onSubmit(this.props.id, this.state.username);
  }
  render() {
    const { username } = this.state;
    const { label } = this.props;

    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </form>
    );
  }
}

UserInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOneName: "",
      userOneImage: null,
      userTwoName: "",
      userTwoImage: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(() => ({
      [id + "Name"]: username,
      [id + "Image"]: `https://github.com/${username}.png?size=200`
    }))
  }
  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }))
  }

  render() {
    const { match } = this.props;
    const { userOneName, userTwoName, userOneImage, userTwoImage } = this.state;
    return (
      <div>
        <div className="row">
          {!userOneName && (
            <UserInput
              id="userOne"
              label="User One"
              onSubmit={this.handleSubmit}
            />
          )}
          {userOneImage !== null && (
            <UserPreview avatar={userOneImage} username={userOneName}>
              <button
                className="reset"
                onClick={() => this.handleReset('userOne')}
              >
                Reset
              </button>
            </UserPreview>
          )}

          {!userTwoName && (
            <UserInput
              id="userTwo"
              label="User Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {userTwoImage !== null && (
            <UserPreview avatar={userTwoImage} username={userTwoName}>
              <button
                className="reset"
                onClick={() => handleReset('userTwo')}
              >
                Reset
              </button>
            </UserPreview>
          )}
        </div>

        {userOneImage &&
          userTwoImage && (
            <Link
              className="button"
              to={{
                pathname: `${match.url}/results`,
                search: `?userOneName=${userOneName}&userTwoName=${userTwoName}`
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

module.exports = Battle;
