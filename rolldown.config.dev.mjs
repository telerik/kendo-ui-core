import glob from 'glob';
import path from 'path';
import { version } from './build/gulp/kendo-version.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, './src');

const files = glob.sync('./src/kendo.*.js');
const cultures = glob.sync('./src/cultures/*.js');
const messages = glob.sync('./src/messages/*.js');

/**
 * @type {import('rolldown').RolldownPlugin}
 */
const replaceVersion = {
    name: 'replace-version',
    transform: {
        filter: /kendo\.licensing\.js$/,
        handler(code) {
            return code.replace(/\$KENDO_VERSION/gm, version);
        }
    }
};

/**
 * @type {import('rolldown').RolldownOptions[]}
 */
export default [{
    input: files,
    treeshake: false,
    output: [{
        dir: './dev',
        format: 'esm',
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: rootPath
    }],
    plugins: [replaceVersion]
}, {
    input: cultures,
    treeshake: false,
    output: [{
        dir: './dev/cultures',
        format: 'esm',
    }],
}, {
    input: messages,
    treeshake: false,
    output: [{
        dir: './dev/messages',
        format: 'esm',
    }]
}];
