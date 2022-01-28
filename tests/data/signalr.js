(function() {
    var stub = window.stub;

    function SignalR(options) {
        return new kendo.data.transports.signalr(options);
    }

    var transport;

    function promise() {
        return {
            done: function(callback) {
                if (callback) {
                    callback();
                }
                return this;
            },
            fail: $.noop
        };
    }

    function nativePromise() {
        return {
            then: function(callback) {
                if (callback) {
                    callback();
                }
                return this;
            },
            "catch": $.noop
        };
    }

    function hub(customPromise) {
        return {
            on: $.noop,
            invoke: function() {
                return customPromise || promise();
            }
        };
    }

    describe("SignalR", function() {
        beforeEach(function() {
            transport = SignalR({
                signalr: {
                    promise: promise(),
                    hub: hub()
                }
            });
        });

        it("signalr transport inherits from remote transport", function() {
            assert.isOk(transport instanceof kendo.data.RemoteTransport);
        });

        it("signalr transport requires the promise option to be set", function() {
            try {
                SignalR();
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "promise" option must be set.');
            }
        });

        it("the promise option must be a Promise", function() {
            try {
                SignalR({
                    signalr: {
                        promise: {}
                    }
                });
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "promise" option must be a Promise.');
            }
        });

        it("signalr transport requires the hub option to be set", function() {
            try {
                SignalR({
                    signalr: {
                        promise: promise()
                    }
                });
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "hub" option must be set.');
            }
        });

        it("the hub object must have on and invoke methods", function() {
            try {
                SignalR({
                    signalr: {
                        promise: promise(),
                        hub: {}
                    }
                });
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "hub" option is not a valid SignalR hub proxy.');
            }
        });

        it("the push method listens for create notifications from the hub", function() {
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

            assert.equal(proxy.calls("on"), 1);
            assert.equal(proxy.args("on", 0)[0], "create");
        });

        it("the push method listens for update notifications from the hub", function() {
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

            assert.equal(proxy.calls("on"), 1);
            assert.equal(proxy.args("on", 0)[0], "update");
        });

        it("the push method listens for destroy notifications from the hub", function() {
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

            assert.equal(proxy.calls("on"), 1);
            assert.equal(proxy.args("on", 0)[0], "destroy");
        });

        it("transport calls pushCreate when the create method is triggered by the hub", function() {
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

            assert.equal(options.calls("pushCreate"), 1);
            assert.equal(options.args("pushCreate", 0)[0], result);
        });

        it("transport calls pushUpdate when the update method is triggered by the hub", function() {
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

            assert.equal(options.calls("pushUpdate"), 1);
            assert.equal(options.args("pushUpdate", 0)[0], result);
        });

        it("transport calls pushDestroy when the destroy method is triggered by the hub", function() {
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

            assert.equal(options.calls("pushDestroy"), 1);
            assert.equal(options.args("pushDestroy", 0)[0], result);
        });

        it("can override the push method from the options", function() {
            var push = $.noop;

            transport = SignalR({
                signalr: {
                    promise: promise(),
                    hub: hub()
                },
                push: push
            });

            assert.equal(transport.push, push);
        });

        it("the context of the custom push method is the transport itself", function() {
            transport = SignalR({
                signalr: {
                    promise: promise(),
                    hub: hub()
                },
                push: function() {
                    assert.strictEqual(this, transport);
                }
            });

            transport.push();
        });

        it("the read method invokes the read server method", function() {
            var hub = stub({
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

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
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

        it("the read method throws error if server configuration is not specified", function() {
            try {
                transport.read();
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "server.read" option must be set.');
            }
        });

        it("the read method passes the data field of the options to the server read method", function() {
            var hub = stub({
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

                            assert.equal(hub.args("invoke", 0)[1], options.data);
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

        it("the read method invokes the parameterMap", function() {
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

            assert.equal(transportOptions.calls("parameterMap"), 1);
        });

        it("the read method passes options.data to the parameterMap", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[0], options.data);
        });

        it("the read method invokes parameterMap and passes 'read' as the type of operation", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[1], "read");
        });

        it("read calls options.success when invoke is done", function() {
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

            assert.equal(options.calls("success"), 1);
        });

        it("read calls options.error when invoke fails", function() {
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

            assert.equal(options.calls("error"), 1);
        });

        it("the create method invokes the create server method", function() {
            var hub = stub({
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

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
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

        it("the create method throws error if server configuration is not specified", function() {
            try {
                transport.create();
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "server.create" option must be set.');
            }
        });

        it("the create method passes the data field of the options to the server create method", function() {
            var hub = stub({
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

                            assert.equal(hub.args("invoke", 0)[1], options.data);
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

        it("the create method invokes the parameterMap", function() {
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

            assert.equal(transportOptions.calls("parameterMap"), 1);
        });

        it("the create method passes options.data to the parameterMap", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[0], options.data);
        });

        it("the create method invokes parameterMap and passes 'create' as the type of operation", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[1], "create");
        });

        it("create calls options.success when invoke is done", function() {
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

            assert.equal(options.calls("success"), 1);
        });

        it("create calls options.error when invoke fails", function() {
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

            assert.equal(options.calls("error"), 1);
        });


        it("the update method invokes the update server method", function() {
            var hub = stub({
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

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
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

        it("the update method throws error if server configuration is not specified", function() {
            try {
                transport.update();
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "server.update" option must be set.');
            }
        });

        it("the update method passes the data field of the options to the server update method", function() {
            var hub = stub({
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

                            assert.equal(hub.args("invoke", 0)[1], options.data);
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

        it("the update method invokes the parameterMap", function() {
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

            assert.equal(transportOptions.calls("parameterMap"), 1);
        });

        it("the update method passes options.data to the parameterMap", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[0], options.data);
        });

        it("the update method invokes parameterMap and passes 'update' as the type of operation", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[1], "update");
        });

        it("update calls options.success when invoke is done", function() {
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

            assert.equal(options.calls("success"), 1);
        });

        it("update calls options.error when invoke fails", function() {
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

            assert.equal(options.calls("error"), 1);
        });

        it("the destroy method invokes the destroy server method", function() {
            var hub = stub({
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

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
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

        it("the destroy method throws error if server configuration is not specified", function() {
            try {
                transport.destroy();
            } catch (e) {
                assert.equal(e.toString(), 'Error: The "server.destroy" option must be set.');
            }
        });

        it("the destroy method passes the data field of the options to the server destroy method", function() {
            var hub = stub({
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

                            assert.equal(hub.args("invoke", 0)[1], options.data);
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

        it("the destroy method invokes the parameterMap", function() {
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

            assert.equal(transportOptions.calls("parameterMap"), 1);
        });

        it("the destroy method passes options.data to the parameterMap", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[0], options.data);
        });

        it("the destroy method invokes parameterMap and passes 'destroy' as the type of operation", function() {
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

            assert.equal(transportOptions.args("parameterMap", 0)[1], "destroy");
        });

        it("destroy calls options.success when invoke is done", function() {
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

            assert.equal(options.calls("success"), 1);
        });

        it("destroy calls options.error when invoke fails", function() {
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

            assert.equal(options.calls("error"), 1);
        });
    });

    describe("SignalR for ASP.NET Core", function() {
        beforeEach(function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: hub(nativePromise())
                }
            });
        });

        it("the read method invokes the read server method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        read: "r"
                    }
                }
            });

            transport.read({});
        });

        it("the read method passes the data field of the options to the server read method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            var options = { data: "data" };

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.args("invoke", 0)[1], options.data);
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        read: "r"
                    }
                }
            });

            transport.read(options);
        });

        it("read calls options.success when invoke is done", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return nativePromise();
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

            assert.equal(options.calls("success"), 1);
        });

        it("read calls options.error when invoke fails", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return {
                                then: function() {
                                    return this;
                                },
                                "catch": function(callback) {
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

            assert.equal(options.calls("error"), 1);
        });

        it("the create method invokes the create server method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        create: "r"
                    }
                }
            });

            transport.create({});
        });

        it("the create method passes the data field of the options to the server create method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            var options = { data: "foo" };

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.args("invoke", 0)[1], options.data);
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        create: "r"
                    }
                }
            });

            transport.create(options);
        });

        it("create calls options.success when invoke is done", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return nativePromise();
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

            assert.equal(options.calls("success"), 1);
        });

        it("create calls options.error when invoke fails", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return {
                                then: function() {
                                    return this;
                                },
                                "catch": function(callback) {
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

            assert.equal(options.calls("error"), 1);
        });

        it("the update method invokes the update server method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        update: "r"
                    }
                }
            });

            transport.update({});
        });

        it("the update method passes the data field of the options to the server update method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            var options = { data: "foo" };

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.args("invoke", 0)[1], options.data);
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        update: "r"
                    }
                }
            });

            transport.update(options);
        });

        it("update calls options.success when invoke is done", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return nativePromise();
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

            assert.equal(options.calls("success"), 1);
        });

        it("update calls options.error when invoke fails", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return {
                                then: function() {
                                    return this;
                                },
                                "catch": function(callback) {
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

            assert.equal(options.calls("error"), 1);
        });

        it("the destroy method invokes the destroy server method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.calls("invoke"), 1);
                            assert.equal(hub.args("invoke", 0)[0], "r");
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        destroy: "r"
                    }
                }
            });

            transport.destroy({});
        });

        it("the destroy method passes the data field of the options to the server destroy method", function() {
            var hub = stub({
                on: $.noop
            }, {
                    invoke: function() {
                        return nativePromise();
                    }
                });

            var options = { data: "foo" };

            transport = SignalR({
                signalr: {
                    promise: {
                        then: function(callback) {
                            callback();

                            assert.equal(hub.args("invoke", 0)[1], options.data);
                        },
                        "catch": $.noop
                    },
                    hub: hub,
                    server: {
                        destroy: "r"
                    }
                }
            });

            transport.destroy(options);
        });

        it("destroy calls options.success when invoke is done", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return nativePromise();
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

            assert.equal(options.calls("success"), 1);
        });

        it("destroy calls options.error when invoke fails", function() {
            transport = SignalR({
                signalr: {
                    promise: nativePromise(),
                    hub: {
                        invoke: function() {
                            return {
                                then: function() {
                                    return this;
                                },
                                "catch": function(callback) {
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

            assert.equal(options.calls("error"), 1);
        });

    });
}());
