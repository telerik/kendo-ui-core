var kendoConfig = [{
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
                name: "sorting",
                depends: [ "sortable" ]
            }, {
                name: "paging",
                depends: [ "pageable" ]
            }, {
                name: "selection",
                depends: [ "sortable" ]
            }
        ]
    }, {
        name: "chart",
        source: "kendo.chart.js",
        depends: [ "data" ]
    }
];

(function() {

function ScriptResolver(config) {
    this.config = config;
    this.scripts = [];
    this.resolved = [];
    this.seen = [];
}

ScriptResolver.prototype = {
    addComponent: function(name, features) {
        var resolver = this,
            features = features || [],
            component = resolver.findComponent(name);

        features.forEach(function(featureName) {
            resolver.resolve(
                findByName(component.features, featureName)
            );
        });

        resolver.resolve(component);
    },

    resolve: function(component) {
        var resolver = this,
            depends = component.depends || [],
            seen = resolver.seen,
            resolved = resolver.resolved;

        seen.push(component.name);

        depends.forEach(function(dependancyName) {
            if (!inArray(resolved, dependancyName) &&
                 inArray(seen, dependancyName)) {

                // Circular dependancy
                return;
            }

            resolver.resolve(
                resolver.findComponent(dependancyName)
            );
        });

        resolver.registerScript(component.source);
        resolver.resolved.push(component);
    },

    registerScript: function(source) {
        var scripts = this.scripts;

        if (source && scripts.indexOf(source) === -1) {
            scripts.push(source);
        }
    },

    findComponent: function(name) {
        return findByName(this.config, name);
    }
};

function findByName(arr, name) {
    var result,
        i,
        length = arr.length,
        entry;

    for (i = 0; i < length; i++) {
        entry = arr[i];
        if (entry.name === name) {
            return entry;
        }
    }
}

function inArray(arr, element) {
    return arr.indexOf(element) !== -1;
}

window.ScriptResolver = ScriptResolver;

})();
