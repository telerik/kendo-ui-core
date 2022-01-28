/* exported initMock */
function initMock(callback, context) {
    var mock = function() {
        mock.called = true;
        mock.callCount++;
        if (typeof(callback) === "function") {
            var result = callback.apply(context || this, arguments);
            if(mock.callbacks) {
                for (var i = 0; i < mock.callbacks.length; i++) {
                    mock.callbacks[i].apply(context || this, arguments);
                }
            }

            return result;
        }
    };

    mock.called = false;
    mock.callCount = 0;

    mock.callbacks = [];
    mock.addMethod = function(callback) {
        mock.callbacks.push(callback);
    };

    return mock;
}

/* exported mockFunc */
function mockFunc(obj, methodName, mockMethod, context) {
    var method = obj[methodName];
    var mock = initMock(mockMethod, context || obj);
    mock.originalMethod = method;
    obj[methodName] = mock;
}

/* exported removeMock */
function removeMock(obj, methodName) {
    var mock = obj[methodName];
    var method = mock.originalMethod;

    obj[methodName] = method;
}

/* exported isMockFunc */
function isMockFunc(mock) {
    return typeof(mock.originalMethod) === "function";
}

/* exported trackMethodCall */
function trackMethodCall(obj, methodName) {
    mockFunc(obj, methodName, obj[methodName]);
}

/* exported removeMocksIn */
function removeMocksIn(obj) {
    for (var propName in obj) {
        if (obj[propName] && isMockFunc(obj[propName])) {
            removeMock(obj, propName);
        }
    }
}