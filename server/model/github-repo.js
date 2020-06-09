/* eslint-disable no-plusplus */

const request = require('request');
const { Repo } = require('../../database/index');

const getRepos = (user, cb) => {
  const options = {
    url: user.repos_url,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${user.accessToken}`,
    },
  };

  request(options, (err, resp, body) => {
    if (err) {
      console.log('Git request error', err);
      cb(err);
    } else {
      // eslint-disable-next-line no-param-reassign
      body = JSON.parse(body);
      let counter = 0;
      // console.log('REPO RESPONSE:', body);

      body.forEach((repo) => {
        console.log('Saving to Mongo < ', repo.full_name);

        Repo.findOne({ repo_id: repo.id }, (findErr, checkRepo) => {
          if (findErr) console.log(findErr);
          if (checkRepo) {
            console.log('This repo has already been saved');
            counter++;
          } else {
            Repo.create({
              repo_id: repo.id,
              owner_id: repo.owner.id,
              name: repo.name,
              full_name: repo.full_name,
              html_url: repo.html_url,
              description: repo.description,
              branches_url: repo.branches_url,
              contents_url: repo.contents_url,
              blobs_url: repo.blobs_url,
              url: repo.url,
              updated_at: repo.updated_at,
            }, () => {
              counter++;
              if (counter === body.length) {
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
