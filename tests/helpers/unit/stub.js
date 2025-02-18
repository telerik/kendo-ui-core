import { vi } from "vitest";

function callbackHash(object) {
    if (typeof object === "string") {
        let obj = {};
        obj[object] = vi.fn();
        object = obj;
    }

    return object;
}

export function stub(that, methods) {
    methods = callbackHash(methods);
    Object.keys(methods).forEach(method => {
        if (!that[method]) {
            that[method] = vi.fn();
        }

        const spy = vi.spyOn(that, method);
        spy.mockImplementation(methods[method]);
    });

    that.calls = method => that[method].mock.calls.length;
    that.args = (method, index) => {
        method = that[method];
        index = index !== undefined ? index : method.mock.calls.length - 1;
        return method.mock.calls[index];
    };

    return that;
}

export function spy(that, methods) {
    if (!arguments.length) {
        const callback = vi.fn();
        callback.calls = 0;
        callback.args = [];
        callback.lastArgs = [];

        callback.mockImplementation(() => {
            const calls = callback.mock.calls;
            callback.args = calls;
            callback.calls = calls.length;
            callback.lastArgs = calls[calls.length - 1];
        });

        return callback;
    }

    methods = callbackHash(methods);

    Object.keys(methods).forEach(method => {
        methods[method] = that[method];
    });

    return stub(that, methods);
}