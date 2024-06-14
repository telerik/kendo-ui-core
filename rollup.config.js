import glob from 'glob';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';
import path from 'path';
import fs from 'fs';
import { createRequire } from "module";

export const root = './src';
const resolvePath = (f) => path.resolve(f);
const isBundle = (name) => /["']bundle all["'];/.test(fs.readFileSync(`${root}/${name}`).toString());
export const removeBundle = (name) => ((bundle) => !bundle.includes(name));
export const files = glob.sync('kendo.*.js', { cwd: root });
export const thirdParty = ['jquery', 'jquery.js', './jquery.js'];
export const externals = glob.sync(`${root}/kendo.*.js`).map(resolvePath).concat(thirdParty);
export const cultures = glob.sync('cultures/*.js', { cwd: root });
export const messages = glob.sync('messages/*.js', { cwd: root });
const require = createRequire(import.meta.url);
export const version = require('./build/gulp/kendo-version').version;

const globals = {
    jquery: '$'
};

// Used only for the source code bundle.
const babelArg = process.argv.includes("--configBabel");
const babel = babelArg ? require('@rollup/plugin-babel') : null;

export function transformCodePlugin() {
    return {
        name: 'transform-kendo-modules',
        renderChunk(code) {
            code = code
                .replace(/(\.+\/)+(kendo[\.\w]+)/gm, '$2');

            return {
                code: code
            };
        }
    };
}

export function addKendoVersion() {
    return {
        name: 'transform-kendo-modules',
        renderChunk(code) {
            code = code
                .replace(/\$KENDO_VERSION/gm, version);

            return {
                code: code
            };
        }
    };
}

/**
 * @type {import('rollup').OutputOptions}
 */
export const baseOptions = {
    globals: globals,
    strict: false
};

/**
 * @type {import('rollup').RollupOptions}
 */
const resourcesConfig = (name, options = {}) => ({
    input: `${root}/${name}`,
    output: [{
        format: "umd",
        dir: `./dist/raw-js/${options.dir}`,
        sourcemap: false,
        ...baseOptions
    }],
    external: ['../kendo.core.js'],
    treeshake: false,
    plugins: [
        transformCodePlugin(),
        addKendoVersion(),
        polyfill(['../kendo.core.js']),
        babel ? babel({ babelHelpers: 'bundled' }) : null // Used only for the source code bundle.
    ]
});

/**
 * @type {import('rollup').RollupOptions}
 */
const configMap = (name) => ({
    input: `${root}/${name}`,
    output: [{
        format: 'umd',
        dir: './dist/raw-js',
        sourcemap: false,
        name: name.replace('.', ''),
        ...baseOptions
    }],
    external: isBundle(name) ? thirdParty : externals.filter(removeBundle(name)),
    treeshake: false,
    plugins: [
        transformCodePlugin(),
        addKendoVersion(),
        name === 'kendo.core.js' || isBundle(name) ? polyfill(['jquery']) : null,
        nodeResolve(),
        babel ? babel({ babelHelpers: 'bundled' }) : null // Used only for the source code bundle.
    ]
});

export default files.map((name) => configMap(name))
            .concat(cultures.map((name) => resourcesConfig(name, { dir: 'cultures' })))
            .concat(messages.map((name) => resourcesConfig(name, { dir: 'messages' })));
