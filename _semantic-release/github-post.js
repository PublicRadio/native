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
  
const promiseHook = ({log, pluginConfig, config, version}) =>
  new Promise((resolve, reject) =>
    spawn('npm', ['run', 'publish:android-release', `--public-radio-native-android:version="${version}"`])
      .progress((childProcess) => {
          console.log('[spawn] childProcess.pid: ', childProcess.pid);
          childProcess.stdout.on('data', (data)=> {
              if(data.toString() === '\n' || data.toString() === '' || data.toString() === '.'){
                return;
              }
              console.log('[spawn] stdout: ', data.toString());
          });
          childProcess.stderr.on('data', (data)=> {
              console.log('[spawn] stderr: ', data.toString());
          });
      })
      .then(() =>{
          console.log('[spawn] done!');
          resolve()
      })
      .fail((err) =>{
          console.error('[spawn] ERROR: ', err);
          reject()
      })
    )

module.exports = function (pluginConfig, config, cb) {
  const {pkg} = config;
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null

  const {version} = pkg

  return changelogPromise({
    version,
    repository,
    file: false
  })
  .catch((err)=>console.error(err))
  .then((log)=>
    promiseHook({log, pluginConfig, config, version})
    .then(()=>cb(log))
  )
}