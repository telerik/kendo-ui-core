import glob from 'glob';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { baseOptions, root } from './rollup.config';

const files = glob.sync('**/*.js', { cwd: root })
    .filter((file) => !['angular.js', 'angular.min.js', 'jquery.js', 'jquery.min.js', 'jszip.js', 'jszip.min.js'].includes(file));

const isExternal = (file, importer) => {
    const resolvedImporter = path.resolve(root, importer);
    const resolvedFile = path.resolve(root, file);
    const resolvedSrc = path.resolve(root);

    if (resolvedFile === resolvedImporter) {
        return false;
    }

    if (resolvedFile.indexOf('node_modules') >= 0) {
        return false;
    }

    if (resolvedFile.indexOf('@progress') >= 0) {
        return false;
    }

    if (resolvedFile.indexOf(resolvedSrc) >= 0) {
        return true;
    }

    return false;
};

const configMap = (name) => ({
    input: `${root}/${name}`,
    output: [{
        format: "umd",
        file: `./dist/dev/js/${name}`,
        sourcemap: 'inline',
        name: name.replace('.', ''),
        ...baseOptions
    },{
        format: "esm",
        file: `./dist/mjs/${name}`,
        sourcemap: 'inline',
        ...baseOptions
    }],
    external: (file) => isExternal(file, name),
    treeshake: false,
    plugins: [
        nodeResolve()
    ]
});

export default files.map((name) => configMap(name));
