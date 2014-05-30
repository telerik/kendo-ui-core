(function() {
    test("ScrollView itemsContents returns the current items", function() {
        var div = $("<div />");

        var scrollview = new kendo.mobile.ui.ScrollView(div, {
            dataSource: [1, 2, 3, 4],
            template: "#: data #"
        });

        equal(scrollview.itemsContents().length, 3);
        scrollview.destroy();
    });
})();
