(function(){
module("data source query", {
    setup: function() {
        $.mockjaxSettings.contentType = 'text/json';
        $.mockjaxSettings.responseTime = 0;
    },
    teardown: function() {
        $.mockjaxClear()
    }
});

var data = [];
var RemoteTransport = kendo.data.RemoteTransport;
var DataSource = kendo.data.DataSource;

function setup(source) {
    data = source || [{ id:1, bar: "foo" },{ id: 2, bar: "foo" }];

    var dataSource = new DataSource( {
       data: data
    });

    dataSource.read();
    return dataSource;
}

test("query raises the change event", function() {
    var dataSource = new DataSource({
        data: data
    });
    var changeWasCalled = false;

    dataSource.read();

    dataSource.bind("change", function() {
        changeWasCalled = true;
    });

    dataSource.query({});

    ok(changeWasCalled);
});

test("query sets the pageSize", function() {
    var dataSource = new DataSource({
        data: data
    });
    dataSource.query({ pageSize: 1 });
    equal(dataSource.pageSize(), 1);
});

 test("query sets page", function() {
    var dataSource = new DataSource({
        data: data
    });

    dataSource.query({ page: 1 });
    equal(dataSource.page(), 1);
});

test("query sets sort", function() {
    var dataSource = new DataSource({
        data: data
    });

    dataSource.query({ sort: { field: "foo", dir: "asc" }});
    ok($.isArray(dataSource.sort()));
    equal(dataSource.sort()[0].field, "foo");
    equal(dataSource.sort()[0].dir, "asc");

});

test("query sets custom comparer", function() {
    var dataSource = new DataSource({
        data: data
    });

    var comparer = function() {};
    dataSource.query({ sort: { dir: "asc", compare: comparer }});
    equal(dataSource.sort()[0].compare, comparer);
});

test("query sets sort when array is passed", function() {
    var dataSource = new DataSource({
        data: data
    });

    dataSource.query({ sort: [{ field: "foo", dir: "asc" }, { field: "bar", dir: "desc" } ]});
    equal(dataSource.sort().length, 2);
    equal(dataSource.sort()[1].field, "bar");
    equal(dataSource.sort()[1].dir, "desc");
});

test("paging", function() {
    var dataSource = new DataSource({
        data: [1,2,3]
    });

    dataSource.read();
    dataSource.query({ pageSize: 1, page: 2 });

    var view = dataSource.view();

    equal(view.length, 1);
    equal(view[0], 2);
});

test("sorting", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.query( { sort: { field: "age", dir: "desc" } } );
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 2);
    equal(view[1].age, 1);
});

test("sorting sort expression are removed from the state if not passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.query( { sort: { field: "age", dir: "desc" } } );
    dataSource.query({});
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(view[1].age, 2);
    equal(dataSource.sort(), undefined);
});

test("sorting though sort method", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.sort( { field: "age", dir: "desc" } );
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 2);
    equal(view[1].age, 1);
});

test("paging is after sorting", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });

    dataSource.read();
    dataSource.query( { page: 2, pageSize: 1, sort: { field: "age", dir: "desc" } } );
    var view = dataSource.view();

    equal(view[0].age, 1);
});

test("original data is not modified", function() {
    var data = [{age: 1}, {age: 2}];

    var dataSource = new DataSource({
        data: data
    });
    dataSource.read();
    dataSource.query( { page: 2, pageSize: 1, sort: { field: "age", dir: "desc" } } );
    var view = dataSource.data();

    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(view[1].age, 2);
});

asyncTest("data is not sorted if serverSorting = true", 3, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    var dataSource = new DataSource( {
        transport: transport,
        serverSorting: true
    }).bind("change", function() {
        start();

        ok(true);
        var view = dataSource.view();
        equal(view[0].age, 1);
        equal(view[1].age, 2);
    });

    $.mockjax({
        url: "foo",
        responseText: '[{"age": 1}, {"age": 2}]'
    });

    dataSource.query( { sort: { field: "age", dir: "desc" } } );
});

asyncTest("data is not paged if serverPaging = true", 2, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true
    }).bind("change", function() {
        start();

        var view = dataSource.view();
        equal(view[0].age, 1);
        equal(view[1].age, 2);
    });

    $.mockjax({
        url: "foo",
        responseText: '[{"age": 1}, {"age": 2}]'
    });

    dataSource.query( { page: 2, pageSize: 1 } );
});

test("group original field name is used if projection with from is set", 2, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.group[0].field, "foo");
            equal(options.group[1].field, "baz");

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: { from: "foo" },
                    boo: { from: "baz" }
                }
            }
        },
        serverGrouping: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.group([{ field: "bar" }, { field: "boo" }]);
});

test("group original field name is used if projection is set", 2, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.group[0].field, "foo");
            equal(options.group[1].field, "baz");

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo",
                    boo: "baz"
                }
            }
        },
        serverGrouping: true,
    });

    $.mockjax({
        url: "foo"
    });

    dataSource.group([{ field: "bar" }, { field: "boo" }]);
});

test("group with aggregates original field name is used if projection is set", 2, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.group[0].aggregates[0].field, "foo");
            equal(options.group[0].aggregates[1].field, "baz");

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo",
                    boo: "baz"
                }
            }
        },
        serverGrouping: true,
    });

    $.mockjax({
        url: "foo"
    });

    dataSource.group({
        field: "bar",
        aggregates: [{
            field: "bar",
            aggregate: "count"
        },{
            field: "boo",
            aggregate: "count"
        }]
    });

});

test("aggregates original field name is used if projection is set", 2, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.aggregate[0].field, "foo");
            equal(options.aggregate[1].field, "baz");

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo",
                    boo: "baz"
                }
            }
        },
        serverAggregates: true,
    });

    $.mockjax({
        url: "foo"
    });

    dataSource.aggregate(
        [{
            field: "bar",
            aggregate: "count"
        },{
            field: "boo",
            aggregate: "count"
        }]);
});

test("filter without model definition and serverFiltering", function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.filter.filters[0].field, "foo");

            return options;
        }
    });

    var dataSource = new kendo.data.DataSource({
        transport: transport,
        serverFiltering: true,
        schema: {
            model: {
                fields: { }
            }
        }
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.filter({ field: "foo", operator: "eq", value: "bar" });
});

test("filter original field name is used if projection is set", 2, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.filter.filters[0].field, "foo");
            equal(options.filter.filters[1].field, "baz");

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo",
                    boo: "baz"
                }
            }
        },
        serverFiltering: true
    });

    $.mockjax({
        url: "foo",
    });


    dataSource.filter({
        logic: "and",
        filters: [
            { field: "bar", operator: "eq", value: 1 },
            { field: "boo", operator: "eq", value: 1 },
            ]
        });
});

test("filter with no descriptors persist filters property", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            ok(options.filter.filters);

            return options;
        }
    });

    var dataSource = new kendo.data.DataSource({
        transport: transport,
        serverFiltering: true,
        schema: {
            model: {
                fields: { }
            }
        }
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.filter({ logic: "and", filters: [] });
});

test("sort datasource state is not modified after original field is restored", 1, function() {
    var transport = new RemoteTransport({
        read: "foo"
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo"
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "bar", dir: "asc" });
    equal(dataSource.sort()[0].field, "bar");
});

test("filter datasource state is not modified after original field is restored", 1, function() {
    var transport = new RemoteTransport({
        read: "foo"
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo"
                }
            }
        },
        serverFiltering: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.filter({ field: "bar", operator: "eq", value: "42" });
    equal(dataSource.filter().filters[0].field, "bar");
});

test("sort original field name is used if projection is set", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.sort[0].field, "foo");
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: "foo"
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "bar", dir: "asc" });
});

test("sort original field name is used if projection is set if xml is used", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.sort[0].field, "bar");
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            type: "xml",
            model: {
                fields: {
                    bar: "bar/text()"
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "bar", dir: "asc" });
});

test("sort original field name is used if projection is set via field definition", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.sort[0].field, "foo");
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "bar", dir: "asc" });
});

test("sort original field name is used if projection is set field definiton without a field options", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.sort[0].field, "bar");
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    bar: { type: "number" }
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "bar", dir: "asc" });
});

test("sort original field name is used if complex field", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.sort[0].field, "foo.bar");
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        schema: {
            model: {
                fields: {
                    foo: { type: "object" }
                }
            }
        },
        serverSorting: true,
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.sort({ field: "foo.bar", dir: "asc" });
});

test("next method gets the subsequent page", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.next();

    var view = dataSource.view();

    equal(view.length, 1);
    equal(view[0], 2);
    equal(dataSource.page(), 2);
});

test("next method does nothing if no subsequent page", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.page(3);

    dataSource.next();

    var view = dataSource.view();

    equal(view.length, 1);
    equal(view[0], 3);
    equal(dataSource.page(), 3);
});

test("next method gets the subsequent page from server", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.page, 2);

            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true,
        pageSize: 1
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.next();
});

test("next method does nothing if pageSize is not defined (remote transport)", 0, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            ok(false)
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.next();
});

test("next method does nothing (local transport)", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3]
    });

    dataSource.next();

    equal(dataSource.view().length, 0);
});

test("next method honors total size", 2, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3],
        pageSize: 3
    });

    dataSource.read();
    var page = dataSource.next();

    equal(dataSource.total(), 3);
    equal(page, undefined);
});

test("next method accepts parameters", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3],
        pageSize: 1
    });

    dataSource.read();

    stub(dataSource, {
        query: dataSource.query
    });

    dataSource.next({
        custom: "custom"
    });

    equal(dataSource.args("query", 0)[0].custom, "custom");
});

test("next page overrides page property of the passed parameters", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3],
        pageSize: 1
    });

    dataSource.read();

    stub(dataSource, {
        query: dataSource.query
    });

    dataSource.next({
        page: 3
    });

    equal(dataSource.args("query", 0)[0].page, 2);
});

test("prev method gets the previous page", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.page(3);
    var page = dataSource.prev();

    var view = dataSource.view();

    equal(view.length, 1);
    equal(view[0], 2);
    equal(dataSource.page(), 2);
    equal(page, 2);
});

test("prev method does nothing if no previous page", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.prev();

    var view = dataSource.view();

    equal(view.length, 1);
    equal(view[0], 1);
    equal(dataSource.page(), 1);
});

test("prev method gets the previous page from server", 1, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            equal(options.page, 1);
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true,
        pageSize: 1
    });
    dataSource._skip = 1; //fake current page (zero based)

    $.mockjax({
        url: "foo",
    });

    dataSource.prev();
});

test("prev method does nothing if pageSize is not defined (remote transport)", 0, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            ok(false)
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.prev();
});

test("prev method does nothing (local transport)", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3]
    });

    dataSource.prev();

    equal(dataSource.view().length, 0);
});

test("prev does not page if no previous page (remote transport)", 0, function() {
    var transport = new RemoteTransport({
        read: "foo",
        parameterMap: function(options) {
            ok(false)
            return options;
        }
    });

    var dataSource = new DataSource( {
        transport: transport,
        serverPaging: true,
        pageSize: 1
    });

    $.mockjax({
        url: "foo",
    });

    dataSource.prev();
});

test("prev method accepts parameters", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.page(3);

    stub(dataSource, {
        query: dataSource.query
    });

    dataSource.prev({
        custom: "custom"
    });

    equal(dataSource.args("query", 0)[0].custom, "custom");
});

test("prev method overrides passed page parameter", 1, function() {
    var dataSource = new DataSource( {
        data: [1, 2, 3],
        pageSize: 1
    });

    dataSource.read();
    dataSource.page(3);

    stub(dataSource, {
        query: dataSource.query
    });

    dataSource.prev({
        page: 1
    });

    equal(dataSource.args("query", 0)[0].page, 2);
});

test("page should page and persist settings applied through the constructor", function(){
    var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}],
        pageSize: 2,
        sort: {
            field: "age",
            dir: "desc"
        }
    });

    dataSource.read();
    dataSource.page(2);

    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0].age, 1);
    equal(dataSource.page(), 2);
});

test("page with no pageSize set should return all data", function(){
    var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    dataSource.read();
    dataSource.page(2);

    var view = dataSource.view();
    equal(view.length, 3);
    equal(view[0].age, 1);
    equal(dataSource.page(), 1);
});

test("page cannot be set to value greater than the totalPages", function() {
    var dataSource = new DataSource({
        pageSize: 1,
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    dataSource.read();
    dataSource.page(42);
    equal(dataSource.page(), 3);
});

test("page cannot be set to value lower than the first page", function() {
    var dataSource = new DataSource({
        pageSize: 1,
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    dataSource.read();
    dataSource.page(0);
    equal(dataSource.page(), 1);
});

test("pageSize should take given number of items", function(){
    var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}],
        page: 1
    });

    dataSource.read();
    dataSource.pageSize(2);

    var view = dataSource.view();
    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(dataSource.pageSize(), 2);
});

test("data is populated if query is called without call to read", function() {
     var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    dataSource.query({ page: 1, pageSize: 2});
    equal(dataSource.view().length, 2);
});

test("query triggers change event when called without read", function() {
     var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    var changeWasCalled = false;
    dataSource.bind("change", function() {
        changeWasCalled = true;
    });

    dataSource.query({ page: 1, pageSize: 2});
    ok(changeWasCalled);
});

test("total is populated if query is called without call to read", function() {
    var dataSource = new DataSource({
        data: [{ age: 1 }, { age: 2 }, { age: 3}]
    });

    dataSource.query({ page: 1, pageSize: 2});
    equal(dataSource.total(), 3);
});

test("query should filter if filter is set", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }]
    });

    dataSource.query( { filter: { field: "bar", operator: "==", value: "baz" } } );
    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0].bar, "baz");

    ok(dataSource.view()[0] instanceof kendo.data.ObservableObject);
});

test("filter first page is shown", function() {
    var dataSource = new DataSource({
        data: [{ id:1 }, { id: 2 }],
        pageSize: 1,
        page: 2
    });

    dataSource.filter( { field: "id", operator: "==", value: 2 });
    equal(dataSource.page(), 1);
    equal(dataSource.view()[0].id, 2);
});

test("filter operators are normalized", function() {
    var dataSource = new DataSource({
        data: [{ id:1 }, { id: 2 }]
    });

    dataSource.filter( { field: "id", operator: "==", value: 1 });
    equal(dataSource.filter().filters[0].operator, "eq");
});

test("query should update the total if filtering is enabled", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }]
    });

    dataSource.query( { filter: { field: "bar", operator: "==", value: "baz" } } );
    equal(dataSource.total(), 1);
});

asyncTest("query does not filter data if serverFiltering = true", 3, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    var dataSource = new DataSource( {
        transport: transport,
        serverFiltering: true
    }).bind("change", function() {
        start();

        var view = dataSource.view();
        equal(view.length, 2);
        equal(view[0].age, 1);
        equal(view[1].age, 2);
    });

    $.mockjax({
        url: "foo",
        responseText: '[{"age": 1}, {"age": 2}]'
    });

    dataSource.query( { filter: { field: "age", operator: "==", value: 2 } } );
});

test("total is correct after adding a removed item, when data is single item", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" }]
    });

    dataSource.read();

    var item = dataSource.at(0);
    dataSource.remove(item);
    dataSource.add(item);

    equal(dataSource.total(), 1);
});

test("cancelChanges refresh the total if serverpaging is enabled", function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success( { data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }], total: 2 });
            }
        },
        schema: {
            data: "data",
            total: "total"
        },
        serverPaging: true
    });

    dataSource.read();

    dataSource.add({});
    dataSource.cancelChanges();
    equal(dataSource.total(), 2);
});

test("cancelChanges refresh the total if bound to an observablearray", function() {
    var data = new kendo.data.ObservableArray([{ id:1, bar: "foo" },{ id: 2, bar: "baz" }]),
        dataSource = new DataSource({
            data: data
        });

    dataSource.read();

    dataSource.add({});
    dataSource.cancelChanges();
    equal(dataSource.total(), 2);
});


test("cancelChanges refresh the total if serverpaging is enabled and grouping is applied", function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success( { group: [{ items: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }] }, { items: [{ id:1, bar: "foo" }] }], total: 10 });
            }
        },
        schema: {
            groups: "group",
            total: "total"
        },
        group: { field: "id" },
        serverPaging: true,
        serverGrouping: true
    });

    dataSource.read();

    dataSource.add({});
    dataSource.cancelChanges();
    equal(dataSource.total(), 10);
});

test("paging is after filtering", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}, {age: 3}]
    });

    dataSource.read();
    dataSource.query( { page: 2, pageSize: 1, filter: { field: "age", operator: "!=", value: 2 } } );
    var view = dataSource.view();

    equal(view[0].age, 3);
});

test("query sets filter when array is passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}, {age: 3}]
    });

    dataSource.query( { filter: [{ field: "age", operator: ">=", value: 1 },{ field: "age", operator: "<", value: 3 }] });
    equal(dataSource.filter().filters.length, 2);
    equal(dataSource.filter().filters[1].field, "age");
    equal(dataSource.filter().filters[1].operator, "lt");
    equal(dataSource.filter().filters[1].value, 3);
});

test("query sets filter", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}, {age: 3}]
    });

    dataSource.query({ filter: { field: "age", operator: "==", value: 2 } });
    ok($.isArray(dataSource.filter().filters));
    equal(dataSource.filter().filters[0].field, "age");
    equal(dataSource.filter().filters[0].operator, "eq");
    equal(dataSource.filter().filters[0].value, 2);
});

test("query removes filter expression from the state if not passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.query( { filter: { field: "age", operator: "==", value: 2 } } );
    dataSource.query({});
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(view[1].age, 2);
    equal(dataSource.filter(), undefined);
});

test("filtering though filter method", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}, {age: 3}]
    });
    dataSource.read();
    dataSource.filter( { field: "age", operator: "!=", value: 2 } );
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(view[1].age, 3);
});

test("query grouping should group data if set", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 1}, {age: 3}]
    });
    dataSource.read();
    dataSource.query( { group: [{ field: "age" }] });
    var view = dataSource.view();
    equal(view.length, 2);
    equal(view[0].items.length, 2);
    equal(view[1].items.length, 1);
});

asyncTest("query does not group data if serverGrouping is true", 3, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    var dataSource = new DataSource( {
        transport: transport,
        serverGrouping: true
    }).bind("change", function() {
        start();

        var view = dataSource.view()[0].items;
        equal(view.length, 2);
        equal(view[0].age, 1);
        equal(view[1].age, 2);
    });

    $.mockjax({
        url: "foo",
        responseText: '[{ "items": [{"age": 1}, {"age": 2}] }]'
    });

    dataSource.query( { group: [{ field: "age" }] });
});

test("group with paging", function() {
    var data = [{age: 1}, {age: 3}, {age: 1}];

    var dataSource = new DataSource({
        data: data,
        page: 1,
        pageSize: 2
    });
    dataSource.read();
    dataSource.group({ field: "age" });
    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0].items.length, 2);
});

test("query sets group when single group is passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}, {age: 3}]
    });

    dataSource.query( { group: { field: "age" } });
    equal(dataSource.group().length, 1);
    equal(dataSource.group()[0].field, "age");
});

test("query removes group expression from the state if not passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.query( { group: { field: "age" } });
    dataSource.query({});
    var view = dataSource.view();

    equal(view.length, 2);
    equal(view[0].age, 1);
    equal(view[1].age, 2);
    equal(dataSource.group(), undefined);
});

test("group should group data if set", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 1}, {age: 3}]
    });
    dataSource.read();
    dataSource.group("age");
    var view = dataSource.view();
    equal(view.length, 2);
    equal(view[0].items.length, 2);
    equal(view[1].items.length, 1);
});

test("group aggregates should be calcualted if paging is enabled", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 1}, {age: 3}],
        page: 2,
        pageSize: 1
    });
    dataSource.read();
    dataSource.group({field: "age", aggregates: [ {field: "age", aggregate: "count"}] });
    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0].aggregates.age.count, 2);
});
test("group with sorting order is applied", function() {
    var dataSource = new DataSource({
        data: [{age: 1, name: "John" }, {age: 1, name: "Tom" }, {age: 1, name: "Jerry" }]
    });

    dataSource.query( { group: { field: "age" }, sort: { field: "name", dir: "asc" } });
    var group = dataSource.view()[0].items;
    equal(group[0].name, "Jerry");
    equal(group[1].name, "John");
    equal(group[2].name, "Tom");
});
test("aggregate should be calculated if defined", function() {
    var dataSource = new DataSource({
        data: [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ]
    });
    dataSource.read();

    dataSource.aggregate( [{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }] );
    var result = dataSource.aggregates();
    equal(result.foo.sum, 201);
    equal(result.bar.count, 3);
});

test("query aggregate should be calculated if defined", function() {
    var dataSource = new DataSource({
        data: [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ]
    });

    dataSource.query( {aggregate:[{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]} );
    var result = dataSource.aggregates();
    equal(result.foo.sum, 201);
    equal(result.bar.count, 3);
});

test("query removes aggregates from the state if not passed", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2}]
    });
    dataSource.read();
    dataSource.query( {aggregate:[{ field: "foo", aggregate: "sum" }]} );
    dataSource.query({});

    equal(dataSource.aggregate(), undefined);
    ok($.isEmptyObject(dataSource.aggregates()));
});

asyncTest("query does not aggregate data if serverAggregate is true", 1, function() {
    var transport = new RemoteTransport({
            read: "foo"
        });

    var dataSource = new DataSource( {
        transport: transport,
        serverAggregates: true
    }).bind("change", function() {
        start();

        ok($.isEmptyObject(dataSource.aggregates()));
    });

    $.mockjax({
        url: "foo",
        responseText: '[{"age": 1}, {"age": 2}]'
    });

    dataSource.query( {aggregate:[{ field: "foo", aggregate: "sum" }]} );
});

test("query does pass additional options to the transport", function() {
    var options, dataSource = new DataSource( {
        transport: {
            read: function() {
                options = arguments[0].data;
            }
        }
    });

    dataSource.query({foo: "bar"});
    equal(options.foo, "bar");
});
test("query uses skip and take", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });
    dataSource.query( { skip: 2, take: 3 });
    var result = dataSource.view();

    equal(result.length, 3);
    equal(result[0].age, 3);
    equal(result[1].age, 4);
    equal(result[2].age, 5);
});

test("skip return skipped items for given page and pageSize", function() {
     var dataSource = new DataSource({
         data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
         page: 2,
         pageSize: 3
    });
    equal(dataSource.skip(), 3);
});

test("skip return value set through query", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });
    dataSource.query({ skip: 3 });
    equal(dataSource.skip(), 3);
});

test("take return pageSize is not set", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4
    });
    equal(dataSource.take(), 4);
});

test("take return take set through query", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4
    });
    dataSource.query({ take: 3 });
    equal(dataSource.take(), 3);
});

test("query raised requestStart", function() {
    var called = false,
        dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function() {
            called = true;
        }
    });
    dataSource.read();
    dataSource.query({ take: 3 });
    ok(called);
});

test("query raised progress event", 1, function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4
    });
    dataSource.read();
    dataSource.bind("progress", function() { ok(true); });

    dataSource.query({ take: 3 });
});

test("read raised requestStart", function() {
    var called = false,
        dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function() {
            called = true;
        }
    });
    dataSource.read();
    ok(called);
});

test("read raised progress", 1, function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        progress: function() {
            ok(true);
        }
    });
    dataSource.read();
});

test("canceling requestStart prevents read", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function(e) {
            e.preventDefault();
        }
    });

    dataSource.read();

    ok(!dataSource.data().length);
});

test("canceling requestStart does not block subsequent reads", function() {
    var count = 1,
        dataSource = new DataSource({
            data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
            pageSize: 4,
            requestStart: function(e) {
                if (count) {
                    e.preventDefault();
                    count--;
                }
            }
        });

    dataSource.read();

    dataSource.read();

    ok(dataSource.data().length);
});

test("canceling requestStart from read does not modify datasource state", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function(e) {
            e.preventDefault();
        }
    });

    dataSource.read({page: 2 });

    equal(dataSource.page(), 1);
});

test("canceling requestStart prevents query", function() {
    var count = 0,
        dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function(e) {
            if (count) {
                e.preventDefault();
            }
            count++;
        }
    });

    dataSource.read();
    dataSource.page(2);

    equal(dataSource.view()[0].age, 1);
});

test("canceling requestStart on query does not modify the datasource state", function() {
    var count = 0,
        dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}],
        pageSize: 4,
        requestStart: function(e) {
            if (count) {
                e.preventDefault();
            }
            count++;
        }
    });

    dataSource.read();
    dataSource.page(2);

    equal(dataSource.page(), 1);
});


test("query raised requestEnd", 1, function() {
    var called = false,
        dataSource = new DataSource({
            data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
        });

    dataSource.read();

    dataSource.bind("requestEnd", function() {
        ok(true);
    });

    dataSource.query();
});

test("fetch persists dataSource options", function() {
    var dataSource = new DataSource({
        serverPaging: true,
        serverSorting: true,
        serverGrouping: true,
        serverFiltering: true,
        serverAggregates: true,
        data: [ { items: [{foo: 1, bar: "1"}] } ],
        page: 10,
        pageSize: 5,
        sort: { field: "foo", dir: "asc" },
        filter: { field: "bar", operator: "eq", value: "1" },
        group: { field: "foo" },
        aggregate: { field: "bar", aggregate: "count" }
    });

    dataSource.fetch();
    equal(dataSource.page(), 10);
    equal(dataSource.pageSize(), 5);
    equal(dataSource.sort()[0].field, "foo");
    equal(dataSource.sort()[0].dir, "asc");
    equal(dataSource.filter().filters[0].field, "bar");
    equal(dataSource.filter().filters[0].operator, "eq");
    equal(dataSource.filter().filters[0].value, "1");
    equal(dataSource.group()[0].field, "foo");
    equal(dataSource.aggregate()[0].field, "bar");
});

test("fetch triggers change event", function() {
    var view,
        dataSource = new DataSource({
            data: [{foo: 1, bar: "1"}],
            change: function() {
                view = dataSource.view();
            }
        });

    dataSource.fetch();
    equal(view.length, 1);
    equal(view[0].foo, "1");
});

test("fetch calls supplied callback only once on multiple fetches", function() {
    var view,
        called = 0,
        dataSource = new DataSource({
            data: [{foo: 1, bar: "1"}]
        });

    dataSource.fetch(function() {
        called++;
        view = dataSource.view();
    });

    dataSource.fetch();

    ok(view);
    equal(called, 1);
});

test("fetch callback is called with dataSource context", function() {
    var dataSource = new DataSource({
        data: [{foo: 1, bar: "1"}]
    });

    dataSource.fetch(function() {
        equal(this, dataSource);
    });
});

test("fetch callback is not called when requestStart is prevented", function() {
    var wasCalled = false,
        dataSource = new DataSource({
            data: [{foo: 1, bar: "1"}]
        });

    dataSource.read();

    dataSource.one("requestStart", function(e) {
        e.preventDefault();
    });

    dataSource.fetch(function() {
        wasCalled = true;
    });

    ok(!wasCalled, "fetch callback was executed");
});

test("fetch callback is not called when requestStart is prevented with remote operations", function() {
    var wasCalled = false,
        dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success([{foo: 1, bar: "1"}]);
                }
            }
        });

    dataSource.one("requestStart", function(e) {
        e.preventDefault();
    });

    dataSource.fetch(function() {
        wasCalled = true;
    });

    ok(!wasCalled, "fetch callback was executed");
});

test("paging with custom schema", function() {
    var dataSource = new DataSource({
        transport:  {
            read: function(options) {
                return options.success({ d: [ { foo: 1 }, { bar: 2 }] });
            }
        },
        schema: {
            data: function(result) {
                return result.d;
            },
            total: function(data) {
                return data.d.length;
            }
        },
        pageSize: 1
    });

    dataSource.read();
    dataSource.page(1);

    equal(dataSource.view().length, 1);
    equal(dataSource.view()[0].foo, 1);
});

test("removing model re-calculate the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.remove(dataSource.get(1));

    equal(dataSource.view().length, 1);
    equal(dataSource.total(), 1);
});

test("adding model re-calculate the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.add(new kendo.data.Model());

    equal(dataSource.view().length, 3);
    equal(dataSource.total(), 3);
});

test("pushing multiple records to the observable array updates the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
    });

    dataSource.read();

    dataSource.data().push({ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

    equal(dataSource.view().length, 4);
    equal(dataSource.total(), 4);
});

test("pushing multiple records to the observable array updates the total - total is string", function() {
    var dataSource = new DataSource({
        serverPaging: true,
        schema: {
            total: function() {
                return "2"
            }
        }
    });

    dataSource.read();

    dataSource.data().push({ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

    equal(dataSource.view().length, 2);
    equal(dataSource.total(), 4);
});

test("adding multiple records to the observable array updates the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
    });

    dataSource.read();

    dataSource.data().splice(0, 0, { foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

    equal(dataSource.view().length, 4);
    equal(dataSource.total(), 4);
});

test("removing multiple records from the observable array updates the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
    });

    dataSource.read();

    dataSource.data().splice(0, 2);

    equal(dataSource.view().length, 0);
    equal(dataSource.total(), 0);
});

test("total is calculated on initially empty DataSource", function() {
    var dataSource = new DataSource({
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.add(new kendo.data.Model());

    equal(dataSource.view().length, 1);
    equal(dataSource.total(), 1);
});

test("modify model re-calculate the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.add(new kendo.data.Model());
    dataSource.get(1).set("bar", "foo");

    equal(dataSource.view().length, 3);
    equal(dataSource.total(), 3);
});

test("cancelChanges re-calculates the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    }),
    model = new kendo.data.Model();

    dataSource.read();
    dataSource.add(model);
    dataSource.cancelChanges(model);

    equal(dataSource.view().length, 2);
    equal(dataSource.total(), 2);
});

test("cancelChanges without arguments re-calculates the total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.add(new kendo.data.Model());
    dataSource.cancelChanges();

    equal(dataSource.view().length, 2);
    equal(dataSource.total(), 2);
});

test("sync with serverPaging re-calculates the total", function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success({
                    data: [{ foo: 1, bar: "bar 1" }],
                    total: 2
                });
            },
            create: function(options) {
                options.success();
            }
        },
        pageSize: 1,
        serverPaging: true,
        schema: {
            data: "data",
            total: "total",
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.add({});
    dataSource.sync();

    equal(dataSource.view().length, 2);
    equal(dataSource.total(), 3);
});

test("query with local transport calculates total", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        schema: {
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.remove(dataSource.get(1));
    dataSource.query({ page: 1 });

    equal(dataSource.view().length, 1);
    equal(dataSource.total(), 1);
});

test("sync after remove calculates total", function() {
    var dataSource = new DataSource({
        //data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
        transport: {
            read: function(options) {
                options.success({
                    data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                    total: 2
                });
            },
            destroy: function(options) {
                options.success();
            }
        },
        schema: {
            data: "data",
            total: "total",
            model: {
                id: "foo",
                fields: {
                    foo: { type: "number" },
                    bar: "bar"
                }
            }
        }
    });

    dataSource.read();
    dataSource.remove(dataSource.get(1));
    dataSource.sync();

    equal(dataSource.view().length, 1);
    equal(dataSource.total(), 1);
});

test("query does not call transport if all items are deleted and server operations are disabled", function() {
    var dataSource = new DataSource({
        data: [{ id: 1, foo: "bar" }]
    });
    dataSource.read();
    dataSource.remove(dataSource.at(0));
    dataSource.fetch();
    equal(dataSource.view().length, 0);
});

test("query calls transport if all items are deleted and server operations are enabled", function() {
    var dataSource = new DataSource({
        data: [{ id: 1, foo: "bar" }],
        serverPaging: true
    });
    dataSource.read();
    dataSource.remove(dataSource.at(0));
    dataSource.fetch();
    equal(dataSource.view().length, 1);
});

test("fetch returns a promise", function() {
    var dataSource = new DataSource({
        data: [{ id: 1, foo: "bar" }]
    });

    equal(typeof dataSource.fetch().done, "function");
});

test("change event resolves the promise when bound to local array", function() {
    var dataSource = new DataSource({
        data: [{ id: 1, foo: "bar" }]
    });

    var promise = dataSource.fetch();

    equal(promise.state(), "resolved");
});

asyncTest("custom transport resolves the promess when the success method is called", 1, function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                setTimeout(function() {
                    options.success([]);
                }, 1);
            }
        }
    });

    var promise = dataSource.fetch();
    promise.done(function() {
        start();
        ok(true);
    });
});

asyncTest("custom transport fails the promess when the error method is called", 1, function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                setTimeout(function() {
                    options.error([]);
                }, 1);
            }
        }
    });

    var promise = dataSource.fetch();

    promise.fail(function() {
        start();
        ok(true);
    });
});

test("query returns promise for remote operations", function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success([]);
            }
        },
        serverSorting: true
    });

    ok($.isFunction(dataSource.query().then));
});

test("query returns promise for local operations", function() {
    var dataSource = new DataSource({
        data: [
            { id: 1 }
        ]
    });

    dataSource.read();

    ok($.isFunction(dataSource.query().then));
});

test("query resolves promise after data has been processed", function() {
    var dataSource = new DataSource({
        data: [
            { id: 1 }
        ]
    });

    dataSource.read();

    dataSource.query()
        .then(function() {
            ok(true);
        });
});

test("query resolves promise when requestStart is prevented", function() {
    var dataSource = new DataSource({
        data: [
            { id: 1 }
        ]
    });

    dataSource.read();

    dataSource.bind("requestStart", function(e) { e.preventDefault(); });

    dataSource.query()
        .then(function() {
            ok(true);
        });
});

}());
