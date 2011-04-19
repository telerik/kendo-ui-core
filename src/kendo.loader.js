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
    function readyWait(modifier) {
        if (window.jQuery) {
            window.jQuery.readyWait += modifier;
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

            scriptElement.onload = function() {
                that.resolved = true;

                callback();

                // decrementing the readyWait counter to allow jQuery(document).ready to be raised
                readyWait(-1);
            }

            // "onreadystatechange" is used in IE
            scriptElement.onreadystatechange = function() {
                if (/complete|loaded/.test(scriptElement.readyState)) {
                    scriptElement.onload();

                    // window.load is raised before the SCRIPT is "complete" so we are calling jQuery.ready() 
                    var jQuery = window.jQuery;
                    if (jQuery && jQuery.readyWait < 1 && jQuery.isReady) {
                        jQuery.ready();
                    }
                }
            }

            scriptElement.onerror = function() {
                // decrementing the readyWait counter to allow jQuery(document).ready to be raised
                readyWait(-1);
                throw new Error(scriptElement.src + " failed to load");
            };

            // delaying jQuery(document).ready() by incrementing the readyWait counter
            readyWait(1);

            scriptElement.src = combine(loaderSettings.basePath, that.url);
            // loading the script by adding it to the HEAD
            head.appendChild(scriptElement);
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
        datasource: {
            url: "kendo.datasource.js",
            depends: "query"
        },
        sortable: {
            url: "kendo.sortable.js",
            depends: "datasource"
        },
        grid: {
            url: "kendo.grid.js",
            depends: "datasource",
            features: { sortable: "sortable" }
        }
    });

})(window, document);
