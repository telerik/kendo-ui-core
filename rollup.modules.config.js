import { files, cultures, messages, addKendoVersion, baseOptions, externals, removeBundle, root } from './rollup.config';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';


export function fixJQueryImport() {
    return {
        name: 'transform-fix-jquery-import',
        renderChunk(code) {
            code = code
                .replace(/import 'jquery';/gm, 'import jQuery from "jquery";')
                .replace(/require\('jquery'\)/gm, 'const jQuery = require("jquery");');

            return {
                code: code
            };
        }
    };
}

/**
 * @type {import('rollup').RollupOptions}
 */
 const resourcesConfig = (name, options = {}) => ({
    input: `${root}/${name}`,
    output: [{
        format: "esm",
        dir: `./dist/esm/${options.dir}`,
        sourcemap: false,
        ...baseOptions
    },{
        format: "cjs",
        dir: `./dist/cjs/${options.dir}`,
        sourcemap: false,
        ...baseOptions
    }],
    external: ['../kendo.core.js'],
    treeshake: false,
    plugins: [
        addKendoVersion(),
        polyfill(['../kendo.core.js'])
    ]
});

// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
const configMap = (name) => ({
    input: `${root}/${name}`,
    output: [{
        format: 'esm',
        dir: './dist/esm',
        sourcemap: false,
        ...baseOptions
    }, {
        format: 'cjs',
        dir: './dist/cjs',
        sourcemap: false,
        exports: 'auto',
        ...baseOptions
    }],
    external: externals.filter(removeBundle(name)),
    treeshake: false,
    plugins: [
        fixJQueryImport(),
        addKendoVersion(),
        name === 'kendo.core.js' ? polyfill(['jquery']) : null,
        nodeResolve(),
    ]
});

export default files.map((name) => configMap(name))
            .concat(cultures.map((name) => resourcesConfig(name, { dir: 'cultures' })))
            .concat(messages.map((name) => resourcesConfig(name, { dir: 'messages' })));