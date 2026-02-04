/* jshint browser:false, node:true, esnext: true */

import * as fs from 'fs';

const parsedVersion = JSON.parse(fs.readFileSync('VERSION'));

const now = new Date();

const versionYear = parsedVersion.year;
const month = Math.max((now.getMonth() + 1 + (now.getFullYear() - versionYear) * 12), 0);

const versionQ = parsedVersion.release;

const version = process.env.VERSION || `${versionYear}.${versionQ}.${month * 100 + now.getDate()}`;

export { version };
