import { vi } from "vitest";

export function initMock(callback, context) {
    const mockFn = vi.fn();
    mockFn.called = false;
    mockFn.callCount = 0;
    mockFn.callbacks = [];

    mockFn.addMethod = (cb) => {
        mockFn.callbacks.push(cb);
    };

    mockFn.mockImplementation((...args) => {
        let result;
        mockFn.called = true;
        mockFn.callCount++;

        mockFn.callbacks.forEach(cb => cb(...args));

        if (callback) {
            result = callback.apply(context || this, args);
        }

        return result !== undefined ? result : mockFn;
    });

    return mockFn;
}

export function mockFunc(obj, methodName, mockMethod, context) {
    let method = obj[methodName];
    let mock = initMock(mockMethod, context || obj);
    mock.originalMethod = method;
    obj[methodName] = mock;
}

export function removeMock(obj, methodName) {
    let mock = obj[methodName];
    let method = mock.originalMethod;

    obj[methodName] = method;
}

export function isMockFunc(mock) {
    return typeof (mock.originalMethod) === "function";
}

export function trackMethodCall(obj, methodName) {
    mockFunc(obj, methodName, obj[methodName]);
}

export function removeMocksIn(obj) {
    for (let propName in obj) {
        if (obj[propName] && isMockFunc(obj[propName])) {
            removeMock(obj, propName);
        }
    }
}

export function withMock(context, method, mock, callback) {
    let originalMethod = context[method];

    try {
        context[method] = mock;

        callback();
    } finally {
        context[method] = originalMethod;
    }
}