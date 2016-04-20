(function() {
    var ListView = kendo.mobile.ui.ListView, listView;

    module("mobile listview", {
        setup: function() {

        },
        teardown: function() {
            if (listView) {
                listView.destroy();
            }
        }
    });

    test("binds to flat datasource", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [1, 2]
        });

        equal(dom.children().length, 2);
    });


    test("destroy unbinds from datasource events", function() {
        var dom = $("<ul/>"),
            ds = new kendo.data.DataSource({ data: [1, 2]});

        listView = new ListView(dom, {
            dataSource: ds
        });

        listView.destroy();
        ds.add(3);

        equal(dom.children().length, 2);
        listView = null;
    });

    test("binds to datasource referenced by data attribute", function() {
        var dom = $('<ul data-role="listview" data-source="foo" />');

        window.foo =  [1, 2];

        kendo.mobile.init(dom);
        listView = dom.data('kendoMobileListView');

        equal(dom.children().length, 2);
    });


    test("default template expects string as data item", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [1, 2]
        });

        equal(dom.children().first().text(), "1");
    });

    test("uses custom template", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" } ],
            template: "#= text #"
        });

        equal(dom.children().first().text(), "foo");
    });

    test("anchor with data-icon in template renders an icon", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" } ],
            template: "<a data-icon='home'>#= text #</a>"
        });

        ok(dom.children().first().children(".km-listview-link").has(".km-icon.km-home"));
    });

    test("other element with data-icon in template renders an icon", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" } ],
            template: "<span data-icon='home'>#= text #</span>"
        });

        ok(dom.children().first().has(".km-icon.km-home"));
    });

    test("template with icons renders only one icon", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" } ],
            template: "<span data-icon='home'>#= text #</span><span data-icon='favorites'>#= text #</span>"
        });

        ok(dom.children().first().children(".km-icon.km-home").length == 1);
    });

    test("does not rebind when item in the datasource changes", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }, { text: "bar" } ],
            template: "#= text #"
        });

        var last = dom.find("li:last")[0];

        listView.dataSource.data()[0].set("text", "baz");

        equal(last, dom.find("li:last")[0]);
    });

    test("refreshes the corresponding list item when item in the datasource changes", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }, { text: "bar" } ],
            template: "#= text #"
        });

        listView.dataSource.data()[0].set("text", "baz");

        equal(dom.find("li:first").text(), "baz");
    });

    test("adding item does not rebind the whole widget", 2, function() {
        var dom = $("<ul/>"),
        dataSource = new kendo.data.DataSource({ data: [ { text: "foo" },  ] });

        listView = new ListView(dom, {
            dataSource: dataSource,
            template: "#= text #"
        });

        var originalItem = dom.children()[0];

        dataSource.add({ text: "bar" });
        equal(dom.children().length, 2);
        equal(dom.children()[0], originalItem);
    });

    test("removing item does not rebind the whole widget", 2, function() {
        var dom = $("<ul/>"),
        dataSource = new kendo.data.DataSource({ data: [ { text: "foo" }, { text: "bar" } ] });

        listView = new ListView(dom, {
            dataSource: dataSource,
            template: "#= text #"
        });

        var originalItem = dom.children()[1];

        dataSource.remove(dataSource.at(0));
        equal(dom.children().length, 1);
        equal(dom.children()[0], originalItem);
    });

    test("default template escapes html entities", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: ["<i>"]
        });

        equal(dom.children().first().html(), "&lt;i&gt;");
    });

    test("custom template as function", function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }],
            template: function(data) {
                return data.text;
            }
        });

        equal(dom.children().first().html(), "foo");
    });

    test("calls mobile.init on refresh", function() {
        var dom = $("<ul/>"),
        originInit = kendo.mobile.init;

        stub(kendo.mobile, {
            init: originInit
        });

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }, { text: "bar" } ],
            template: "#= text #"
        });

        equal(kendo.mobile.calls("init"), 1);

        kendo.mobile.init = originInit;
    });

    test("instantiates widgets in added items", 2, function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }],
            template: "<span><a data-role='button'>#= text #</a></span>"
        });

        ok(listView.element.find('span a').data('kendoMobileButton'));

        listView.dataSource.add({ text: "bar" });
        var newA = $(listView.element.find('span a')[1]);
        ok(newA.data('kendoMobileButton'));
    });

    test("unshifting datasource updates the listview as expected", 2, function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [1, 2]
        });

        listView.dataSource.data().unshift(3);

        equal(dom.children('li').length, 3);
        equal(dom.children().eq(0).html(), "3");
    });

    test("splicing datasource updates the listview as expected", 2, function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [1, 2]
        });

        listView.dataSource.data().splice(1, 0, 3);

        equal(dom.children('li').length, 3);
        equal(dom.children().eq(1).html(), "3");
    });

    test("pushing in the datasource updates the listview as expected", 2, function() {
        var dom = $("<ul/>");

        listView = new ListView(dom, {
            dataSource: [1, 2]
        });

        listView.dataSource.data().push(3);

        equal(dom.children('li').length, 3);
        equal(dom.children().eq(2).html(), "3");
    });

    test("ListView does not init elements twice", function() {
        var dom = $("<ul/>"),
        originInit = kendo.initWidget;

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }, { text: "bar" } ],
            appendOnRefresh: true,
            template: "#= text #"
        });

        stub(kendo, {
            initWidget: originInit
        });

        listView.dataSource.data([ { text: "baz" } ]);

        equal(kendo.calls("initWidget"), 1);

        kendo.initWidget = originInit;
    });

    test("append on refresh prepends items", function() {
        var dom = $("<ul/>"),
        originInit = kendo.initWidget;

        listView = new ListView(dom, {
            dataSource: [ { text: "foo" }, { text: "bar" } ],
            appendOnRefresh: true,
            template: "#= text #"
        });

        stub(kendo, {
            initWidget: originInit
        });

        listView.dataSource.data([ { text: "baz" } ]);

        equal(listView.element.children().length, 3);

        equal($(listView.element.children()[0]).html(), 'baz');

        kendo.initWidget = originInit;
    });

    var dom, dataSource, listView, subList, data;

    module("grouped datasource", {
        setup: function() {
            data = [{foo: "Foo", bar: "Bar"}, {foo: "Foo", bar: "Baz"}];
            dom = $("<ul/>");

            dataSource = new kendo.data.DataSource({data: data, group: {field: "foo"}});
            listView = new ListView(dom, {dataSource: dataSource, template: "${bar}", headerTemplate: "<i>${value}</i>"});
            subList = dom.find("li>ul");
        },

        teardown: function() {
            listView.destroy();
        }
    });

    test("detects grouped datasource", 1, function() {
        equal(listView.options.type, "group");
    });

    test("styles root element correctly", 1, function() {
        ok(!dom.is(".km-list"));
    });

    test("adds new items to the correct group", 1, function() {
        dataSource.add({foo: "Foo", bar: "Qux"});

        var groups = dom.children('li');

        equal(groups.length, 1);
    });

    test("adding new items makes a new group", 1, function() {
        dataSource.add({foo: "Baz", bar: "Foo"});

        var groups = dom.children('li');

        equal(groups.length, 2);
    });

    test("removing the last item from a group removes the group", 2, function() {
        dataSource.add({foo: "Baz", bar: "Foo"});
        var item = dataSource.data()[2];
        equal(dom.children('li').length, 2);
        dataSource.data().remove(item);
        equal(dom.children('li').length, 1);
    });

    test("uses group values for headers", function() {
        equal(dom.find("li").contents().eq(0).text(), "Foo");
    });

    test("creates sublists", function() {
        equal(subList.length, 1, "sublist is created");
        ok(subList.is(".km-list"), "sublist class is applied");
    });

    test("populates sublists with items", function() {
        equal(subList.find("li").length, 2);
        equal(subList.find("li").eq(0).text(), "Bar");
        equal(subList.find("li").eq(1).text(), "Baz");
    });

    test("renders data-uid attribute for sublist items", function() {
        equal(subList.find("li").data("uid"), listView.dataSource.view()[0].items[0].uid);
    });

    test("accepts custom header template", function() {
        ok(dom.find("li > div > div").eq(0).children(0).is("i"), "item has custom header");
    });

    test("accepts function as a custom header template", function() {
        dom = $("<ul/>");
        var myListView = new ListView(dom, {dataSource: dataSource, template: "${bar}", headerTemplate: function(data) { return "<i>" + data + "</i>" }});
        ok(dom.find("li > div > div").eq(0).children(0).is("i"), "item has custom header");
        myListView.destroy();
    });

    test("data-uid attribute is rendered for each row when model is defined", function() {
        dom = $("<ul/>");

        var myListView = new ListView(dom, {
            dataSource: {data: [{foo: "bar"}]}
        });

        equal(dom.find("li").data("uid"), myListView.dataSource.view()[0].uid);
        myListView.destroy();
    });

    test("databound item passes the dataitem in the event when clicked", 1, function() {
        var model = {foo: "bar"},
        link,
        dataSource = { data: [model]};

        dom = $("<ul/>");

        var myListView = new ListView(dom, {dataSource: dataSource});

        myListView.bind("click", function(e) {
            equal(e.dataItem.foo, model.foo, "event passes the model as data item");
            myListView.destroy();
        });

        tap(dom.find("li"));
    });

    test("resetting the dataSource detaches the previous events", function() {
        dom = $("<ul/>");

        var myListView = new ListView(dom, {dataSource: dataSource});

        var dataSource = myListView.dataSource;

        myListView.setDataSource(new kendo.data.DataSource({ data:[{text: 1, value: 1}, {text:2, value:2}] }));

        myListView.bind("dataBound", function() {
            ok(false, "Change event is not detached");
        });

        dataSource.read();

        notStrictEqual(myListView.dataSource, dataSource);
        myListView.destroy();
    });

    test("resetting DataSource rebinds the widget", function() {
        dom = $("<ul/>");

        myListView = new ListView(dom, {dataSource: dataSource});

        myListView.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}]
        }));

        equal(dom.find("li").length, 2);
        myListView.destroy();
    });

    test("clearing groups does not throw error", function() {
        dom = $("<ul/>");

        var myListView = new ListView(dom, {dataSource: dataSource});

        myListView.dataSource.query({});

        ok(true);
        myListView.destroy();
    });

    var application, root;

    module("pull to refresh", {
        setup: function() {
            location.hash = '';
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
            $("#qunit-fixture").css("height", "100px");
        },

        teardown: function() {
            $.mockjax.clear();
            kendo.destroy(root);
            kendo.history.stop();
        }
    });

    function setup(html, options) {
        root = $("<div />").append(html);
        $("#qunit-fixture").html(root);
        application = new kendo.mobile.Application(root, options);
    }

    asyncTest("refreshes on pull if configured", 2, function(){
        $.mockjax({ url: "foo.json", responseText: ["foo", "bar"] });
        var ds = kendo.data.DataSource.create({ transport: { read: { url: "foo.json", dataType: "json" } } });
        var listview;

        window.initListView = function(e) {
            listview = e.view.element.find("#listview");
            listview.kendoMobileListView({
                dataSource: ds,
                pullToRefresh: true
            });
        };

        setup('<div data-role="view" data-init="initListView"><div id="listview" style="height:300px"></div></div>');

        $.mockjax.clear();
        $.mockjax({ url: "foo.json", responseText: ["foo", "bar", "baz"] });

        function secondAssert() {
            start();
            equal(listview.children().length, 3);
        }

        function firstAssert() {
            equal(listview.children().length, 2);
            ds.unbind("change", firstAssert);
            ds.bind("change", secondAssert);

            application.scroller().trigger("pull");
        }

        ds.bind("change", firstAssert);
    });

    asyncTest("Pull to refresh always sends page number 1", 1, function(){
        $.mockjax({ url: "foo.json", responseText: ["foo", "bar"] });

        var listview;
        var ds = kendo.data.DataSource.create({
            transport: {
                read: { url: "foo.json", dataType: "json" },
                parameterMap: function(options) {
                    //first time DS does not send page number
                    if (options.page !== undefined) {
                        equal(options.page, 1);
                    }
                }
            },
            serverPaging: true
        });

        window.initListView = function(e) {
            listview = e.view.element.find("#listview");
            listview.kendoMobileListView({
                dataSource: ds,
                pullToRefresh: true
            });
        };

        setup('<div data-role="view" data-init="initListView"><div id="listview" style="height:300px"></div></div>');
        var scroller = application.scroller();

        $.mockjax.clear();
        $.mockjax({ url: "foo.json", responseText: ["foo", "bar", "baz"] });

        function firstAssert() {
            $.mockjax.clear();
            scroller.trigger("pull");
            start();
        }

        ds.bind("change", firstAssert);
    });

    test("Pull to refresh calls pull to refresh callback", 1, function(){
        var listview;
        window.initListView = function(e) {
            listview = e.view.element.find("#listview");
            listview.kendoMobileListView({
                dataSource: [],
                pullToRefresh: true,
                pullParameters: function() {
                    ok(true);
                }
            });
        };

        setup('<div data-role="view" data-init="initListView"><div id="listview" style="height:300px"></div></div>');
        application.scroller().trigger("pull");
    });

    asyncTest("Pull to refresh passes first item to the callback", 2, function(){
        $.mockjax({ url: "foo.json", responseText: ["foo", "bar"] });

        var listview,
        calls = 1;

        var ds = kendo.data.DataSource.create({
            transport: {
                read: { url: "foo.json", dataType: "json" },
                parameterMap: function(options) {
                    //first time DS does not send page number
                    if (options.page !== undefined) {
                        equal(options.page, 1);
                    }
                }
            },
            serverPaging: true
        });

        window.initListView = function(e) {
            listview = e.view.element.find("#listview");
            listview.kendoMobileListView({
                dataSource: ds,
                pullToRefresh: true,
                pullParameters: function(item) {
                    if (calls === 1) {
                        equal(item, "foo");
                        calls ++;
                    } else {
                        equal(item, "foo1");
                        $.mockjax.clear();
                        start();
                    }
                }
            });
        };

        setup('<div data-role="view" data-init="initListView"><div id="listview" style="height:300px"></div></div>');
        var scroller = application.scroller();

        $.mockjax.clear();
        $.mockjax({ url: "foo.json", responseText: ["foo1"] });

        ds.bind("change", function() {
            scroller.trigger("pull");
        });
    });
})();
