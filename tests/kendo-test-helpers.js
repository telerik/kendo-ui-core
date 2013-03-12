function stub(that, methods) {
    var stubs = {};

    if (typeof methods === "string") {
        var obj = {};
        obj[methods] = $.noop;
        methods = obj;
    }

    $.each(methods, function(method, impl) {
        stubs[method] = { calls: 0, args: [] };

        that[method] = function() {
            stubs[method].calls ++;
            stubs[method].args.push(arguments);
            return impl.apply(that, arguments);
        }
    });

    that.calls = function(method) {
        return stubs[method].calls;
    }

    that.args = function(method, index) {
        method = stubs[method];

        index = index !== undefined ? index: method.args.length - 1;
        return method.args[index];
    }

    return that;
}
