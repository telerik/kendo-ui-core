import '@progress/kendo-ui/src/kendo.data.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let RemoteTransport = kendo.data.RemoteTransport;

describe("RemoteTransport", function() {
    beforeEach(function() {
        $.mockjaxSettings.contentType = "text/json";
        $.mockjaxSettings.responseTime = 0;
    });
    afterEach(function() {
        $.mockjax.clear();
    });

    // skip("read calls $.ajax", function() {
    //     let transport = new RemoteTransport({
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

    asyncTest("read passes its options to $.ajax", function(done) {
        let transport = new RemoteTransport({
            read: {
            }
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.read({ url: "foo" });
    });

    asyncTest("read passes options.data to its parameterMap", function(done) {
        let parameterMapWasCalled = false,
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
                done(() => assert.isOk(parameterMapWasCalled));
            }
        });

        transport.read({ url: "foo" });
    });

    asyncTest("read passes constructor options.read.data to its parameterMap", function(done) {
        let data,
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
                done(() => {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                });
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });
    });

    asyncTest("read passes constructor data function result to its parameterMap", function(done) {
        let data,
            transport = new RemoteTransport({
                read: {
                    url: "foo",
                    data: function() {
                        return {
                            foo: "bar"
                        };
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
                done(() => {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                });
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });
    });

    asyncTest("read constructor data function is persisted on multiple requests", function(done) {
        let data,
            called = 0,
            transport = new RemoteTransport({
                read: {
                    url: "foo",
                    data: function() {
                        called++;
                        return {
                            foo: "bar"
                        };
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
                    done(() => assert.isOk(true));
                }
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });
        $.mockjax.clear();
        $.mockjax({
            url: "foo",
            response: function() {
                if (called == 2) {
                    done(() => assert.isOk(true));
                }
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });
    });

    asyncTest("read constructor data has access to the data to be passed to parameterMap", function(done) {
        let data,
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
                done(() => {});
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });

        $.mockjax.clear();
    });

    asyncTest("read original data is not contaminated when additional data is submitted", function(done) {
        let data,
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
                done(() => {});
            }
        });

        transport.read({ url: "foo", data: { baz: "moo" } });

        assert.isOk(!("baz" in transport.options.read.data));
    });

    asyncTest("update passes data options to parameterMap", function(done) {
        let data, transport = new RemoteTransport({
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
                done(() => assert.equal(data.foo, "bar"));
            }
        });

        transport.update({ data: { foo: "bar" } });
    });

    asyncTest("the type argument of the parameterMap is update during updating", function(done) {
        let parameterMapType, transport = new RemoteTransport({
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
                done(() => assert.equal(parameterMapType, "update"));
            }
        });

        transport.update();
    });

    asyncTest("the type argument of the parameterMap is destroy during destroying", function(done) {
        let parameterMapType, transport = new RemoteTransport({
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
                done(() => assert.equal(parameterMapType, "destroy"));
            }
        });

        transport.destroy();
    });

    asyncTest("the type argument of the parameterMap is create during creating", function(done) {
        let parameterMapType, transport = new RemoteTransport({
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
                done(() => assert.equal(parameterMapType, "create"));
            }
        });

        transport.create();
    });

    asyncTest("the type argument of the parameterMap is read during reading", function(done) {
        let parameterMapType, transport = new RemoteTransport({
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
                done(() => assert.equal(parameterMapType, "read"));
            }
        });

        transport.read();
    });

    it("parameterMap as plain object", function() {
        let transport = new RemoteTransport({
            parameterMap: { take: "$take", skip: "$skip" }
        });

        let result = transport.parameterMap({ take: 1, skip: 1 });
        assert.equal(result["$take"], 1);
        assert.equal(result["$skip"], 1);
    });

    it("parameterMap as plain object copies unsuported fields", function() {
        let transport = new RemoteTransport({
            parameterMap: { take: "$take", skip: "$skip" }
        });

        let result = transport.parameterMap({ take: 1, skip: 1, foo: "bar" });
        assert.equal(result["foo"], "bar");
    });

    it("parameterMap as plain object calls functions", function() {
        let transport = new RemoteTransport({
            parameterMap: {
                take: {
                    key: "$take",
                    value: function(take) {
                        return take + "bar";
                    }
                }
            }
        });

        let result = transport.parameterMap({ take: "foo" });

        assert.equal(result["$take"], "foobar");
    });

    asyncTest("string options are treated as url", function(done) {
        let transport = new RemoteTransport({
            read: "foo"
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.read();
    });

    asyncTest("read calls the success handler when the ajax response is returned", function(done) {
        let transport = new RemoteTransport({
            read: "foo"
        });

        $.mockjax({
            url: "foo",
            responseText: "[]"
        });

        transport.read({
            success: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    asyncTest("read calls the error handler when the ajax request fails", function(done) {
        let count = 0;
        let transport = new RemoteTransport({
            read: "foo"
        });

        $.mockjax({
            url: "foo",
            status: 500
        });

        transport.read({
            success: function() {
                count++; // we should not be here
            },
            error: function() {
                done(() => {
                    assert.equal(count, 0);
                    assert.isOk(true);
                });
            }
        });
    });

    asyncTest("read check if result exists in cache passing the data argumets as key", function(done) {
        let key = false,
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
                done(() => assert.equal(key.foo, "bar"));
            }
        });
    });

    asyncTest("read does not send request if data exists in cache", function(done) {
        let count = 0;
        let data = [1, 2, 3, 4],
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
                count++; // we should not be here
            }
        });

        transport.read({
            success: function() {
                let result = arguments[0];
                done(() => {
                    assert.equal(count, 0);
                    assert.equal(result, data);
                });
            }
        });

    });

    asyncTest("read adds item to the cache", function(done) {
        let transport = new RemoteTransport({
            read: "foo",
            cache: {
                find: function() {
                    return undefined;
                },
                add: function(key, item) {
                    done(() => {
                        assert.equal(key.foo, "bar");
                        assert.equal(item[0].age, 1);
                    });
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
        let transport = new RemoteTransport({
            read: "foo",
            cache: true
        });

        assert.isOk(transport.cache instanceof kendo.data.Cache);
    });

    it("setting cache to false disables caching", function() {
        let transport = new RemoteTransport({
            cache: false
        });

        assert.isOk(!(transport.cache instanceof kendo.data.Cache));
    });

    it("setting cache to inmemory returns Cache", function() {
        let cache = kendo.data.Cache.create("inmemory");
        assert.isOk(cache instanceof kendo.data.Cache);
    });

    it("update as string options are treated as url", function() {
        let transport = new RemoteTransport({
            update: "foo"
        });

        assert.equal(transport.options.update.url, "foo");
    });

    it("destroy as string option is treated as url", function() {
        let transport = new RemoteTransport({
            destroy: "foo"
        });

        assert.equal(transport.options.destroy.url, "foo");
    });

    it("create as string option is treated as url", function() {
        let transport = new RemoteTransport({
            create: "foo"
        });

        assert.equal(transport.options.create.url, "foo");
    });

    asyncTest("update calls $.ajax", function(done) {
        let transport = new RemoteTransport({
            update: {
                url: "foo"
            }
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.update();
    });

    asyncTest("destroy calls $.ajax", function(done) {
        let transport = new RemoteTransport({
            destroy: {
                url: "foo"
            }
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.destroy();
    });

    asyncTest("create calls $.ajax", function(done) {
        let transport = new RemoteTransport({
            create: {
                url: "foo"
            }
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.create();
    });

    asyncTest("update passes its options to $.ajax", function(done) {
        let transport = new RemoteTransport({
            update: {}
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.update({ url: "foo" });
    });

    asyncTest("destroy passes its options to $.ajax", function(done) {
        let transport = new RemoteTransport({
            destroy: {}
        });

        $.mockjax({
            url: "foo",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        transport.destroy({ url: "foo" });
    });

    asyncTest("update calls the success handler when the ajax response is returned", function(done) {
        let transport = new RemoteTransport({
            update: "foo"
        });

        $.mockjax({
            url: "foo",
            responseText: "[]"
        });

        transport.update({
            success: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    asyncTest("update calls the error handler when the ajax request fails", function(done) {
        let count = 0;
        let transport = new RemoteTransport({
            update: "foo"
        });

        $.mockjax({
            url: "foo",
            status: 500
        });

        transport.update({
            success: function() {
                count++; // we should not be here
            },
            error: function() {
                done(() => {
                    assert.equal(count, 0);
                    assert.isOk(true);
                });
            }
        });
    });

    asyncTest("update calls its parameterMap", function(done) {
        let parameterMapWasCalled = false;
        let transport = new RemoteTransport({
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
                done(() => assert.isOk(parameterMapWasCalled));
            }
        });

        transport.update({ url: "foo" });
    });

    asyncTest("update passes constructor options.update.data to its parameterMap", function(done) {
        let data,
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
                done(() => {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                });
            }
        });

        transport.update({ url: "foo", data: { baz: "moo" } });
    });

    asyncTest("update passes constructor data function result to its parameterMap", function(done) {
        let data,
            transport = new RemoteTransport({
                update: {
                    url: "foo",
                    data: function() {
                        return {
                            foo: "bar"
                        };
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
                done(() => {
                    assert.equal(data.foo, "bar");
                    assert.equal(data.baz, "moo");
                });
            }
        });

        transport.update({ url: "foo", data: { baz: "moo" } });
    });

});
