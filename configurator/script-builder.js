var kendoComponents = [{
        name: "core",
        source: "kendo.core.js"
    }, {
        name: "data",
        source: "kendo.data.js",
        requires: [ "core" ]
    }, {
        name: "chart",
        requires: [ "data" ],
        source: "kendo.chart.js",
        modules: [{
                name: "main",
                source: "chart/main.js"
            }, {
                name: "svg",
                source: "chart/svg.js"
            }, {
                name: "vml",
                optional: true,
                source: "chart/vml.js"
            }, {
                name: "themes",
                optional: true,
                source: "chart/themes.js"
            }
        ]
    }
];

function configureScripts(components, features) {
    var scripts = [];
    features.forEach(function(f) {
        resolve(components, f, scripts);
    });
    return scripts;
}

function resolve(components, feature, scripts) {
    var match =
        components.filter(function(c) { return c.name === feature })[0];

    if (match.requires) {
        match.requires.forEach(function(requisite) {
            resolve(components, requisite, scripts);
        });
    }

    if (scripts.indexOf(match.source) === -1) {
        scripts.push(match.source);
    }
}

