/* eslint-disable no-plusplus */

const axios = require('axios');
const { Repo } = require('../../database/index');


// Maybe https://raw.githubusercontent.com/:owner/:repo/master/


const getRepos = (token, user, cb) => {
  const options = {
    url: `https://api.github.com/user/${user.login}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  };

  axios(options, (err, resp, body) => {
    if (err) {
      console.log('Git request error', err);
      cb(err);
    } else {
      const pBody = JSON.parse(body);
      let counter = 0;
      console.log('REPO RESPONSE:', pBody);

      pBody.items.forEach((repo) => {
        console.log('Saving to Mongo < ', repo.full_name);

        Repo.findOne({ repo_id: repo.id }, (findErr, checkRepo) => {
          if (findErr) console.log(findErr);
          if (checkRepo) {
            console.log('This repo has already been saved');
            counter++;
          } else {
            Repo.create({
              repo_id: repo.id,
              name: repo.name,
              full_name: repo.full_name,
              html_url: repo.html_url,
              description: repo.description,
              url: repo.url,
            }, () => {
              counter++;
              if (counter === pBody.items.length) {
                cb();
              }
            });
          }
        });
      });
    }
  });
};


module.exports = getRepos;
