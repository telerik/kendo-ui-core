(function() {

function ScriptResolver(config) {
    this.config = config;
    this.reset();
}

ScriptResolver.prototype = {
    addComponent: function(name, features) {
        var resolver = this,
            features = features || [],
            component = resolver._findComponent(name),
            currentFeature;

        if (!component) {
             throw new Error("Missing configuration for " + name);
        }

        $.each(features, function(i, val) {
            currentFeature = findByName(component.features || [], val);

            if (!currentFeature) {
                 throw new Error(
                     "Missing feature " + val + " for " + name
                 );
            }

            resolver._resolve(currentFeature);
        });

        resolver._resolve(component);
    },

    reset: function() {
        var resolver = this;

        resolver.scripts = [];
        resolver.resolved = [];
        resolver.seen = [];
    },

    _resolve: function(component) {
        var resolver = this,
            depends = component.depends || [],
            seen = resolver.seen,
            resolved = resolver.resolved,
            dependancy,
            circularDependancy;

        seen.push(component.name);
        depends.forEach(function(dependancyName) {
            circularDependancy =
                !inArray(resolved, dependancyName) &&
                 inArray(seen, dependancyName);

            if (circularDependancy) {
                 throw new Error(
                     "Circular dependancy for " + dependancyName
                 );
            }

            dependancy = resolver._findComponent(dependancyName);

            if (!dependancy) {
                 throw new Error(
                     "Unable to resolve " + dependancyName +
                     " required by " + component.name
                 );
            }

            resolver._resolve(dependancy);
        });

        resolver._registerScript(component.source);
        resolver.resolved.push(component.name);
    },

    _registerScript: function(source) {
        var scripts = this.scripts;

        if (source && scripts.indexOf(source) === -1) {
            scripts.push(source);
        }
    },

    _findComponent: function(name) {
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
