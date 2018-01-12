var React = require('react');
var PropTypes = require('prop-types')

class PlayerInput extends React.Component {
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

    this.setState(function() {
      return {
        username: value
      }
    })
  }

  handleSubmit(e) {
    e.prevent.default;

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

PlayerInput.propTypes = {
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
  }
  handleSubmit(id, username) {
    this.setState(function (){
      var newState = {};

      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

      return newState;
    });
  }
  render() {
    let userOneName = this.state.userOneName;
    let userTwoName = this.state.userTwoName;

    return (
      <div>
        <div className='row'>
          {!userOneName &&
            <PlayerInput
              id='userOne'
              label='User One'
              onSubmit={this.handleSubmit}
            />}

          {!userTwoName && <PlayerInput
            id='userTwo'
            label='User Two'
            onSubmit={this.handleSubmit}
          />}
        </div>
      </div>
    )
  }
}

module.exports = Battle;
