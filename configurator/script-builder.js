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

(function() {

function ScriptResolver(config) {
    this.config = config;
    this.scripts = [];
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
            depends = component.depends || [];

        depends.forEach(function(dependancy) {
            resolver.resolve(
                resolver.findComponent(dependancy)
            );
        });

        resolver.registerScript(component.source);
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

window.ScriptResolver = ScriptResolver;

})();
