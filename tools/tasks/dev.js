import webpack from 'webpack';
import { webpackServer, stats } from '../config';
import run from '../lib/run';
import serve from './serve';
import clean from './clean';
import copy from './copy';

function _dev() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackServer];
    const bundler = webpack(webpackPackage);
    bundler.run(async (error, res) => {
      if (error) {
        return reject(error);
      }
      console.log(res.toString(stats));
      await serve();
      return resolve();
    });
  });
}

async function dev() {
  await run(clean);
  await run(copy);
  await _dev();
}

export default dev;
