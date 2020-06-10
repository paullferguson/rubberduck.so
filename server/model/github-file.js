/* eslint-disable no-plusplus */

const request = require('request');
// const { File } = require('../../database/index');

// https://raw.githubusercontent.com/paullferguson/rubberduck.so/master/package.json

const getPackageJson = (user, repoName, cb) => {
  const options = {
    url: `https://raw.githubusercontent.com/${user.login}/${repoName}/master/package.json`,
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
      cb(null, body);

      // console.log('FILE RESPONSE:', body);

      // console.log('Saving File to Mongo');

      // File.findOne({ repoName }, (findErr, checkRepo) => {
      //   if (findErr) console.log(findErr);
      //   if (checkRepo) {
      //     console.log('This file has already been saved');
      //   } else {
      //     File.create({
      //       repoName,
      //       owner_id: user.id,
      //       file: body,
      //     }, (errSave, doc) => {
      //       if (errSave) console.log(errSave);
      //       cb(null, doc.file);
      //     });
      //   }
      // });
    }
  });
};


module.exports = getPackageJson;
