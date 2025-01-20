export async function callbackPromise(callback) {
    return new Promise(resolve => {
        callback(resolve);
    });
}

export function asyncTest(description, fn) {
    it(description, async() => {
        (await callbackPromise((resolve) => fn(resolve)))();
    });
}

asyncTest.only = function(description, fn) {
    it.only(description, async() => {
       (await callbackPromise((resolve) => fn(resolve)))();
    });
};

asyncTest.skip = function(description, fn) {
    it.skip(description, async() => {
       (await callbackPromise((resolve) => fn(resolve)))();
    });
};