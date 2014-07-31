(function(){

    var LOADED = {};

    function basedir(url) {
        return url.replace(/\/*[^\/]+$/, "/");
    }

    function normalize(url) {
        var m = /^(https?:\/\/|\/\/)(.*)$/i.exec(url);
        if (!m) throw new Error("Cannot normalize url: " + url);
        var scheme = m[1], path = m[2].split("/");
        var normal = [];
        path.forEach(function(x){
            if (x == "." || x == "") return;
            else if (x == "..") normal.pop();
            else normal.push(x);
        });
        return scheme + normal.join("/");
    }

    function sync_require(filename) {
        if (Array.isArray(filename)) {
            filename.forEach(sync_require);
        } else {
            load(basedir(window.location + ""), filename);
        }
    }

    sync_require.LOADED = LOADED;

    function load(path, file) {
        var url;
        file = file.replace(/\.js$/, "") + ".js";
        if (/^(https?:|\/\/)/.test(file)) {
            url = normalize(file);
        } else {
            url = normalize(path + file);
        }
        if (LOADED[url]) {
            return LOADED[url].value;
        }
        var start = Date.now();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        var stop = Date.now();
        var time = stop - start;
        if (xhr.status == 200) {
            var code = xhr.responseText;
            var define = make_define(path, file);
            try {
                var exported = new Function("define", code)(define);
                LOADED[url] = { value: exported, start: start, stop: stop, time: time };
                return exported;
            } catch(ex) {
                console.error("Caught error when evaluating " + url);
                console.error(ex);
                return null;
            }
        } else {
            throw new Error("Cannot load: " + url);
        }
    }

    function make_define(path, file) {
        var base = file.charAt(0) == "."
            ? basedir(path + file)
            : basedir(window.location + "");
        function define(deps, factory) {
            deps = randomize(deps); // RequireJS loads them in no specified order.
            deps = deps.map(function(file){
                return load(base, file);
            });
            return factory.apply(window, deps);
        };
        define.amd = true;
        return define;
    }

    function randomize(lst) {
        return lst.slice().sort(function(a, b){
            return Math.random() - 0.5;
        });
    }

    window.requireSync = sync_require;

})();
