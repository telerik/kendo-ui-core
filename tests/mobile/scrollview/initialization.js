(function() {
    module("scrollview utils")

    test("items returns the current items", function() {
        var div = $("<div />");

        var scrollview = new kendo.mobile.ui.ScrollView(div, {
            dataSource: [1, 2, 3, 4],
            template: "#: data #"
        });

        equal(scrollview.items().length, 3);
        scrollview.destroy();
    });

    test("does not render items beyond the last one", function() {
        var div = $("<div />");

        var scrollview = new kendo.mobile.ui.ScrollView(div, {
            dataSource: [1],
            template: "#: data #",
            emptyTemplate: "empty"
        });

        equal(scrollview.items()[2].innerHTML, "empty");
        scrollview.destroy();
    });
})();
