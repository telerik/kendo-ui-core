import glob from 'glob';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { baseOptions, root } from './rollup.config';

const files = glob.sync('**/kendo.*.js', { cwd: root })
    .filter((file) => !['angular.js', 'angular.min.js', 'jquery.js', 'jquery.min.js', 'jszip.js', 'jszip.min.js'].includes(file));

const resolvedFiles = files.map(f => path.resolve(root, f));

const configMap = (file) => ({
    input: path.resolve(root, file),
    output: [{
        format: "umd",
        file: `./dist/dev/js/${file}`,
        sourcemap: 'inline',
        name: file.replace('.', ''),
        ...baseOptions
    },{
        format: "esm",
        file: `./dist/mjs/${file}`,
        sourcemap: 'inline',
        ...baseOptions
    }],
    external: resolvedFiles.filter(f => f !== path.resolve(root, file)),
    treeshake: false,
    plugins: [
        nodeResolve()
    ]
});

export default files.map((file) => configMap(file));
