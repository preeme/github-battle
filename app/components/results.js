var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

function Player(props){
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}> Score: {props.score} </h3>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    var users = queryString.parse(this.props.location.search);

    api.battle([
      users.userOneName,
      users.userTwoName
    ]).then(function (users) {
      if (users === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: users[0],
          loser: users[1],
          loading: false,
        }
      });
    }.bind(this));
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return (
        <div>Loading</div>
      )
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'> Reset </Link>
        </div>
      )
    }
    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />

        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results;
