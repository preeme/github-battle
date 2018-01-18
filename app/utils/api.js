var axios = require("axios");

var id = "ed97852284d5e27c84cd";
var sec = "0b943cc6ad24b41bf4adb16b589e2cdae2100094";
var params = '?client_id=' + id + '&client_secret=' + sec;

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username + params)
              .then(function(user) {
                return user.data;
              });
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount (repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0)
}

function calculateScore (profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null
}

function getUserData(user) {
  return axios.all([
    getProfile(user),
    getRepos(user)
  ]).then(function (data){
    let profile = data[0];
    let repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortUsers(users) {
  return users.sort(function (a,b) {
    return b.score - a.score;
  })
}

module.exports = {
  battle: function(users) {
    return axios.all(users.map(getUserData))
      .then(sortUsers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories");

    return axios.get(encodedURI)
      .then(function(response) {
        return response.data.items;
    });
  }
};
