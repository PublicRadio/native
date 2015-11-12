const changelog = require('conventional-changelog');
const parseUrl = require('github-url-from-git');
var spawn = require('child-process-promise').spawn;

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
  spawn('npm', ['run', 'publish:android-release', `--public-radio-native-android:version="${version}"`])
    .progress((childProcess) =>{
        console.log('[spawn] childProcess.pid: ', childProcess.pid);
        childProcess.stdout.on('data', (data)=> {
            console.log('[spawn] stdout: ', data.toString());
        });
        childProcess.stderr.on('data', (data)=> {
            console.log('[spawn] stderr: ', data.toString());
        });
    })
    .then(() =>{
        console.log('[spawn] done!');
    })
    .fail((err) =>{
        console.error('[spawn] ERROR: ', err);
    })

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