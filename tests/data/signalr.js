(function() {

    function SignalR(options) {
        return new kendo.data.transports.signalr(options);
    }

    var transport;

    function promise() {
        return  {
            done: function(callback) {
                if (callback) {
                    callback();
                }
                return this;
            },
            fail: $.noop
        };
    }

    function hub() {
        return {
            on: $.noop,
            invoke: function() {
                return promise();
            }
        };
    }

    module("SignalR", {
        setup: function() {
            transport = SignalR({
                signalr: {
                    promise: promise(),
                    hub: hub()
                }
            });
        }
    });

    test("signalr transport inherits from remote transport", function() {
        ok(transport instanceof kendo.data.RemoteTransport);
    });

    test("signalr transport requires the promise option to be set", 1, function() {
        try {
            SignalR();
        } catch(e) {
            equal(e.toString(), 'Error: The "promise" option must be set.');
        }
    });

    test("the promise option must be a Promise", 1, function() {
        try {
            SignalR({
                signalr: {
                    promise: {}
                }
            });
        } catch(e) {
            equal(e.toString(), 'Error: The "promise" option must be a Promise.');
        }
    });

    test("signalr transport requires the hub option to be set", 1, function() {
        try {
            SignalR({
                signalr: {
                    promise: promise()
                }
            });
        } catch(e) {
            equal(e.toString(), 'Error: The "hub" option must be set.');
        }
    });

    test("the hub object must have on and invoke methods", 1, function() {
        try {
            SignalR({
                signalr: {
                    promise: promise(),
                    hub: {}
                }
            });
        } catch(e) {
            equal(e.toString(), 'Error: The "hub" option is not a valid SignalR hub proxy.');
        }
    });

    test("the push method listens for create notifications from the hub", function() {
        var proxy = stub({}, {
            on: $.noop,
            invoke: $.noop
        });

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: proxy,
                client: {
                    create: "create"
                }
            }
        });

        transport.push({});

        equal(proxy.calls("on"), 1);
        equal(proxy.args("on", 0)[0], "create");
    });

    test("the push method listens for update notifications from the hub", function() {
        var proxy = stub({}, {
            on: $.noop,
            invoke: $.noop
        });

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: proxy,
                client: {
                    update: "update"
                }
            }
        });

        transport.push({});

        equal(proxy.calls("on"), 1);
        equal(proxy.args("on", 0)[0], "update");
    });

    test("the push method listens for destroy notifications from the hub", function() {
        var proxy = stub({}, {
            on: $.noop,
            invoke: $.noop
        });

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: proxy,
                client: {
                    destroy: "destroy"
                }
            }
        });

        transport.push({});

        equal(proxy.calls("on"), 1);
        equal(proxy.args("on", 0)[0], "destroy");
    });

    test("transport calls pushCreate when the create method is triggered by the hub", function() {
        var result = {};

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: $.noop,
                    on: function(method, callback) {
                        callback(result);
                    }
                },
                client: {
                    create: "c"
                }
            }
        });

        var options = stub({}, "pushCreate");

        transport.push(options);

        equal(options.calls("pushCreate"), 1);
        equal(options.args("pushCreate", 0)[0], result);
    });

    test("transport calls pushUpdate when the update method is triggered by the hub", function() {
        var result = {};

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: $.noop,
                    on: function(method, callback) {
                        callback(result);
                    }
                },
                client: {
                    update: "c"
                }
            }
        });

        var options = stub({}, "pushUpdate");

        transport.push(options);

        equal(options.calls("pushUpdate"), 1);
        equal(options.args("pushUpdate", 0)[0], result);
    });

    test("transport calls pushDestroy when the destroy method is triggered by the hub", function() {
        var result = {};

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: $.noop,
                    on: function(method, callback) {
                        callback(result);
                    }
                },
                client: {
                    destroy: "c"
                }
            }
        });

        var options = stub({}, "pushDestroy");

        transport.push(options);

        equal(options.calls("pushDestroy"), 1);
        equal(options.args("pushDestroy", 0)[0], result);
    });

    test("can override the push method from the options", function() {
        var push = $.noop;

        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: hub(),
            },
            push: push
        });

        equal(transport.push, push);
    });

    test("the context of the custom push method is the transport itself", 1, function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: hub(),
            },
            push: function() {
                strictEqual(this, transport);
            }
        });

        transport.push();
    });

    test("the read method invokes the read server method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.calls("invoke"), 1);
                        equal(hub.args("invoke", 0)[0], "r");
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    read: "r"
                }
            }
        });

        transport.read({});
    });

    test("the read method throws error if server configuration is not specified", 1, function() {
        try {
            transport.read();
        } catch (e) {
            equal(e.toString(), 'Error: The "server.read" option must be set.');
        }
    });

    test("the read method passes the data field of the options to the server read method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        var options = { data: "data" };

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.args("invoke", 0)[1], options.data);
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    read: "r"
                }
            }
        });

        transport.read(options);
    });

    test("the read method invokes the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    read: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.read({});

        equal(transportOptions.calls("parameterMap"), 1);
    });

    test("the read method passes options.data to the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    read: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        var options = { data: "foo" };

        transport.read(options);

        equal(transportOptions.args("parameterMap", 0)[0], options.data);
    });

    test("the read method invokes parameterMap and passes 'read' as the type of operation", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    read: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.read({});

        equal(transportOptions.args("parameterMap", 0)[1], "read");
    });

    test("read calls options.success when invoke is done", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return promise();
                    },
                    on: $.noop
                },
                server: {
                    read: "r"
                }
            }
        });

        var options = stub({}, "success");

        transport.read(options);

        equal(options.calls("success"), 1);
    });

    test("read calls options.error when invoke fails", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return {
                            done: function() {
                                return this;
                            },
                            fail: function(callback) {
                                callback();
                            }
                        };
                    },
                    on: $.noop
                },
                server: {
                    read: "r"
                }
            }
        });

        var options = stub({}, "error");

        transport.read(options);

        equal(options.calls("error"), 1);
    });

    test("the create method invokes the create server method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.calls("invoke"), 1);
                        equal(hub.args("invoke", 0)[0], "r");
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    create: "r"
                }
            }
        });

        transport.create({});
    });

    test("the create method throws error if server configuration is not specified", 1, function() {
        try {
            transport.create();
        } catch (e) {
            equal(e.toString(), 'Error: The "server.create" option must be set.');
        }
    });

    test("the create method passes the data field of the options to the server create method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        var options = { data: "foo" };

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.args("invoke", 0)[1], options.data);
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    create: "r"
                }
            }
        });

        transport.create(options);
    });

    test("the create method invokes the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    create: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.create({});

        equal(transportOptions.calls("parameterMap"), 1);
    });

    test("the create method passes options.data to the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    create: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        var options = { data: "foo" };

        transport.create(options);

        equal(transportOptions.args("parameterMap", 0)[0], options.data);
    });

    test("the create method invokes parameterMap and passes 'create' as the type of operation", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    create: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.create({});

        equal(transportOptions.args("parameterMap", 0)[1], "create");
    });

    test("create calls options.success when invoke is done", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return promise();
                    },
                    on: $.noop
                },
                server: {
                    create: "r"
                }
            }
        });

        var options = stub({}, "success");

        transport.create(options);

        equal(options.calls("success"), 1);
    });

    test("create calls options.error when invoke fails", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return {
                            done: function() {
                                return this;
                            },
                            fail: function(callback) {
                                callback();
                            }
                        };
                    },
                    on: $.noop
                },
                server: {
                    create: "r"
                }
            }
        });

        var options = stub({}, "error");

        transport.create(options);

        equal(options.calls("error"), 1);
    });


    test("the update method invokes the update server method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.calls("invoke"), 1);
                        equal(hub.args("invoke", 0)[0], "r");
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    update: "r"
                }
            }
        });

        transport.update({});
    });

    test("the update method throws error if server configuration is not specified", 1, function() {
        try {
            transport.update();
        } catch (e) {
            equal(e.toString(), 'Error: The "server.update" option must be set.');
        }
    });

    test("the update method passes the data field of the options to the server update method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        var options = { data: "foo" };

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.args("invoke", 0)[1], options.data);
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    update: "r"
                }
            }
        });

        transport.update(options);
    });

    test("the update method invokes the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    update: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.update({});

        equal(transportOptions.calls("parameterMap"), 1);
    });

    test("the update method passes options.data to the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    update: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        var options = { data: "foo" };

        transport.update(options);

        equal(transportOptions.args("parameterMap", 0)[0], options.data);
    });

    test("the update method invokes parameterMap and passes 'update' as the type of operation", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    update: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.update({});

        equal(transportOptions.args("parameterMap", 0)[1], "update");
    });

    test("update calls options.success when invoke is done", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return promise();
                    },
                    on: $.noop
                },
                server: {
                    update: "r"
                }
            }
        });

        var options = stub({}, "success");

        transport.update(options);

        equal(options.calls("success"), 1);
    });

    test("update calls options.error when invoke fails", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return {
                            done: function() {
                                return this;
                            },
                            fail: function(callback) {
                                callback();
                            }
                        };
                    },
                    on: $.noop
                },
                server: {
                    update: "r"
                }
            }
        });

        var options = stub({}, "error");

        transport.update(options);

        equal(options.calls("error"), 1);
    });

    test("the destroy method invokes the destroy server method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.calls("invoke"), 1);
                        equal(hub.args("invoke", 0)[0], "r");
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    destroy: "r"
                }
            }
        });

        transport.destroy({});
    });

    test("the destroy method throws error if server configuration is not specified", 1, function() {
        try {
            transport.destroy();
        } catch (e) {
            equal(e.toString(), 'Error: The "server.destroy" option must be set.');
        }
    });

    test("the destroy method passes the data field of the options to the server destroy method", function() {
        var hub = stub( {
            on: $.noop
        }, {
            invoke: function() {
                return promise();
            }
        });

        var options = { data: "foo" };

        transport = SignalR({
            signalr: {
                promise: {
                    done: function(callback) {
                        callback();

                        equal(hub.args("invoke", 0)[1], options.data);
                    },
                    fail: $.noop
                },
                hub: hub,
                server: {
                    destroy: "r"
                }
            }
        });

        transport.destroy(options);
    });

    test("the destroy method invokes the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    destroy: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.destroy({});

        equal(transportOptions.calls("parameterMap"), 1);
    });

    test("the destroy method passes options.data to the parameterMap", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    destroy: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        var options = { data: {} };

        transport.destroy(options);

        equal(transportOptions.args("parameterMap", 0)[0], options.data);
    });

    test("the destroy method invokes parameterMap and passes 'destroy' as the type of operation", function() {
        var transportOptions = {
            signalr: {
                promise: promise(),
                hub: hub(),
                server: {
                    destroy: "r"
                }
            }
        };

        stub(transportOptions, "parameterMap");

        transport = SignalR(transportOptions);

        transport.destroy({});

        equal(transportOptions.args("parameterMap", 0)[1], "destroy");
    });

    test("destroy calls options.success when invoke is done", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return promise();
                    },
                    on: $.noop
                },
                server: {
                    destroy: "r"
                }
            }
        });

        var options = stub({}, "success");

        transport.destroy(options);

        equal(options.calls("success"), 1);
    });

    test("destroy calls options.error when invoke fails", function() {
        transport = SignalR({
            signalr: {
                promise: promise(),
                hub: {
                    invoke: function() {
                        return {
                            done: function() {
                                return this;
                            },
                            fail: function(callback) {
                                callback();
                            }
                        };
                    },
                    on: $.noop
                },
                server: {
                    destroy: "r"
                }
            }
        });

        var options = stub({}, "error");

        transport.destroy(options);

        equal(options.calls("error"), 1);
    });

}());
