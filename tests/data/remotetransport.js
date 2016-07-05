(function(){
var RemoteTransport =  kendo.data.RemoteTransport;

module("RemoteTransport", {
    setup: function() {
        $.mockjaxSettings.contentType = "text/json";
        $.mockjaxSettings.responseTime = 0;
    },
    teardown: function() {
        $.mockjax.clear();
    }
});

asyncTest("read calls $.ajax", 1, function() {
    var transport = new RemoteTransport({
            read: {
                url: "foo"
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.read();
});

asyncTest("read passes its options to $.ajax", 1, function() {
    var transport = new RemoteTransport({
            read: {
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.read({ url: "foo" });
});

asyncTest("read passes options.data to its parameterMap", 1, function() {
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
            ok(parameterMapWasCalled);
            start();
        }
    });

    transport.read({ url: "foo" });
});

asyncTest("read passes constructor options.read.data to its parameterMap", 2, function() {
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
            equal(data.foo, "bar");
            equal(data.baz, "moo");
            start();
        }
    });

    transport.read({ url: "foo", data: { baz: "moo" } });
});

asyncTest("read passes constructor data function result to its parameterMap", 2, function() {
    var data,
        transport = new RemoteTransport({
            read: {
                url: "foo",
                data: function(){
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
            equal(data.foo, "bar");
            equal(data.baz, "moo");
            start();
        }
    });

    transport.read({ url: "foo", data: { baz: "moo" } });
});

asyncTest("read constructor data function is persisted on multiple requests", 2, function() {
    var data,
        called = 0,
        transport = new RemoteTransport({
            read: {
                url: "foo",
                data: function(){
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
            if(called == 2) {
                ok(true);
                start();
            }
        }
    });

    transport.read({ url: "foo", data: { baz: "moo" } });
    $.mockjax.clear();
    $.mockjax({
        url: "foo",
        response: function() {
            if(called == 2) {
                ok(true);
                start();
            }
        }
    });

    stop();
    transport.read({ url: "foo", data: { baz: "moo" } });
});

asyncTest("read constructor data has access to the data to be passed to parameterMap", 2, function() {
    var data,
        called = 0,
        transport = new RemoteTransport({
            read: {
                url: "foo",
                data: function(data){
                    ok(data);
                    equal(data.baz, "moo");
                }
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
            start();
        }
    });

    transport.read({ url: "foo", data: { baz: "moo" } });

    $.mockjax.clear();
});

asyncTest("read original data is not contaminated when additional data is submitted", 1, function() {
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
            start();
        }
    });

    transport.read({ url: "foo", data: { baz: "moo" } });

    ok(!("baz" in transport.options.read.data));
});

asyncTest("update passes data options to parameterMap", 1, function() {
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
            equal(data.foo, "bar");
            start();
        }
    });

    transport.update( { data: { foo: "bar" } } );
});

asyncTest("the type argument of the parameterMap is update during updating", 1, function() {
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
            equal(parameterMapType, "update");
            start();
        }
    });

    transport.update();
});

asyncTest("the type argument of the parameterMap is destroy during destroying", 1, function() {
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
            equal(parameterMapType, "destroy");
            start();
        }
    });

    transport.destroy();
});

asyncTest("the type argument of the parameterMap is create during creating", 1, function() {
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
            equal(parameterMapType, "create");
            start();
        }
    });

    transport.create();
});

asyncTest("the type argument of the parameterMap is read during reading", 1, function() {
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
            equal(parameterMapType, "read");
            start();
        }
    });

    transport.read();
});

test("parameterMap as plain object", function() {
    var transport = new RemoteTransport({
        parameterMap: { take: "$take", skip: "$skip" }
    });

    var result = transport.parameterMap({ take: 1, skip: 1 });
    equal(result["$take"], 1);
    equal(result["$skip"], 1);
});

test("parameterMap as plain object copies unsuported fields", function() {
    var transport = new RemoteTransport({
        parameterMap: { take: "$take", skip: "$skip" }
    });

    var result = transport.parameterMap({ take: 1, skip: 1, foo: "bar" });
    equal(result["foo"], "bar");
});

test("parameterMap as plain object calls functions", function() {
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

    equal(result["$take"], "foobar");
});

asyncTest("string options are treated as url", 1, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.read();
});

asyncTest("read calls the success handler when the ajax response is returned", 1, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    $.mockjax({
        url: "foo",
        responseText: "[]"
    });

    transport.read({
        success: function() {
            ok(true);
            start();
        }
    });
});

asyncTest("read calls the error handler when the ajax request fails", 1, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    $.mockjax({
        url: "foo",
        status: 500
    });

    transport.read({
        success: function() {
            ok(false); // we should not be here
        },
        error: function() {
            start();
            ok(true);
        }
    });
});

asyncTest("read check if result exists in cache passing the data argumets as key", 1, function() {
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
            start();
            equal(key.foo, "bar");
        }
    });
});

asyncTest("read does not send request if data exists in cache", 1, function() {
    var data = [1,2,3,4],
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
            ok(false); // we should not be here
        }
    });

    transport.read({
        success: function() {
            start();
            equal(arguments[0], data);
        }
    });

});

asyncTest("read adds item to the cache", 2, function() {
    var transport = new RemoteTransport({
            read: "foo",
            cache: {
                find: function() {
                    return undefined;
                },
                add: function(key, item) {
                    start();
                    equal(key.foo, "bar");
                    equal(item[0].age, 1);
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

test("setting cache to true applies in memory cache", function() {
    var transport = new RemoteTransport({
        read: "foo",
        cache: true
    });

    ok(transport.cache instanceof kendo.data.Cache);
});

test("setting cache to false disables caching", function() {
    var transport = new RemoteTransport({
        cache: false
    });

    ok(!(transport.cache instanceof kendo.data.Cache));
});

test("setting cache to inmemory returns Cache", function() {
    var cache = kendo.data.Cache.create("inmemory");
    ok(cache instanceof kendo.data.Cache);
});

test("update as string options are treated as url", function() {
    var transport = new RemoteTransport({
        update: "foo"
    });

    equal(transport.options.update.url, "foo");
});

test("destroy as string option is treated as url", function() {
    var transport = new RemoteTransport({
        destroy: "foo"
    });

    equal(transport.options.destroy.url, "foo");
});

test("create as string option is treated as url", function() {
    var transport = new RemoteTransport({
        create: "foo"
    });

    equal(transport.options.create.url, "foo");
});

asyncTest("update calls $.ajax", 1, function() {
    var transport = new RemoteTransport({
        update: {
            url: "foo"
        }
    });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.update();
});

asyncTest("destroy calls $.ajax", 1, function() {
    var transport = new RemoteTransport({
        destroy: {
            url: "foo"
        }
    });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.destroy();
});

asyncTest("create calls $.ajax", 1, function() {
    var transport = new RemoteTransport({
        create: {
            url: "foo"
        }
    });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.create();
});

asyncTest("update passes its options to $.ajax", 1, function() {
    var transport = new RemoteTransport({
        update: {
        }
    });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.update({ url: "foo" });
});

asyncTest("destroy passes its options to $.ajax", 1, function() {
    var transport = new RemoteTransport({
        destroy: {
        }
    });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(true);
            start();
        }
    });

    transport.destroy({ url: "foo" });
});

asyncTest("update calls the success handler when the ajax response is returned", 1, function() {
    var transport = new RemoteTransport({
        update: "foo"
    });

    $.mockjax({
        url: "foo",
        responseText: "[]"
    });

    transport.update({
        success: function() {
            ok(true);
            start();
        }
    });
});

asyncTest("update calls the error handler when the ajax request fails", 1, function() {
    var transport = new RemoteTransport({
        update: "foo"
    });

    $.mockjax({
        url: "foo",
        status: 500
    });

    transport.update({
        success: function() {
            ok(false); // we should not be here
        },
        error: function() {
            start();
            ok(true);
        }
    });
});

asyncTest("update calls its parameterMap", 1, function() {
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
            ok(parameterMapWasCalled);
            start();
        }
    });

    transport.update({ url: "foo" });
});

asyncTest("update passes constructor options.update.data to its parameterMap", 2, function() {
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
            equal(data.foo, "bar");
            equal(data.baz, "moo");
            start();
        }
    });

    transport.update({ url: "foo", data: { baz: "moo" } });
});

asyncTest("update passes constructor data function result to its parameterMap", 2, function() {
    var data,
        transport = new RemoteTransport({
            update: {
                url: "foo",
                data: function(){
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
            equal(data.foo, "bar");
            equal(data.baz, "moo");
            start();
        }
    });

    transport.update({ url: "foo", data: { baz: "moo" } });
});

}());
