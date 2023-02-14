import { files, cultures, messages, addKendoVersion, baseOptions, externals, removeBundle, root } from './rollup.config';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill';

/**
 * @type {import('rollup').RollupOptions}
 */
 const resourcesConfig = (name, options = {}) => ({
    input: `${root}/${name}`,
    output: [{
        format: "esm",
        dir: `./dist/mjs/${options.dir}`,
        sourcemap: false,
        plugins: [
            addKendoVersion()
        ],
        ...baseOptions
    }],
    external: ['../kendo.core.js'],
    treeshake: false,
    plugins: [
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
            dir: './dist/mjs',
            sourcemap: false,
            plugins: [
                addKendoVersion()
            ],
            ...baseOptions
        }
    ],
    external: externals.filter(removeBundle(name)),
    treeshake: false,
    plugins: [
        nodeResolve(),
    ]
});

export default files.map((name) => configMap(name))
            .concat(cultures.map((name) => resourcesConfig(name, { dir: 'cultures' })))
            .concat(messages.map((name) => resourcesConfig(name, { dir: 'messages' })));