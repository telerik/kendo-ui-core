var kendoComponents = [{
        name: "core",
        source: "kendo.core.js"
    }, {
        name: "data",
        source: "kendo.data.js",
        depends: [ "core" ]
    }, {
        name: "sortable",
        source: "kendo.sortable.js",
        depends: [ "data" ]
    }, {
        name: "pager",
        source: "kendo.pager.js",
        depends: [ "data" ]
    }, {
        name: "selectable",
        source: "kendo.selectable.js",
        depends: [ "core" ]
    }, {
        name: "grid",
        source: "kendo.grid.js",
        depends: [ "data", "navigatable" ],
        features: [{
                name: "grid-sorting",
                depends: [ "sortable" ]
            }, {
                name: "grid-paging",
                depends: [ "pageable" ]
            }, {
                name: "grid-selection",
                depends: [ "sortable" ]
            }
        ]
    }, {
        name: "chart",
        source: "kendo.chart.js",
        depends: [ "data" ]
    }
];

function resolveScripts(definitions, features) {
    var scripts = [];
    features.forEach(function(f) {
        resolve(definitions, f, scripts);
    });
    return scripts;
}

function resolve(definitions, feature, scripts) {
    var componentName = feature.split("-")[0],
        featureName = feature.split("-")[1],
        component = definitions.filter(function(c) {
        return c.name === componentName })[0];

    if (featureName && component.features) {
        component.features.forEach(function(feature) {
            if (feature.depends) {
                feature.depends.forEach(function(fd) {
                    resolve(definitions, fd, scripts);
                });
            }
        });
    }

    if (component.depends) {
        component.depends.forEach(function(requisite) {
            resolve(definitions, requisite, scripts);
        });
    }

    if (scripts.indexOf(component.source) === -1) {
        scripts.push(component.source);
    }
}

