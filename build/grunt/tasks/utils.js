var FS = require("fs");

exports.outdated = outdated;
exports.getSrc = getSrc;

function outdated(source, dest) {
    if (Array.isArray(source)) {
        for (var i = 0; i < source.length; ++i) {
            if (outdated(source[i], dest))
                return true;
        }
        return false;
    }
    try {
        var sstat = FS.statSync(source);
        var dstat = FS.statSync(dest);
        return sstat.mtime.getTime() > dstat.mtime.getTime();
    } catch(ex) {
        return true;
    }
}

function getSrc(task) {
    return task.files.reduce(function(a, f){
        f.src.forEach(function(f){
            a.push(f);
        });
        return a;
    }, []);
}
