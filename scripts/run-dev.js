const chokidar = require('chokidar');
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const __mainDir = path.join(__dirname, '..');
const electronBinPath = path.join(__mainDir, 'node_modules', 'electron', 'dist', 'Electron.app', 'Contents', 'MacOS', 'Electron')
const webpackBinPath = path.join(__mainDir, 'node_modules', 'webpack', 'bin', 'webpack.js')

let webpackProcess;
let electronProcess;
let reactProcess;

let spawnBouncing = null;

webpackProcess = child_process.spawn(
  webpackBinPath,
  [
    '--config',
    path.join(__mainDir, 'webpack.electron.config.js'),
    '--mode',
    'development',
    '--watch',
    '--color'
  ], {
    env: {
      ...process.env,
      NODE_ENV: 'development'
    },
    cwd: __mainDir
  }
)

reactProcess = child_process.spawn(
  webpackBinPath,
  [
    'serve',
    '--config',
    path.join(__mainDir, 'webpack.react.config.js'),
    '--mode',
    'development',
    '--color'
  ], {
    env: {
      ...process.env,
      NODE_ENV: 'development'
    },
    cwd: __mainDir
  }
)
// webpackProcess.stderr.pipe(process.stderr)
reactProcess.stderr.pipe(process.stderr)

// webpackProcess.stdout.pipe(process.stdout)
reactProcess.stdout.pipe(process.stdout)



if (fs.existsSync(path.join(__mainDir, 'dist'))) {
  spawnElectronProcess()
}

// // One-liner for current directory
chokidar.watch(path.join(__mainDir, 'src', 'main')).on('all', async (event, path) => {
  console.log('changed')
  if (electronProcess) {
    spawnElectronProcess()
  }
});

function wait(ms) {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}

function spawnElectronProcess() {
  if (spawnBouncing) {
    clearTimeout(spawnBouncing)
  }

  spawnBouncing = setTimeout(() => {
    if (electronProcess) {
      console.log(electronProcess.kill())
    }
    electronProcess = child_process.spawn(electronBinPath, [__mainDir], { 
      env: {
        ...process.env,
        NODE_ENV: 'development'
      },
      stdio: 'pipe',
      cwd: __mainDir
    });

    electronProcess.stdout.pipe(process.stdout)
    electronProcess.stderr.pipe(process.stderr)
    spawnBouncing = null;
  }, 500)
}