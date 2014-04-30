(function() {
    var ListView = kendo.mobile.ui.ListView,
        Button = kendo.mobile.ui.Button,
        dom,
        application;

    module("mobile listview integration", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("allows dragging without scroller", 1, function() {
        dom = $("<ul><li>Item</li></ul>");

        new ListView(dom);

        var item = dom.find("li");

        exception = false;
        try {
            press(item, 1, 1);
            move(item, 1, 10);
            release(item, 1, 10);
        } catch(e) {
            exception = true;
        }
        ok(!exception, "Dragging the listview caused an error");
    });
})();
