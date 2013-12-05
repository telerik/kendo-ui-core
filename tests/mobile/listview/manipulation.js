(function() {
    var ListView = kendo.mobile.ui.ListView,
    Button = kendo.mobile.ui.Button,
    listView,
    application;

    module("mobile listview manipulation", {
        setup: function() {
            listView = new ListView("<ul />");
        },

        teardown: function() {
            listView.destroy();
        }
    });

    test("append adds an item", 2, function() {
        listView.append([1]);
        var items = listView.element.children();
        equal(items.length, 1);
        equal($(items[0]).html(), "1");
    });

    test("append returns the resulting DOM elements", 1, function() {
        equal($(listView.append([1])[0]).html(), "1");
    });

    test("appended items are enhanced", 1, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "<a>#: data#</a>" });
        var item = $(listView.append([1])[0]);
        ok(item.children().hasClass("km-listview-link"));
    });

    test("appended items init widgets in the template", 1, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "<span><a data-role='button' href='\\#'>#: data#</a></span>" });
        var item = $(listView.append([1])[0]).find("a");
        ok(item.data("kendoMobileButton"));
    });

    test("prepend adds an item", 3, function() {
        listView.append([2]);
        listView.prepend([1]);
        var items = listView.element.children();
        equal(items.length, 2);
        equal($(items[0]).html(), "1");
        equal($(items[1]).html(), "2");
    });

    test("findByDataItem returns the respective items", 2, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "#: data.value #" });
        var foo = { value: 1, uid: "foo" },
        bar = { value: 2, uid: "bar" };

        var item = listView.append([ foo, bar ]);

        equal(listView.findByDataItem([foo, bar])[0], item[0]);
        equal(listView.findByDataItem([foo, bar])[1], item[1]);
    });

    test("remove removes the DOM elements for the given items", 2, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "#: data.value #" });
        var foo = { value: 1, uid: "foo" },
        bar = { value: 2, uid: "bar" };

        listView.append([ foo, bar ]);

        listView.remove([ foo ]);

        equal(listView.element.children().length, 1);
        equal(listView.element.children().html(), "2");
    });

    test("replace replaces the current items", 2, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "#: data.value #" });
        var foo = { value: 1, uid: "foo" },
        bar = { value: 2, uid: "bar" };

        listView.append([ foo ]);

        listView.replace([ bar ]);

        equal(listView.element.children().length, 1);
        equal(listView.element.children().html(), "2");
    });

    test("grouped replace renders grouped items", 3, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "#: data.value #" });
        var foo = { value: "foo", uid: "foo" },
        bar = { value: "bar", uid: "bar" },
        view = { value: "A", items: [foo, bar] };

        listView.replaceGrouped([view]);

        var subList = listView.element.find("li>ul");

        equal(subList.find("li").length, 2);
        equal(subList.find("li").eq(0).text(), "foo");
        equal(subList.find("li").eq(1).text(), "bar");
    });

    test("setDataItem re-renders the item template", 1, function() {
        listView.destroy();
        listView = new ListView("<ul />", { template: "#: data.value #" });
        var dataItem = { value: 1, uid: "foo" };

        var item = listView.append([ dataItem ]);

        dataItem.value = 2;
        listView.setDataItem(item, dataItem);

        equal(listView.element.children().html(), "2");
    });

})();
