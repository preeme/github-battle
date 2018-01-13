var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api')

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
        let users = queryString.parse(this.props.location.search);
        api.battle([
          users.userOneName,
          users.userTwoName
        ]).then((results) => {
          if (results === null) {
            return this.setState(() => {
              return {
              error: 'Looks like there was an error. Check that both users exist on Github',
              loading: false,
            }
            })
          }
        this.setState(() => {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false

          }
        })
        });
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    return (
      <div>
        Results
      </div>
    )
  }
}

module.exports = Results;
