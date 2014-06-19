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

    test("supports binding", 2, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "1");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "2");
    });

    test("binds contents", 2, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });
        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "1");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "2");
    });

    test("supports value binding", 2, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds, value: selectedItem" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        var ds = new kendo.data.DataSource({
            data: [
                { foo: 1 },
                { foo: 2 },
                { foo: 3 },
                { foo: 4 }
            ]
        });


        window.scrollViewViewModel = kendo.observable({
            ds: ds,
            selectedItem: function() {
                return this.get("ds").at(2);
            }
        });

        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "3");
        equal($("#scrollview").data("kendoMobileScrollView").value(), ds.at(2));
    });

    test("rebinds to a new DataSource", 3, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        var widget = $("#scrollview").data("kendoMobileScrollView");
        var oldDataSource = widget.dataSource;

        var newDataSource = new kendo.data.DataSource({
            data: [ {foo: 3}, {foo: 4} ]
        });

        window.scrollViewViewModel.set("ds", newDataSource);

        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "3");
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(2).text(), "4");

        // oldDataSource.data([{foo: 5}, { foo: 6 }]);
        equal($("#scrollview").data("kendoMobileScrollView").items().eq(1).text(), "3");
    });

    test("binds with MVVM and initial content", 3, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-tmp"><div>foo</div></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);

        equal($("#scrollview").data("kendoMobileScrollView").items().length, 0);
        equal($("#scrollview").children().text(), "foo");
        ok($("#scrollview").data("kendoMobileScrollView")._content instanceof kendo.mobile.ui.ScrollViewContent);
    });

    test("pager gets updated when the dataSource changes", 1, function() {
        var appContent = $('<div><div data-role="view" data-model="scrollViewViewModel"> <div id="scrollview" data-role="scrollview" data-bind="source: ds" data-template="scrollview-mvvm-tmp"></div> </div></div>').appendTo(QUnit.fixture);

        window.scrollViewViewModel = kendo.observable({
            ds: [{foo: 1}, {foo: 2}]
        });

        var app = new kendo.mobile.Application(appContent);
        var widget = $("#scrollview").data("kendoMobileScrollView");

        scrollViewViewModel.ds.push({foo: 3});

        equal(widget.pager.element.children().length, scrollViewViewModel.ds.length, "Pager is refreshed on ds change");
    });

})();
