(function() {
    var Page = kendo.mobile.ui.VirtualPage;

    var element,
        page,
        LEFT_PAGE = -1,
        CENTER_PAGE = 0,
        RIGHT_PAGE = 1;

    module("ScrollView VirtualPage", {
        setup: function() {
            element = $("<div style='width: 400px;'></div>");
            page = new Page(element);
        }
    });

    function transformOffset(element) {
        style = element[0].style;
        return (style.transform || style.webkitTransform).split(/\(|,/)[1];
    }

    test("page resizes to the width of its parent container", 2, function() {
        equal(page.width, 400);
        equal(page.element.width(), 400);
    });

    test("page is positioned correctly", 3, function() {
        page.position(LEFT_PAGE);
        equal(transformOffset(page.element), "-400px");

        page.position(CENTER_PAGE);
        equal(transformOffset(page.element), "0px");

        page.position(RIGHT_PAGE);
        equal(transformOffset(page.element), "400px");
    });

    test("page width is set correctly", 3, function() {
        equal(page.width, 400);

        page.setWidth(300);
        equal(page.width, 300);
        equal(page.element.width(), 300);
    });
})();
