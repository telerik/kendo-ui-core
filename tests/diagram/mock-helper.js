Function.prototype.mock = function (mock) {
    var mockedMethod = function () {
        mockedMethod.called = true;
        mockedMethod.callCount++;
        if (typeof(mockedMethod.__mock) == "function") {
            return mockedMethod.__mock.apply(this, arguments);
        }
    };
    mockedMethod.__mock = mock;
    mockedMethod.called = false;
    mockedMethod.callCount = 0;
    mockedMethod.originalMethod = this;
    return mockedMethod;
};
Function.prototype.removeMock = function () {
    return this.originalMethod || this;
};
Function.prototype.isMock = function () {
    return typeof(this.originalMethod) === "function";
};
Function.prototype.trackCall = function () {
    return this.mock(this);
};
Function.prototype.setupMock = function(exec) {
    if(typeof(exec) === "function") {
        this.__mock = exec;
    }
};

Function.prototype.addMethod = function(handler) {
    var method = this;
    method.originalMethod = this;
    if(!this.extraMethods) {
        this.extraMethods = [];
    }

    this.extraMethods.push(handler);

    return function() {
        method.apply(this, arguments);
        for(var i = 0; i < method.extraMethods.length; i++) {
            method.extraMethods[i].apply(this, arguments);
        }
    };
};

Function.prototype.removeMethod = function(handler) {
    if(this.extraMethods) {
        Array.remove(this.extraMethods, handler);
    }
};

function removeMocksIn(control) {
    for(var propName in control)
    {
        var prop = control[propName];
        if(typeof(prop) === "function" && prop.isMock()) {
            control[propName] = control[propName].removeMock();
        }
    }
}