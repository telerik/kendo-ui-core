(function() {
    module('scrollview mvvm', {
        setup: function() {
            QUnit.fixture.append('<script id="scrollview-tmp" type="text/x-kendo-template"><div>#:foo#</div></scr' + 'ipt>');
            QUnit.fixture.append('<script id="scrollview-mvvm-tmp" type="text/x-kendo-template"><div data-bind="text: foo"></div></scr' + 'ipt>');
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("ScrollView binds with MVVM", 2, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "1");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "2");
    });

    test("ScrollView binds contents", 2, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });
        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "1");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "2");
    });

    test("ScrollView rebinds to a new DataSource", 3, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        var widget = $("#scrollview").data("kendoMobileScrollView");
        var oldDataSource = widget.dataSource;
        oldDataSource.bind("change", function() {
            console.log("change");
        });

        var newDataSource = new kendo.data.DataSource({
            data: [ {foo: 3}, {foo: 4} ]
        });

        window.scrollViewViewModel.set("ds", newDataSource);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "3");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "4");

        // oldDataSource.data([{foo: 5}, { foo: 6 }]);
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "3");
    });

    test("ScrollView binds with MVVM and initial content", 3, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-tmp"><div>foo</div></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().length, 0);
        equal($("#scrollview").children().text(), "foo");
        ok($("#scrollview").data("kendoMobileScrollView")._content instanceof kendo.mobile.ui.ScrollViewContent);
    });

})();
