const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')

module.exports = function (pluginConfig, config, cb) {
  const {pkg} = config;
  console.log(config)
  console.log(pluginConfig)
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null

  changelog({
    version: pkg.version,
    repository: repository,
    file: false
  }, (err, log)=>{
    console.log(log)
    cb(err, log) 
  })
}