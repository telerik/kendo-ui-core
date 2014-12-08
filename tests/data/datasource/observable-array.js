(function() {

module("data source observable array");

test("triggers change when observable array changes", 1, function() {
    var dataSource = kendo.data.DataSource.create([1,2,3]);

    dataSource.read();

    dataSource.bind("change", function(){
        ok("change is triggered");
    });

    dataSource.data().push(4);
});

test("passes added items in the event parameter", 1, function() {
    var dataSource = kendo.data.DataSource.create([1,2,3]);

    dataSource.read();

    dataSource.bind("change", function(e){
        equal(e.items[0], 4);
    });

    dataSource.data().push(4);
});

test("creates observale array which contains model instances if model is specified", 1, function() {

    var dataSource = new kendo.data.DataSource( {
        data: [{ id: 1}],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    dataSource.read();

    ok(dataSource.data()[0] instanceof kendo.data.Model);
});

test("ObservableObject are converted to Model if such is set", function() {
    var data = new kendo.data.ObservableArray([ {foo: 1 }]),
        ModelType = kendo.data.Model.define({
            fields: {
                foo: "foo"
            }
        }),
        dataSource = new kendo.data.DataSource({
            data: data,
            schema: {
                model: ModelType
            }
        });

    dataSource.read();

    ok(dataSource.at(0) instanceof ModelType);
    strictEqual(dataSource.data(), data);
});


test("field is not assigned if is undefined", function() {
    var data = new kendo.data.ObservableObject({foo: 1, bar: undefined });

    strictEqual(data.foo, 1);
    strictEqual(data.bar, undefined);
});

test("data parent field is assign if observable array is assign", function() {
    var viewModel = kendo.observable({
        data: [{foo: 1 }],
        dataSource: new kendo.data.DataSource({
        })
    });

    viewModel.dataSource.data(viewModel.data);

    equal(viewModel.dataSource.data().parent(), viewModel);
});

test("data parent field is assign if array is assign", function() {
    var viewModel = kendo.observable({
        data: [{foo: 1 }],
        dataSource: new kendo.data.DataSource({
            data: [1,2,3,4,5]
        })
    });

    equal(viewModel.dataSource.data().parent(), viewModel);
});

test("parents chain is correct when grouping", function() {
    var dataSource = new kendo.data.DataSource({
        data: [{ foo: 1 }],
        group: [ { field: "foo" }]
    });

    var viewModel = kendo.observable({
        dataSource: dataSource
    });

    dataSource.read();

    var flatViewItem = dataSource.flatView()[0];

    var groupItem = dataSource.view()[0];

    equal(flatViewItem.parent().parent().parent().parent(), viewModel);
    equal(groupItem.parent().parent(), viewModel);
});

test("parents chain is correct when grouping on multiple fields", function() {
    var dataSource = new kendo.data.DataSource({
        data: [{ foo: 1, bar: 2 }],
        group: [ { field: "foo" },{ field: "bar" }]
    });

    var viewModel = kendo.observable({
        dataSource: dataSource
    });

    dataSource.read();

    var flatViewItem = dataSource.flatView()[0];

    var groupItem = dataSource.view()[0];
    var nestedGroupItem = groupItem.items[0];

    equal(flatViewItem.parent().parent().parent().parent().parent().parent(), viewModel);
    equal(groupItem.parent().parent(), viewModel);
    equal(nestedGroupItem.parent().parent().parent().parent(), viewModel);
});
}());
