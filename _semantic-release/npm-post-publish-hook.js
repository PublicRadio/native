const url = require('url')

const parseSlug = require('parse-github-repo-url')
const githubPost = require('./github-post')

const beforeGitHub = (config, cb){
  console.log(config)
  cb(config)
}

module.exports = function (_config, cb) {
  beforeGitHub(_config, (config)=>{
    githubPost(config, cb)
  })
}