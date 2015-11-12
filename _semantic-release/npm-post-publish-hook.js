const url = require('url')

const parseSlug = require('parse-github-repo-url')
const githubPost = require('./github-post')

const beforeGitHub = (config, cb){
  console.log(config)
  cb()
}

module.exports = function (config, cb) {
  beforeGitHub(config, ()=>githubPost(config, cb))
}