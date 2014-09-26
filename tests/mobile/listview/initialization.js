(function() {
    var ListView = kendo.mobile.ui.ListView,
        Button = kendo.mobile.ui.Button,
        dom,
        application;

    module("mobile listview", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("name is ListView", function() {
        equal(ListView.fn.options.name, "ListView", "Name is properly set");
    });

    test("applies css classes", 3, function() {
        dom = $("<ul/>");

        new ListView(dom);

        ok(dom.is(".km-listview"), "Css class is applied");
        ok(dom.is(".km-list"), "Css class is applied");
        ok(!dom.is(".km-listgroup"), "Css class is not applied");
    });

    test("applies inset css classes", 3, function() {
        dom = $("<ul/>");

        new ListView(dom, { style: "inset" });

        ok(dom.is(".km-listview"), "Css class is applied");
        ok(dom.is(".km-list"), "Css class is applied");
        ok(dom.is(".km-listinset"), "Css class is applied");
    });

    test("applies group css classes", 3, function() {
        dom = $("<ul/>");

        new ListView(dom, { type: "group" });

        ok(dom.is(".km-listview"), "Css class is applied");
        ok(dom.is(".km-listgroup"), "Css class is applied");
        ok(!dom.is(".km-list"), "Css class is not applied");
    });

    test("applies group and inset css classes", 4, function() {
        dom = $("<ul/>");

        new ListView(dom, { type: "group", style: "inset" });

        ok(dom.is(".km-listview"), "Css class is applied");
        ok(dom.is(".km-listgroupinset"), "Css class not applied");
        ok(!dom.is(".km-listgroup"), "Css class is not applied");
        ok(!dom.is(".km-list"), "Css class is not applied");
    });

    test("applies css class to child lists when grouped", 1, function() {
        dom = $("<ul><li><ul/></li></ul>");

        new ListView(dom, { type: "group" });

        ok(dom.find("ul").is(".km-list"), "Css class is applied");
    });

    test("applies CSS class to link items", 4, function() {
        dom = $('<ul> \
            <li><a id="foo" href="foo">Foo</a></li> \
            <li> <a id="foo2" href="foo">Foo</a> </li> \
            <li>Bar <a id="bar" href="bar">Bar</a></li> \
            <li><a id="baz" href="foo">Foo</a><a data-role="detailbutton"></a></li> \
        </ul>');

    new ListView(dom);

    ok(dom.find("#foo").is(".km-listview-link"), "link item has correct CSS class");
    ok(dom.find("#foo2").is(".km-listview-link"), "link item with whitespace has correct CSS class");
    ok(dom.find("#baz").is(".km-listview-link"), "link item has correct CSS class");
    ok(!dom.find("#bar").is(".km-listview-link"), "mixed item does not receive CSS class");
    });

    test("if no links and checkboxes, data-icon should enhance the item", 1, function() {
        dom = $('<ul> \
            <li data-icon="globe" id="foo">Test</li> \
        </ul>');

    new ListView(dom);

    ok(dom.find("#foo > span.km-icon").hasClass("km-globe"), "item receives icon span and km-iconName on it");
    });

    test("toggles item as pressed on press/release", 2, function() {
        dom = $('<ul> \
            <li><a id="foo" href="foo">Foo</a></li> \
        </ul>');
    var foo = dom.find("#foo");

    new ListView(dom);

    foo.trigger(kendo.support.mousedown);

    ok(foo.parent().is(".km-state-active"), "list item is marked as active");

    foo.trigger(kendo.support.mouseup);
    ok(!foo.parent().is(".km-state-active"), "list item is unmarked");
    });

    test("toggles item with detail button as pressed on press/release", 2, function() {
        dom = $('<ul><li><a id="foo" href="foo">Foo</a><a data-role="detailbutton" data-style="detaildisclose"></a></li></ul>');
        var foo = dom.find("#foo");

        new ListView(dom);

        foo.trigger(kendo.support.mousedown);

        ok(foo.parent().is(".km-state-active"), "list item is marked as active");

        foo.trigger(kendo.support.mouseup);
        ok(!foo.parent().is(".km-state-active"), "list item is unmarked");
    });

    test("does not activate pushed state for non-link items", 1, function() {
        dom = $('<ul><li>Foo</li></ul>');
        var item = dom.find("li");

        new ListView(dom);

        item.trigger(kendo.support.mousedown);
        ok(!item.is(".km-state-active"), "list item is not marked as active");
    });

    test("does not activate pushed state for buttons", 1, function() {
        dom = $('<ul><li>Foo <a data-role="button" href="#">Foo</a></li></ul>');
        var item = dom.find("li");

        new ListView(dom);

        item.find("[data-role=button]").trigger(kendo.support.mousedown);
        ok(!item.is(".km-state-active"), "list item is not marked as active");
    });

    test("handles contents' click events", 2, function() {
        dom = $('<ul><li><a href="#">Foo</a></li></ul>');
        var link = dom.find("li>a");

        var listView = new ListView(dom);

        listView.bind("click", function(e) {
            equal(e.target[0], link[0], "event passes the clicked dom element");
            equal(e.item[0], link.parent()[0], "event passes the current item");
        });

        link.trigger(kendo.support.mousedown);
        link.trigger("mouseup");
    });

    test("handles contents' click events in grouped mode", 1, function() {
        dom = $('<ul><li>Foo <ul><li>Bar</li></ul> </li></ul>');
        var item = dom.find("li li");

        var listView = new ListView(dom, {type: "group"} );

        listView.bind("click", function(e) {
            equal(e.item[0], item[0], "event passes the current item");
        });

        item.trigger("mousedown");
        item.trigger("mouseup");
    });


    test("Allows event cancelation", 1, function() {
        dom = $('<ul><li><a href="#">Foo</a></li></ul>');
        var link = dom.find("li>a");

        var listView = new ListView(dom);

        listView.bind("click", function(e) {
            e.preventDefault();
        });

        dom.bind("mouseup", function(e) {
            ok(e.isDefaultPrevented());
        });

        link.trigger("mousedown");
        link.trigger("mouseup");
    });

    test("passes button if a button is clicked", 1, function() {
        dom = $('<ul><li>Foo<a href="#">Foo</a></li></ul>');
        var link = dom.find("li>a"),
            listView = new ListView(dom),
            button = new Button(link);


        listView.bind("click", function(e) {
            equal(e.button, button, "event passes the clicked button");
        });

        link.trigger(kendo.support.mousedown);
        link.trigger(kendo.support.mouseup);
    });

    test("wraps group headers", 1, function() {
        dom = $('<ul data-role="listview" data-type="group">\
            <li>Foo<ul><li>Bar</li><li>Baz</li></ul></li>\
        </ul>');

    kendo.mobile.init(dom);
    ok(dom.find("li").contents().first().is("div.km-group-title"), "Header is wrapped correctly");
    });

    test("Does not wrap groups if headers missing", 1, function() {
        dom = $('<ul data-role="listview" data-type="group">\
            <li><ul><li>Bar</li><li>Baz</li></ul></li>\
        </ul>');
    kendo.mobile.init(dom);
    ok(!dom.find("li").contents().first().is("div.km-group-title"), "Groups are skipped");
    });

    test("Does not wrap groups if markup is present", 2, function() {
        dom = $('<ul data-type="group">\
            <li><div class="km-group-title">Foo</div><ul><li>Bar</li><li>Baz</li></ul></li>\
        </ul>');
    var listView = new ListView(dom);
    ok(dom.find("li").contents().first().is("div.km-group-title"), "Header is wrapped");
    ok(!dom.find("li>div.km-group-title").contents().first().is("div.km-group-title"), "No bogus element is present");
    });

    test("items returns list items", function() {
        dom = $('<ul><li><a href="#">Foo</a></li></ul>');

        var listView = new ListView(dom);

        equal(listView.items()[0], dom.children("li")[0]);
    });

    test("items returns list items in group type", 1, function() {
        dom = $('<ul>\
            <li>Foo<ul><li>Bar</li><li>Baz</li></ul></li>\
        </ul>');

        var listView = new ListView(dom, { type: "group" });

        equal(listView.items()[0], dom.find("ul > li")[0]);
    });

    test("ListView renders button at the bottom of the widget", 4, function() {
        dom = $('<ul><li>Foo<ul><li>Bar</li><li>Baz</li></ul></li></ul>'),
        wrapper = dom.wrap("<div />").parent(),
        scroller = new kendo.mobile.ui.Scroller(wrapper),
        listView = new ListView(dom, { loadMore: true, messages: { loadMoreText: "Press to load more..." }, dataSource: new kendo.data.DataSource({ data: [ "foo", "bar", "baz" ], pageSize: 10 }) });

        var footer = listView.wrapper.find(".km-load-more").eq(0);

        ok(footer[0]);
        ok(footer.find(".km-load")[0]);
        equal(footer.find(".km-load").text(), "Press to load more...");
        ok(footer.find(".km-icon")[0]);
        scroller.destroy();
    });

    test("ListView renders default text for the load-more button", 2, function() {
        dom = $('<ul><li>Foo<ul><li>Bar</li><li>Baz</li></ul></li></ul>');
        var wrapper = dom.wrap("<div />").parent(),
        scroller = new kendo.mobile.ui.Scroller(wrapper),
        listView = new ListView(dom, { loadMore: true, dataSource: new kendo.data.DataSource({ data: [ "foo", "bar", "baz" ], pageSize: 10 }) });

        var footer = listView.wrapper.find(".km-load-more").eq(0);

        ok(footer.find(".km-load")[0]);
        equal(footer.find(".km-load").text(), "Press to load more");
        scroller.destroy();
    });

    test("Nested ListView does not remove inset style of the content", 1, function() {
        var root = $("<div />").append("<div data-role='view'><ul data-role='listview' data-style='inset'><ul data-role='listview'></ul></ul></div>");
        $("#qunit-fixture").append(root);
        application = new kendo.mobile.Application(root);

        var content = application.pane.view().content;

        ok(content.hasClass("km-insetcontent"));
        application.destroy()
    });

    test("removes wrapper on destroy", 1, function() {
        dom = $("<div><ul/></div>");
        var listView = new ListView(dom.find("ul"));
        listView.destroy();
        ok(dom.children().is("ul"));
    });
})();
