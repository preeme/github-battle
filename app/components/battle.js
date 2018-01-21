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
    this.setState(() => {
      var newState = {};

      newState[id + "Name"] = "";
      newState[id + "Image"] = null;

      return newState;
    });
  }
  render() {
    const match = this.props.match;
    const userOneName = this.state.userOneName;
    const userTwoName = this.state.userTwoName;
    const userOneImage = this.state.userOneImage;
    const userTwoImage = this.state.userTwoImage;

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
                onClick={this.handleReset.bind(null, "userOne")}
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
                onClick={this.handleReset.bind(null, "userTwo")}
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
