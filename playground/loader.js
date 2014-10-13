(function(){

    var LOADED = {};
    var MODULES = {};

    var ID = 0;

    var HOP = Object.prototype.hasOwnProperty;

    var ALLSCRIPTS = window.ALLSCRIPTS = [];

    ALLSCRIPTS.html = function() {
        return map(ALLSCRIPTS, function(el){
            return "<script src=\"" + el + "\"></script>";
        }).join("\n");
    };

    window.$$$define = window.define;

    function basedir(url) {
        return url.replace(/\/*[^\/]+$/, "/");
    }

    function map(a, f) {
        for (var i = 0, ret = []; i < a.length; ++i)
            ret[i] = f(a[i], i);
        return ret;
    }

    function normalize(url) {
        var m = /^(https?:\/\/|\/\/)(.*)$/i.exec(url);
        if (!m) throw new Error("Cannot normalize url: " + url);
        var scheme = m[1], path = m[2].split("/");
        var normal = [];
        map(path, function(x){
            if (x == "." || x == "") return;
            else if (x == "..") normal.pop();
            else normal.push(x);
        });
        return scheme + normal.join("/");
    }

    function sync_require(filename) {
        if (filename instanceof Array) {
            map(filename, function(filename){
                load(basedir(window.location + ""), filename);
            });
        } else {
            load(basedir(window.location + ""), filename);
        }
        document.write("<script> requireSync.execAll(); define = $$$define; </script>");
    }

    sync_require.execAll = function() {
        for (var i in MODULES) if (HOP.call(MODULES, i)) {
            execute(i);
        }
    };

    function geturl(path, file) {
        var url;
        file = file.replace(/\.js$/, "") + ".js";
        if (/^(https?:|\/\/)/.test(file)) {
            url = normalize(file);
        } else {
            url = normalize(path + file);
        }
        var m = /^(.*?)([^\/]*)$/.exec(url);
        return {
            url  : url,
            path : m[1],
            file : m[2]
        };
    }

    function load(path, file) {
        var x = geturl(path, file);
        var def = make_define(x.url, x.path, x.file);
        if (!LOADED[x.url]) {
            LOADED[x.url] = true;
            if (/MSIE\s*[89]/.test(navigator.userAgent)) {
                var req = new XMLHttpRequest();
                req.open("GET", x.url, false);
                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        if (req.status == 200 || req.status == 304) {
                            new Function("define", req.responseText)(window[def]);
                        }
                    }
                };
                req.send(null);
            } else {
                document.write("<script>window.define = " + def + "</script>");
                document.write("<script src='" + x.url + "'></script>");
            }
        }
    }

    var STACK = [];

    function execute(url) {
        var module = MODULES[url];
        if (!module.executed) {
            var circular = STACK.indexOf(module) >= 0;
            STACK.push(module);
            if (circular) {
                console.error("Circular dependency:");
                map(STACK, function(m, i){
                    console.log(Array(i + 1).join("  ") + "->", m.url);
                });
            } else {
                ALLSCRIPTS.push(url);
                var args = map(module.deps, execute);
                module.value = module.factory.apply(window, args);
                module.executed = true;
            }
            STACK.pop();
        }
        return module.value;
    }

    function make_define(url, base, file) {
        function define() {
            var name, deps, factory;
            switch (arguments.length) {
              case 1:
                deps = [];
                factory = arguments[0];
                break;
              case 2:
                deps = arguments[0];
                factory = arguments[1];
                break;
              case 3:
                deps = arguments[1];
                factory = arguments[2];
                break;
            }

            var ready = true;
            deps = map(deps, function(file){
                var x = geturl(base, file);
                var url = x.url;
                if (!MODULES[url] || !MODULES[url].executed) {
                    ready = false;
                    load(base, file);
                }
                return url;
            });

            MODULES[url] = {
                url     : url,
                factory : factory,
                deps    : deps
            };

            if (ready) {
                execute(url);
            }
        }
        define.amd = { jQuery: true };
        var id = ++ID;
        var defname = "$$$define_" + id;
        window[defname] = define;
        return defname;
    }

    function randomize(lst) {
        return lst.slice().sort(function(a, b){
            return Math.random() - 0.5;
        });
    }

    window.requireSync = sync_require;

})();
