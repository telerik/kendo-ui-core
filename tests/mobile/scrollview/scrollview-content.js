(function() {
    var ElasticPane = kendo.mobile.ui.ScrollViewElasticPane;
    var ScrollViewContent = kendo.mobile.ui.ScrollViewContent;

    var LEFT_SWIPE = -1,
        NUDGE = 0,
        RIGHT_SWIPE = 1;

    var element,
        content,
        container;

    module("ScrollView Content", { setup: function () {

    }});

    test("calculates pageCount correctly", 1, function() {
        element = $("<div style='width: 500px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        content = new ScrollViewContent(element, new ElasticPane(element), {});

        content.resizeTo({ width: 200 });
        equal(content.pageCount, 3);
    });

    test("resizes container and data-role=page elements as expected", 2, function() {
        element = $("<div style='position: absolute;'><div data-role=page style='display: inline-block'></div><div data-role=page style='display: inline-block'></div></div>").appendTo("#qunit-fixture").wrap("<div/>");

        content = new ScrollViewContent(element, new ElasticPane(element), {});

        content.resizeTo({ width: 200 });
        equal(content.element.width(), 400);
        equal(content.element.find("[data-role=page]").eq(0).width(), 200);
    });

    test("scrolls to provided page, offseting the pane to the correct value", 3, function() {
        element = $("<div style='width: 500px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        var pane = new ElasticPane(element);
        content = new ScrollViewContent(element, pane, {});

        equal(content.page, 0);

        content.scrollTo(1, true);

        equal(content.page, 1);
        equal(pane.offset(), 200);
    });

    test("re-calculates current page on pane resize", 2, function() {
        element = $("<div style='width: 500px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        var pane = new ElasticPane(element);
        content = new ScrollViewContent(element, pane, {});

        equal(content.page, 0);
        content.scrollTo(1, true);

        content.resizeTo({ width: 100 });
        equal(content.page, 2);
    });

    test("retains current page on pane resize if data-role page elements are present", 2, function() {
        element = $("<div style='position: absolute;'><div data-role=page style='display: inline-block'></div><div data-role=page style='display: inline-block'></div></div>").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        var pane = new ElasticPane(element);
        content = new ScrollViewContent(element, pane, {});

        equal(content.page, 0);
        content.scrollTo(1, true);

        content.resizeTo({ width: 100 });
        equal(content.page, 1);
    });

    test("scrolls to the current page on resize", 1, function() {
        element = $("<div style='position: absolute;'><div data-role=page style='display: inline-block'></div><div data-role=page style='display: inline-block'></div></div>").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        var pane = new ElasticPane(element);
        content = new ScrollViewContent(element, pane, {});
        content.page = 1;
        content.resizeTo({ width: 200 });

        equal(pane.offset(), 200);
    });

    test("re-adjusts offset on resize if pages present", 1, function() {
        element = $("<div style='position: absolute;'><div data-role=page style='display: inline-block'></div><div data-role=page style='display: inline-block'></div></div>").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");

        var pane = new ElasticPane(element);
        content = new ScrollViewContent(element, pane, {});
        content.page = 1;
        content.resizeTo({ width: 200 });

        element.parent().width(100);
        pane.refresh();
        content.resizeTo({ width: 100 });

        equal(pane.offset(), 100);
    });

    var pane, content;

    module("ScrollView Content dragging", {
        setup: function () {
            element = $("<div style='position: absolute;'><div data-role=page style='display: inline-block'></div><div data-role=page style='display: inline-block'></div></div>").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");
            pane = new ElasticPane(element);
            content = new ScrollViewContent(element, pane, {});
            content.resizeTo({ width: 200 });
        }
    });

    test("small drag snaps the content back to the current page", 2, function() {
        pane.moveTo(50);
        content.paneMoved(NUDGE, false, $.noop, true);

        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

    test("swift drag moves the content to the next page", 2, function() {
        pane.moveTo(50);
        content.paneMoved(LEFT_SWIPE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 200);
    });

    test("preventing default reverts back to the previous page", 2, function() {
        pane.moveTo(50);
        var preventDefaultCallback = function() { return true; };

        content.paneMoved(LEFT_SWIPE, false, preventDefaultCallback, true);

        content.updatePage();
        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

    test("swift right drag moves the content to the previous page", 2, function() {
        content.scrollTo(1, true);
        pane.moveTo(150);
        content.paneMoved(RIGHT_SWIPE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

    test("long drag snaps the content to the next page", 2, function() {
        pane.moveTo(150);
        content.paneMoved(NUDGE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 200);
    });

    test("drag left side of the boundaries snaps the content to the next page", 2, function() {
        pane.moveTo(-150);
        content.paneMoved(NUDGE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

    test("drag right side of the boundaries snaps the content to the next page", 2, function() {
        pane.moveTo(300);
        content.paneMoved(NUDGE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 200);
    });
})();
