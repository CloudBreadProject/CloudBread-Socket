import webpack from 'webpack';
import { webpackServer, stats } from '../config';

function bundle() {
  return new Promise((resolve, reject) => {
    const webpackPackage = [webpackServer];
    const bundler = webpack(webpackPackage);
    bundler.run((err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(res.toString(stats));
      return resolve();
    });
  });
}

export default bundle;
