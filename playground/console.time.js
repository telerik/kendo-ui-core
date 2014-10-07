if (!console.time) (function(){
    var timers = {};
    console.time = function(name) {
        timers[name] = new Date().getTime();
    };
    console.timeEnd = function(name) {
        var start = timers[name], end = new Date().getTime();
        console.log(name + ": " + (end-start) + "ms");
    };
})();
