;(function(window, document, undefined) {
    var head = document.getElementsByTagName("head")[0],
        noop = function () {},
        kendo = window.kendo = window.kendo || {},
        loader = kendo.loader = {},
        toString = Object.prototype.toString,
        loaderSettings = {
            basePath: ""
        },
        SCRIPT = "script",
        STRING = "string";

    (function() {
        var scripts = document.getElementsByTagName(SCRIPT),
            src,
            length,
            idx,
            position;

        for (idx = 0, length = scripts.length; idx < length; idx++) {
            src = scripts[idx].getAttribute("src");

            if (!src) {
                continue;
            }

            position = src.indexOf("kendo.loader");
            if (position >= 0) {
                loaderSettings.basePath = src.substring(0, position);
            }
        }
    })();

    function holdReady(hold) {
        if (window.jQuery) {
            window.jQuery.holdReady(hold);
        }
    }

    function Script(url) {
        this.url = url;
        this.depends = [];
        this.features = {};
        this.resolved = false;
    }

    Script.prototype = {
        load: function(callback) {
            var scriptElement = document.createElement(SCRIPT),
                that = this;

            scriptElement.onload = scriptElement.onreadystatechange = function() {
                var readyState = scriptElement.readyState;

                if (!readyState || /complete|loaded/.test(scriptElement.readyState)) {
                    that.resolved = true;

                    callback();

                    holdReady(false);
                }
            }

            scriptElement.onerror = function() {
                // decrementing the readyWait counter to allow jQuery(document).ready to be raised
                holdReady(false);
                throw new Error(scriptElement.src + " failed to load");
            };

            // loading the script by adding it to the HEAD
            head.appendChild(scriptElement);
            scriptElement.src = combine(loaderSettings.basePath, that.url);

            holdReady(true);
        },

        resolve: function (options, callback) {
            var that = this,
                enabledFeatures = [],
                feature;

            options = options || {};
            callback = callback || noop;

            if (toString.call(options) === "[object Function]") {
                callback = options;
                options = {};
            }

            if (that.resolved) {
                callback();
            } else {
                that.wait(that.depends, function() {
                    that.load(function() {
                        for (feature in that.features) {
                            if (options[feature]) {
                                enabledFeatures.push(that.features[feature]);
                            }
                        }

                        that.wait(enabledFeatures, callback);
                    });
                });
            }
        },

        wait: function(depends, callback) {
            var unresolvedDependencyCount = depends.length,
                idx;

            if (!unresolvedDependencyCount) {
                callback();
            } else {
                for (idx = 0; idx < depends.length; idx++) {
                    depends[idx].resolve(function() {
                        if (!--unresolvedDependencyCount) {
                            callback();
                        }
                    });
                }
            }
        }
    }

    function loadScriptElements(scripts) {
        var scriptElements = document.getElementsByTagName(SCRIPT),
            script,
            src,
            idx;

        // add all SCRIPT elements as resolved scripts
        for (idx = 0; idx < scriptElements.length; idx++) {

            // using getAttribute to get the actual content of the "src" attribute instead of the absolute URL
            src = scriptElements[idx].getAttribute("src");

            if (src) {
                script = scripts[src] || new Script(src);
                script.resolved = true;
                scripts[src] = script;
            }
        }
    }

    function combine(basePath, path) {
        if (!basePath || path.indexOf("//") > -1) {
            return path;
        }

        return basePath.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
    }

    function createScript(definition, scripts) {
        var depends = definition.depends,
            script,
            idx,
            url;

        script = new Script(typeof definition === STRING ? definition : definition.url);

        depends = depends ? typeof depends === STRING ? [depends] : depends : [];

        for (idx = 0; idx < depends.length; idx++) {
            url = depends[idx];

            if (!scripts[url]) {
                scripts[url] = new Script(url);
            }

            script.depends.push(scripts[url]);
        }

        return script;
    }

    function ScriptLoader() {
        this.scripts = {};
    }

    ScriptLoader.prototype = {
        define: function(options) {
            var that = this,
                scripts = that.scripts,
                key,
                definition,
                script,
                featureName,
                features;

            for (key in options) {
                definition = options[key];
                features = definition.features || {};

                script = createScript(definition, scripts);

                for (featureName in features) {
                    script.features[featureName] = scripts[featureName] || createScript(features[featureName], scripts);
                }

                scripts[key] = script;

                (function (methodName) {
                    that[methodName] = function(options, callback) {
                        // SCRIPT elements may be included later than the loader script - make sure we are up to date.
                        loadScriptElements(scripts);
                        scripts[methodName].resolve(options, callback);
                    };
                })(key);
            }
        }
    }

    kendo.loader = new ScriptLoader();
    kendo.loader.settings = loaderSettings;
    kendo.ScriptLoader = ScriptLoader;
    kendo.Script = Script;

    kendo.loader.define( {
        core: "kendo.core.js",
        query: {
            url: "kendo.query.js",
            depends: "core"
        },
        fx: {
            url: "kendo.fx.js",
            depends: "core"
        },
        datasource: {
            url: "kendo.data.js",
            depends: "query"
        },
        pageable: {
            url: "kendo.pager.js",
            depends: "datasource"
        },
        sortable: {
            url: "kendo.sortable.js",
            depends: "datasource"
        },
        navigatable: {
            url: "kendo.navigatable.js",
            depends: "core"
        },
        selectable: {
            url: "kendo.selectable.js",
            depends: "core"
        },
        grid: {
            url: "kendo.grid.js",
            depends: ["datasource", "navigatable"],
            features: { sortable: "sortable", pageable: "pageable", selectable: "selectable" }
        },
        draganddrop: {
            url: "kendo.draganddrop.js",
            depends: "query"
        },
        slider: {
            url: "kendo.slider.js",
            depends: "draganddrop"
        },
        splitter: {
            url: "kendo.splitter.js",
            depends: "draganddrop"
        },
        treeview: {
            url: "kendo.treeview.js",
            depends: "draganddrop"
        },
        window: {
            url: "kendo.window.js",
            depends: [ "draganddrop", "fx" ]
        },
        menu: {
            url: "kendo.menu.js",
            depends: [ "fx" ]
        }
    });

})(window, document);
