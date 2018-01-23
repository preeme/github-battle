import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Battle your friends</h1>
        <Link className="button" to="/battle">
          Battle
        </Link>

        <h1>Check out the popular repositories</h1>
        <Link className="button" to="/popular">
          Go
        </Link>
      </div>
    );
  }
}

export default Home;
