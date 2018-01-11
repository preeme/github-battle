var React = require('react');
var Popular = require('./popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./nav');
var Home = require('./home');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route path='/' component={Home} />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>

    )
  }
}

module.exports = App;
