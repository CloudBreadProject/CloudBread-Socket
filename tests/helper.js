import { expect } from 'chai';
import path from 'path';

require('app-module-path').addPath(path.resolve(__dirname, '../src'));

global.expect = expect;

global.__DEV__ = false;
global.__PORT__ = 8111;
