const acorn = require('acorn');
const fs = require('fs');
const path = require('path');
const srcDir = "./src";

const kendoFiles = {};

class KendoFile {
    constructor(filename, baseDir, importerDir) {
        this._filename = filename;
        this._baseDir = path.resolve(baseDir);
        this._resolvedPath = path.resolve(this._baseDir, importerDir || '', filename);
        this._fileDir = path.dirname(this._resolvedPath);
        this._relativeDir = path.relative(this._baseDir, this._fileDir);

        if (!fs.existsSync(this._resolvedPath)) {
            console.log(`\x1b[31m${filename} is not available in ${baseDir}!\x1b[0m`);
            throw 'ERROR!';
        }
        kendoFiles[this.getFilename()] = this;
    }

    getFilename() {
        return path.relative(this._baseDir, this._resolvedPath);
    }

    getCode() {
        return fs.readFileSync(this._resolvedPath);
    }

    getTokens() {
        if (!this._tokens) {
            this._tokens = acorn.parse(this.getCode(), { ecmaVersion: 'latest', sourceType: 'module' }).body;
        }
        return this._tokens;
    }

    getImportDeclarations() {
        return this.getTokens().filter(token => token.type === 'ImportDeclaration');
    }

    getImports() {
        if (this._imports) {
            return this._imports;
        }

        this._imports = [];
        const files = this.getImportDeclarations()
            .map(token => token.source.value)
            // .map(value => value.replace(/(\.+\/)+/, ''))
            // .filter(value => /^kendo\./.test(value))
            ;

        files.forEach((file) => {
            const resolvedFile = path.resolve(this._fileDir, file);
            if (fs.existsSync(resolvedFile)) {
                let kendoModule = kendoFiles[path.relative(this._baseDir, resolvedFile)] || new KendoFile(file, this._baseDir, this._relativeDir);

                if (!this._imports.includes(kendoModule.getFilename())) {
                    pushIfRequired(this._imports, ...kendoModule.getImports());
                    pushIfRequired(this._imports, kendoModule.getFilename());
                }
            }
        });

        return this._imports;
    }

    getMeta() {
        let metaToken = this.getTokens()
            .filter(token => this._isMeta(token))[0];

        if (metaToken) {
            let meta = this._parseProperties(metaToken.declarations[0].init.properties);
            meta.source = this.getFilename().replace(/\.js$/i, ".min.js");
            meta.widgets = [];

            return meta;
        }
    }

    _parseProperties(properties) {
        let value = {};
        properties.forEach((prop) => {
            if (prop.type === 'Property') {
                value[prop.key.name] = this._parseValue(prop.value);
            }
        });
        return value;
    }

    _parseValue(value) {
        switch (value.type) {
            case 'Literal':
                return value.value;
            case 'ArrayExpression':
                return value.elements.map(elm => this._parseValue(elm));
            case 'ObjectExpression':
                return this._parseProperties(value.properties);
            default:
                break;
        }
    }

    _isMeta(token) {
        if (token.type === 'VariableDeclaration' &&
            token.declarations &&
            token.declarations.length &&
            token.declarations[0].type === 'VariableDeclarator' &&
            token.declarations[0].init &&
            token.declarations[0].id && /__meta__/.test(token.declarations[0].id.name)) {
                return true;
        }
    }
}

function pushIfRequired(arr, ...str) {
    str.forEach(value => {
        if (
            // /^kendo\./.test(value) &&
            !arr.includes(value)) {
            arr.push(value);
        }
    });
}

function listKendoFiles(baseDir = srcDir) {
    var js_files = fs.readdirSync(baseDir)
        .filter(function(filename) {
            return /^kendo\..*\.js$/i.test(filename) && !/\.min\.js$/i.test(filename);
        })
        .sort();
    return js_files;
}

function loadComponents(files = [], baseDir = srcDir) {
    var loads = [];
    files.forEach(function(file) {
        loadComponent(file, baseDir, loads);
    });
    return loads;
}

function loadComponent(file, baseDir, loads) {
    if (!fs.existsSync(path.resolve(baseDir, file))) {
        console.log(`\x1b[31m${file} is not available in ${baseDir}!\x1b[0m`);
    }

    if (!loads.includes(file)) {
        let kendoModule = kendoFiles[file] || new KendoFile(file, baseDir);
        pushIfRequired(loads, ...kendoModule.getImports());
        pushIfRequired(loads, kendoModule.getFilename());
    }
}

function loadAll(baseDir = srcDir) {
    return loadComponents(listKendoFiles(baseDir), baseDir);
}

function buildKendoConfig(baseDir = srcDir) {
    var files = listKendoFiles(baseDir);
    var template = JSON.parse(fs.readFileSync(path.resolve("./download-builder", "config", "categories.json"), "utf8"));
    template.components = [];

    files.forEach(function(file) {
        var kendoModule = kendoFiles[file] || new KendoFile(file, baseDir);
        var meta = kendoModule.getMeta();
        if (!meta) {
            console.error("*** No __meta__ declaration in " + file);
        } else {
            template.components.push(meta);
        }
    });

    return template;
}

/* -----[ exports ]----- */

exports.listKendoFiles = listKendoFiles;
exports.buildKendoConfig = buildKendoConfig;
exports.loadComponents = loadComponents;
exports.loadAll = loadAll;