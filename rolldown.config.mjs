import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { version } from './build/gulp/kendo-version.mjs';

const minify = process.argv.includes('--minify');
const ext = minify ? '.min.js' : '.js';

const files = glob.sync('./src/kendo.*.js');
const cultures = glob.sync('./src/cultures/*.js');
const messages = glob.sync('./src/messages/*.js');
const subdirs = glob.sync('./src/*/kendo*.js');

const licenseFile = fs.readFileSync('resources/legal/core-license.txt').toString();
const banner = licenseFile.replace('<%= year %>', new Date().getFullYear())
    .replace('/**', '/*!');

const umdExternalRegex = [
    /^(?:\.\.\/)*(?:\.\/)?kendo[\w\.\-]+\.js$/,
];

const bundleFiles = new Set(
    files.filter(file => /["']bundle all["'];/.test(fs.readFileSync(file).toString()))
);

const globals = [...files, ...subdirs].reduce((acc, file) => {
    const basename = path.basename(file);
    const genName = genNamespace(file);
    const relativePath = file.replace(/^\.\.\/src\//, '');

    acc[`./${basename}`] = genName;
    acc[basename] = genName;
    acc[file] = genName;
    acc[path.resolve(file)] = genName;

    if (relativePath !== basename) {
        acc[relativePath] = genName;
        acc[`./${relativePath}`] = genName;
    }

    return acc;
}, {});


function genNamespace(file) {
    const basename = path.basename(file);
    const name = basename.replace(/^(?:kendo.)?([\w\.]+)*/, '$1');
    const parts = name.split('.').filter(p => p !== 'js').map(p => p.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(''));
    return 'kendo._globals.' + parts.join('');
}

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
export default [
    {
        input: files,
        treeshake: false,
        output: [{
            dir: './dist/mjs',
            format: 'esm',
            entryFileNames: `[name].js`,
            exports: 'named',
            banner,
            minify,
            sourcemap: minify
        }, {
            dir: './dist/cjs',
            format: 'cjs',
            entryFileNames: `[name].js`,
            exports: 'named',
            banner,
            minify,
            sourcemap: minify
        }],
        plugins: [replaceVersion]
    }, {
        input: cultures,
        treeshake: false,
        output: [{
            dir: './dist/mjs/cultures',
            format: 'esm',
            exports: 'named',
            entryFileNames: `[name].js`,
            banner,
            minify,
            sourcemap: minify
        }, {
            dir: './dist/cjs/cultures',
            format: 'cjs',
            exports: 'named',
            entryFileNames: `[name].js`,
            banner,
            minify,
            sourcemap: minify
        }],
    }, {
        input: messages,
        treeshake: false,
        output: [{
            dir: './dist/mjs/messages',
            format: 'esm',
            exports: 'named',
            entryFileNames: `[name].js`,
            banner,
            minify,
            sourcemap: minify
        }, {
            dir: './dist/cjs/messages',
            format: 'cjs',
            exports: 'named',
            entryFileNames: `[name].js`,
            banner,
            minify,
            sourcemap: minify
        }]
    },
    ...files.map(file => ({
        input: file,
        treeshake: false,
        external: bundleFiles.has(file) ? [] : umdExternalRegex,
        output: [{
            dir: './dist/js',
            format: 'umd',
            entryFileNames: `[name]${ext}`,
            name: genNamespace(file),
            exports: 'named',
            banner,
            minify,
            globals,
            sourcemap: minify
        }],
        plugins: [replaceVersion]
    })),
    ...cultures.map(file => ({
        input: file,
        treeshake: false,
        external: umdExternalRegex,
        output: [{
            dir: './dist/js/cultures',
            format: 'umd',
            entryFileNames: `[name]${ext}`,
            name: genNamespace(file),
            exports: 'named',
            banner,
            minify,
            globals,
            sourcemap: minify
        }],
    })),
    ...messages.map(file => ({
        input: file,
        treeshake: false,
        external: umdExternalRegex,
        output: [{
            dir: './dist/js/messages',
            format: 'umd',
            entryFileNames: `[name]${ext}`,
            name: genNamespace(file),
            exports: 'named',
            banner,
            minify,
            globals,
            sourcemap: minify
        }],
    }))
];
