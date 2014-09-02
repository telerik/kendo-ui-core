(function() {

function ScriptResolver(config) {
    this.config = config;
    this.reset();
}

ScriptResolver.prototype = {
    addComponent: function(id, features) {
        var resolver = this,
            features = features || [],
            component = resolver._findComponent(id),
            currentFeature;

        if (!component) {
             throw new Error("Missing configuration for " + id);
        }

        $.each(features, function(i, val) {
            currentFeature = findById(component.features || [], val);

            if (!currentFeature) {
                 throw new Error(
                     "Missing feature " + val + " for " + id
                 );
            }

            resolver._resolve(currentFeature);
        });

        resolver._resolve(component);
    },

    reset: function() {
        var resolver = this;

        resolver.inline = [];
        resolver.deferred = [];

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

        resolver._register(seen, component.id);
        $.each(depends, function(i, dependancyId) {
            circularDependancy =
                !inArray(resolved, dependancyId) &&
                 inArray(seen, dependancyId);

            if (circularDependancy) {
                 throw new Error(
                     "Circular dependancy for " + dependancyId
                 );
            }

            dependancy = resolver._findComponent(dependancyId);

            if (!dependancy) {
                 throw new Error(
                     "Unable to resolve " + dependancyId +
                     " required by " + component.id
                 );
            }

            resolver._resolve(dependancy);
        });

        var sources = component.defer ? resolver.deferred : resolver.inline;
        resolver._register(sources, component.source);
        resolver._register(resolved, component.id);

        resolver.scripts = resolver.inline.concat(resolver.deferred);
    },

    _register: function(registry, entry) {
        if (entry && !inArray(registry, entry)) {
            registry.push(entry);
        }
    },

    _findComponent: function(id) {
        return findById(this.config, id);
    }
};

function findById(arr, id) {
    var result,
        i,
        length = arr.length,
        entry;

    for (i = 0; i < length; i++) {
        entry = arr[i];
        if (entry.id === id) {
            return entry;
        }
    }
}

function inArray(arr, element) {
    return $.inArray(element, arr) !== -1;
}

window.ScriptResolver = ScriptResolver;

})();
