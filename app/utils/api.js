import axios from 'axios';

const id = "ed97852284d5e27c84cd";
const sec = "0b943cc6ad24b41bf4adb16b589e2cdae2100094";
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then(({ data }) => data);
}

function getRepos(username) {
  return axios.get(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
}

function getStarCount(repos) {
  return repos.data.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore({ followers }, repos) {
  return followers * 3 + getStarCount(repos);
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(user) {
  return Promise.all([getProfile(user), getRepos(user)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
    })
  );
}

function sortUsers(users) {
  return users.sort((a, b) => b.score - a.score);
}

export function battle (users) {
  return Promise.all(users.map(getUserData))
    .then(sortUsers)
    .catch(handleError);
}

export function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  return axios.get(encodedURI).then(({ data }) => data.items);
}
