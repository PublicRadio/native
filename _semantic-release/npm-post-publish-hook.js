const SemanticReleaseError = require('@semantic-release/error');
const npmlog = require('npmlog');
const RegClient = require('npm-registry-client');
const publishPlaystore = require('./publish-playstore');

const npmClientGetPromise = (client)=>(url, opt)=>
  new Promise((resolve, reject)=>{
    client.get(url, opt, (err, data) => {
      if (err) {
        reject(err);
        return 
      }
      resolve(data);
    })  
  })

module.exports = function (pluginConfig, {pkg, npm, plugins, options}, cb)  {
  npmlog.level = npm.loglevel || 'warn'
  let clientConfig = {log: npmlog}
  // disable retries for tests
  if (pluginConfig && pluginConfig.retry) clientConfig.retry = pluginConfig.retry
  const client = new RegClient(clientConfig)

  npmClientGetPromise(client)(`${npm.registry}${pkg.name.replace('/', '%2F')}`, {auth: npm.auth})
  .catch((err)=>{
    if (err && (err.statusCode === 404 || /not found/i.test(err.message))) {
      return cb(null, {})
    }

    return cb(err);
  })
  .then((data)=>{
    let version = data['dist-tags'][npm.tag]

    if (!version &&
        options &&
        options.fallbackTags &&
        options.fallbackTags[npm.tag] &&
        data['dist-tags'][options.fallbackTags[npm.tag]]) {
      version = data['dist-tags'][options.fallbackTags[npm.tag]]
    }

    if (!version) {
      return cb(new SemanticReleaseError(
`There is no release with the dist-tag "${npm.tag}" yet.
Tag a version manually or define "fallbackTags".`, 'ENODISTTAG'))
    }
    return version;
  })
  .then((version)=>publishPlaystore(version).then(()=>version))
  .then((version)=>{

    cb(null, {
      version,
      gitHead: data.versions[version].gitHead,
      get tag () {
        npmlog.warn('deprecated', 'tag will be removed with the next major release')
        return npm.tag
      }
  })})
}