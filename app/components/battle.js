var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function UserPreview (props) {
  return (
    <div>
      <div className='column'>
        <img className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}
        >
        Reset
      </button>
    </div>
  )
}

UserPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let value = e.target.value;

    this.setState(() => {
      return {
        username: value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault;

    this.props.onSubmit(this.props.id, this.state.username);
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
          >
            Submit
          </button>
      </form>
    )
  }
}

UserInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOneName: '',
      userOneImage: null,
      userTwoName: '',
      userTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(() => {
      var newState = {};

      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

      return newState;
    });
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};

      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;

      return newState;
    })
  }
  render() {
    let match = this.props.match;
    let userOneName = this.state.userOneName;
    let userTwoName = this.state.userTwoName;
    let userOneImage = this.state.userOneImage;
    let userTwoImage = this.state.userTwoImage;

    return (
      <div>
        <div className='row'>
          {!userOneName &&
            <UserInput
              id='userOne'
              label='User One'
              onSubmit={this.handleSubmit}
            />}

          {userOneImage !== null &&
            <UserPreview
              avatar={userOneImage}
              username={userOneName}
              onReset={this.handleReset}
              id='userOne'
            />
          }

          {!userTwoName && <UserInput
            id='userTwo'
            label='User Two'
            onSubmit={this.handleSubmit}
          />}

          {userTwoImage !== null &&
            <UserPreview
              avatar={userTwoImage}
              username={userTwoName}
              onReset={this.handleReset}
              id='userTwo'
            />
          }
        </div>

        {userOneImage && userTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url = '/results',
              search: `?userOneName=` + userOneName + `&userTwoName=` + userTwoName
            }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
