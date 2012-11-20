// this function, along with calls to it, will not exist in compressed builds
var kendo_module = (function(cache, $, base_url, evil){
    /*global console:true */
    function url(file){
        return base_url + file;
    }
    function load_file(file) {
        var addr = url(file);
        // no point to load it if there's a <script> that already asked for it.
        var scripts = $("script").filter(function(){
            return this.src.indexOf(addr) === 0;
        });
        if (scripts.length === 0) {
            var req = $.ajax({ url: addr, async: false });
            if (req.status == 200) {
                try {
                    evil(req.responseText);
                } catch(ex) {
                    console.error("Failed to evaluate file %s", file);
                    console.error(ex);
                    console.log(ex.stack);
                }
            } else {
                console.error("Failed to load dependency: " + addr);
            }
        }
    }
    return function(comp) {
        if (!cache[comp.id] || !comp.id) {
            if (comp.id) {
                cache[comp.id] = comp;
            }
            var deps = comp.depends ? comp.depends.slice(0) : [];
            if (comp.features) {
                comp.features.forEach(function(f){
                    if (f.depends) {
                        deps = deps.concat(f.depends);
                    }
                });
            }
            deps.forEach(function(id){
                if (!cache[id]) {
                    load_file("kendo." + id + ".js");
                }
            });
            if (comp.files) {
                comp.files.forEach(load_file);
            }
        }
    };
})({}, jQuery,
   // the following figures out the base URL of the running script.
   (function(x){
       return x[x.length - 1].src.replace(/\/+[^\/]*$/, "/");
   })(document.getElementsByTagName("script")), eval);
