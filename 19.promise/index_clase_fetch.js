const fetch = require('node-fetch');
// // opción 1
// const getGitHubUser = userName => {
//   return fetch(`https://api.github.com/users/${userName}`)
//   .then(response => response.json());
// }
// getGitHubUser('efrainpardo88')
// .then(data => {
//   // Traemos los followers
//   fetch(data.followers_url)
//   .then(response => response.json())
//   .then(followers => console.log(followers))
//   .catch(error => console.error(error))
// })
// .catch(eror => console.error(error));
// opción 2
const getGitHubUserFollwers = userName => {
  return fetch(`https://api.github.com/users/${userName}`)
  .then(response => response.json())
  .then(data => {
    // Traemos los followers
    return fetch(data.followers_url)
    .then(responseFollowers => responseFollowers.json())
  })
  .catch(eror => console.error(error));
}
getGitHubUserFollwers('efrainpardo88')
.then(data => console.log(data))
.catch(eror => console.error(error));