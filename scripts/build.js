const path = require('path');
const child_process = require('child_process');

const __mainDir = path.join(__dirname, '..');
const webpackBinPath = path.join(__mainDir, 'node_modules', 'webpack', 'bin', 'webpack.js')

async function buildElectron() {  
  console.log('Building Electron');
  
  const webpackProcess = child_process.spawn(
    webpackBinPath,
    [
      '--config',
      path.join(__mainDir, 'webpack.electron.config.js'),
      '--mode',
      'production',
      '--color'
    ], {
      env: {
        ...process.env,
        NODE_ENV: 'production'
      },
      cwd: __mainDir
    }
  );

  webpackProcess.stdout.pipe(process.stdout);
  webpackProcess.stderr.pipe(process.stderr);

  return new Promise((res, rej) => {
    webpackProcess.on('exit', res)
  })
}

async function buildReact() {
  console.log('Building React');
  
  const reactProcess = child_process.spawn(
    webpackBinPath,
    [
      '--config',
      path.join(__mainDir, 'webpack.react.config.js'),
      '--mode',
      'production',
      '--color'
    ], {
      env: {
        ...process.env,
        NODE_ENV: 'production'
      },
      cwd: __mainDir
    }
  );

  reactProcess.stdout.pipe(process.stdout);
  reactProcess.stderr.pipe(process.stderr);

  return new Promise((res, rej) => {
    reactProcess.on('exit', res)
  })
}

async function run() {
  console.clear();
  await buildElectron();
  console.log();
  await buildReact();
}

run();