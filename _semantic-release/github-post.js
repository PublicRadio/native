const changelog = require('conventional-changelog');
const parseUrl = require('github-url-from-git');
var execSync = require('child_process').execSync;

const executePromise = (command)=> 
    new Promise((resolve, reject)=>{
      const stdout = exec(command);
      resolve(stdout);
     //  , (err, stdout, stderr)=>{
     //    if(err) {
     //      reject({err, stderr});
     //      return;
     //    }
     //    resolve(stdout);
     // });
    })

const changelogPromise = (opt)=>
  new Promise((resolve, reject)=>{
    changelog(opt, (err, log)=>{
      if(err) {
        reject(err);
        return;
      }
      resolve(log);
    })
  })

const promiseHook = ({log, pluginConfig, config, version})=>
    executePromise(`npm run publish:android-release --public-radio-native-android:version="${version}"`)

module.exports = function (pluginConfig, config, cb) {
  const {pkg} = config;
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null

  const {version} = pkg

  return changelogPromise({
    version
    repository,
    file: false
  })
  .catch(err)
  .then((log)=>
    promiseHook({log, pluginConfig, config, version})
    .then(()=>cb(log))
  )
}