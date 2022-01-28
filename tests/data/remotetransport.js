(function() {
    var RemoteTransport = kendo.data.RemoteTransport;

    describe("RemoteTransport", function() {
        beforeEach(function() {
            $.mockjaxSettings.contentType = "text/json";
            $.mockjaxSettings.responseTime = 0;
        });
        afterEach(function() {
            $.mockjax.clear();
        });

        // skip("read calls $.ajax", function() {
        //     var transport = new RemoteTransport({
        //         read: {
        //             url: "foo"
        //         }
        //     });

        //     $.mockjax({
        //         url: "foo",
        //         response: function() {
        //             assert.isOk(true);
        //             done();
        //         }
        //     });

        //     transport.read();
        // });

        it("read passes its options to $.ajax", function(done) {
            var transport = new RemoteTransport({
                read: {
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.read({ url: "foo" });
        });

        it("read passes options.data to its parameterMap", function(done) {
            var parameterMapWasCalled = false,
                transport = new RemoteTransport({
                    read: {
                        url: "foo"
                    },
                    parameterMap: function() {
                        parameterMapWasCalled = true;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(parameterMapWasCalled);
                    done();
                }
            });

            transport.read({ url: "foo" });
        });

        it("read passes constructor options.read.data to its parameterMap", function(done) {
            var data,
                transport = new RemoteTransport({
                    read: {
                        url: "foo",
                        data: {
                            foo: "bar"
                        }
                    },
                    parameterMap: function() {
                        data = arguments[0];
                        return data;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                    done();
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });
        });

        it("read passes constructor data function result to its parameterMap", function(done) {
            var data,
                transport = new RemoteTransport({
                    read: {
                        url: "foo",
                        data: function() {
                            return {
                                foo: "bar"
                            }
                        }
                    },
                    parameterMap: function() {
                        data = arguments[0];
                        return data;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                    done();
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });
        });

        it("read constructor data function is persisted on multiple requests", function(done) {
            var data,
                called = 0,
                transport = new RemoteTransport({
                    read: {
                        url: "foo",
                        data: function() {
                            called++;
                            return {
                                foo: "bar"
                            }
                        }
                    },
                    parameterMap: function() {
                        data = arguments[0];
                        return data;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    if (called == 2) {
                        assert.isOk(true);
                        done();
                    }
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });
            $.mockjax.clear();
            $.mockjax({
                url: "foo",
                response: function() {
                    if (called == 2) {
                        assert.isOk(true);
                        done();
                    }
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });
        });

        it("read constructor data has access to the data to be passed to parameterMap", function(done) {
            var data,
                called = 0,
                transport = new RemoteTransport({
                    read: {
                        url: "foo",
                        data: function(data) {
                            assert.isOk(data);
                            assert.equal(data.baz, "moo");
                        }
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    done();
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });

            $.mockjax.clear();
        });

        it("read original data is not contaminated when additional data is submitted", function(done) {
            var data,
                called = 0,
                transport = new RemoteTransport({
                    read: {
                        url: "foo",
                        data: {
                            foo: "bar"
                        }
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    done();
                }
            });

            transport.read({ url: "foo", data: { baz: "moo" } });

            assert.isOk(!("baz" in transport.options.read.data));
        });

        it("update passes data options to parameterMap", function(done) {
            var data, transport = new RemoteTransport({
                update: {
                    url: "foo"
                },
                parameterMap: function() {
                    data = arguments[0];
                    return data;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(data.foo, "bar");
                    done();
                }
            });

            transport.update({ data: { foo: "bar" } });
        });

        it("the type argument of the parameterMap is update during updating", function(done) {
            var parameterMapType, transport = new RemoteTransport({
                update: {
                    url: "foo"
                },
                parameterMap: function(data, type) {
                    parameterMapType = type;
                    return data;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(parameterMapType, "update");
                    done();
                }
            });

            transport.update();
        });

        it("the type argument of the parameterMap is destroy during destroying", function(done) {
            var parameterMapType, transport = new RemoteTransport({
                destroy: {
                    url: "foo"
                },
                parameterMap: function(data, type) {
                    parameterMapType = type;
                    return data;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(parameterMapType, "destroy");
                    done();
                }
            });

            transport.destroy();
        });

        it("the type argument of the parameterMap is create during creating", function(done) {
            var parameterMapType, transport = new RemoteTransport({
                create: {
                    url: "foo"
                },
                parameterMap: function(data, type) {
                    parameterMapType = type;
                    return data;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(parameterMapType, "create");
                    done();
                }
            });

            transport.create();
        });

        it("the type argument of the parameterMap is read during reading", function(done) {
            var parameterMapType, transport = new RemoteTransport({
                read: {
                    url: "foo"
                },
                parameterMap: function(data, type) {
                    parameterMapType = type;
                    return data;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(parameterMapType, "read");
                    done();
                }
            });

            transport.read();
        });

        it("parameterMap as plain object", function() {
            var transport = new RemoteTransport({
                parameterMap: { take: "$take", skip: "$skip" }
            });

            var result = transport.parameterMap({ take: 1, skip: 1 });
            assert.equal(result["$take"], 1);
            assert.equal(result["$skip"], 1);
        });

        it("parameterMap as plain object copies unsuported fields", function() {
            var transport = new RemoteTransport({
                parameterMap: { take: "$take", skip: "$skip" }
            });

            var result = transport.parameterMap({ take: 1, skip: 1, foo: "bar" });
            assert.equal(result["foo"], "bar");
        });

        it("parameterMap as plain object calls functions", function() {
            var transport = new RemoteTransport({
                parameterMap: {
                    take: {
                        key: "$take",
                        value: function(take) {
                            return take + "bar";
                        }
                    }
                }
            });

            var result = transport.parameterMap({ take: "foo" });

            assert.equal(result["$take"], "foobar");
        });

        it("string options are treated as url", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.read();
        });

        it("read calls the success handler when the ajax response is returned", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            $.mockjax({
                url: "foo",
                responseText: "[]"
            });

            transport.read({
                success: function() {
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("read calls the error handler when the ajax request fails", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            $.mockjax({
                url: "foo",
                status: 500
            });

            transport.read({
                success: function() {
                    assert.isOk(false); // we should not be here
                },
                error: function() {
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("read check if result exists in cache passing the data argumets as key", function(done) {
            var key = false,
                transport = new RemoteTransport({
                    read: "foo",
                    cache: {
                        find: function() {
                            key = arguments[0];
                            return undefined;
                        },
                        add: $.noop
                    }
                });

            $.mockjax({
                url: "foo",
                responseText: []
            });

            transport.read({
                data: { foo: "bar" },
                success: function() {
                    assert.equal(key.foo, "bar");
                    done();
                }
            });
        });

        it("read does not send request if data exists in cache", function(done) {
            var data = [1, 2, 3, 4],
                transport = new RemoteTransport({
                    read: "foo",
                    cache: {
                        find: function() {
                            return data;
                        }
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(false); // we should not be here
                }
            });

            transport.read({
                success: function() {
                    assert.equal(arguments[0], data);
                    done();
                }
            });

        });

        it("read adds item to the cache", function(done) {
            var transport = new RemoteTransport({
                read: "foo",
                cache: {
                    find: function() {
                        return undefined;
                    },
                    add: function(key, item) {
                        assert.equal(key.foo, "bar");
                        assert.equal(item[0].age, 1);
                        done();
                    }
                }
            });

            $.mockjax({
                url: "foo",
                responseText: '[{"age": 1}]'
            });

            transport.read({
                data: { foo: "bar" },
                success: $.noop
            });

        });

        it("setting cache to true applies in memory cache", function() {
            var transport = new RemoteTransport({
                read: "foo",
                cache: true
            });

            assert.isOk(transport.cache instanceof kendo.data.Cache);
        });

        it("setting cache to false disables caching", function() {
            var transport = new RemoteTransport({
                cache: false
            });

            assert.isOk(!(transport.cache instanceof kendo.data.Cache));
        });

        it("setting cache to inmemory returns Cache", function() {
            var cache = kendo.data.Cache.create("inmemory");
            assert.isOk(cache instanceof kendo.data.Cache);
        });

        it("update as string options are treated as url", function() {
            var transport = new RemoteTransport({
                update: "foo"
            });

            assert.equal(transport.options.update.url, "foo");
        });

        it("destroy as string option is treated as url", function() {
            var transport = new RemoteTransport({
                destroy: "foo"
            });

            assert.equal(transport.options.destroy.url, "foo");
        });

        it("create as string option is treated as url", function() {
            var transport = new RemoteTransport({
                create: "foo"
            });

            assert.equal(transport.options.create.url, "foo");
        });

        it("update calls $.ajax", function(done) {
            var transport = new RemoteTransport({
                update: {
                    url: "foo"
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.update();
        });

        it("destroy calls $.ajax", function(done) {
            var transport = new RemoteTransport({
                destroy: {
                    url: "foo"
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.destroy();
        });

        it("create calls $.ajax", function(done) {
            var transport = new RemoteTransport({
                create: {
                    url: "foo"
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.create();
        });

        it("update passes its options to $.ajax", function(done) {
            var transport = new RemoteTransport({
                update: {}
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.update({ url: "foo" });
        });

        it("destroy passes its options to $.ajax", function(done) {
            var transport = new RemoteTransport({
                destroy: {}
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(true);
                    done();
                }
            });

            transport.destroy({ url: "foo" });
        });

        it("update calls the success handler when the ajax response is returned", function(done) {
            var transport = new RemoteTransport({
                update: "foo"
            });

            $.mockjax({
                url: "foo",
                responseText: "[]"
            });

            transport.update({
                success: function() {
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("update calls the error handler when the ajax request fails", function(done) {
            var transport = new RemoteTransport({
                update: "foo"
            });

            $.mockjax({
                url: "foo",
                status: 500
            });

            transport.update({
                success: function() {
                    assert.isOk(false); // we should not be here
                },
                error: function() {
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("update calls its parameterMap", function(done) {
            var parameterMapWasCalled = false;
            var transport = new RemoteTransport({
                update: {
                    url: "foo"
                },
                parameterMap: function() {
                    parameterMapWasCalled = true;
                }
            });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.isOk(parameterMapWasCalled);
                    done();
                }
            });

            transport.update({ url: "foo" });
        });

        it("update passes constructor options.update.data to its parameterMap", function(done) {
            var data,
                transport = new RemoteTransport({
                    update: {
                        url: "foo",
                        data: {
                            foo: "bar"
                        }
                    },
                    parameterMap: function() {
                        data = arguments[0];
                        return data;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                    done();
                }
            });

            transport.update({ url: "foo", data: { baz: "moo" } });
        });

        it("update passes constructor data function result to its parameterMap", function(done) {
            var data,
                transport = new RemoteTransport({
                    update: {
                        url: "foo",
                        data: function() {
                            return {
                                foo: "bar"
                            }
                        }
                    },
                    parameterMap: function() {
                        data = arguments[0];
                        return data;
                    }
                });

            $.mockjax({
                url: "foo",
                response: function() {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                    done();
                }
            });

            transport.update({ url: "foo", data: { baz: "moo" } });
        });

    });
}());
