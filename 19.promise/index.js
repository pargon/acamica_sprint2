const fetch = require('node-fetch');


const getGitHubUser =  (username) => {
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
//        .then(data => console.log(data))
//    .catch(err => console.log('error ' + err));

}

getGitHubUser('xxx')
.then( data =>  {
    fetch(data.followers_url)
    .then(res => res.json())
        .then(followers => console.log(followers))
    .catch(err => console.log('error ' +err));
})
.catch(err => console.log('error ' + err));