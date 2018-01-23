const React = require("react");
const PropTypes = require("prop-types");
const api = require("../utils/api");
const Loading = require("./loading");

function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            style={lang === selectedLanguage ? { color: "#d0021b" } : null}
            onClick={() => onSelect(lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

function RepoGrid({ repos }) {
  return (
    <ul className="popular-list">
      {repos.map(({ owner, stargazers_count, name, html_url }, index) => (
        <li key={name} className="popular-item">
          <div className="popular-rank">#{index + 1} </div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={owner.avatar_url}
                alt={"Avatar for " + owner.login}
              />
            </li>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    //AJAX request
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repo: null
    }));

    api.fetchPopularRepos(lang).then(repos => {
      this.setState(() => ({
        repos
      }));
    });
  }

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? <Loading /> : <RepoGrid repos={repos} />}
      </div>
    );
  }
}

module.exports = Popular;
