(function() {
    function transformOffset(element) {
        style = element[0].style;
        return (style.transform || style.webkitTransform).split(/\(|,/)[1];
    }

    var ElasticPane = kendo.mobile.ui.ScrollViewElasticPane,
        Page = kendo.mobile.ui.VirtualPage,
        BatchBuffer = kendo.data.BatchBuffer,
        Buffer = kendo.data.Buffer,
        VirtualScrollViewContent = kendo.mobile.ui.VirtualScrollViewContent,

        LEFT_SWIPE = -1,
        NUDGE = 0,
        RIGHT_SWIPE = 1;

    var content,
        element,
        pane;

    module("VirtualScrollView content", {
        setup: function() {

            var dataSourceConfig = {
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i ++) {
                            results.push({ foo: i });
                        }

                        options.success(results);
                    }
                },
                pageSize: 36,
                serverPaging: true,
                schema: {
                    total: function() { return 100000; }
                }
            };

            var options = {
                autoBind: true,
                template: "<div class='foo'>#: foo #</div>",
                emptyTemplate: "<div>empty</div>"
            };

            element = $("<div style='width: 400px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 400px;' />");
            content = new VirtualScrollViewContent(element, new ElasticPane(element), options);
            content.setDataSource(dataSourceConfig);
            content.dataSource.fetch();
        }
    });

    test("initializes pages correctly", 2, function() {
        equal(content.pages.length, 3);
        equal(content.element.find("div.km-virtual-page").length, 3);
    });

    test("positions pages correctly after refresh", 3, function() {
        var pages = content.pages;

        equal(transformOffset(pages[0].element), "-400px");
        equal(transformOffset(pages[1].element), "0px");
        equal(transformOffset(pages[2].element), "400px");
    });

    test("re-calculates the pages width on pane resize", 2, function() {
        element = $("<div style='width: 500px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 200px;' />");
        pane = new ElasticPane(element);
        content = new VirtualScrollViewContent(element, pane, { template: "", emptyTemplate: "" });

        equal(content.pages[0].element.width(), 200);

        content.resizeTo({width: 300, height: 300 });
        equal(content.pages[0].element.width(), 300);
    });

    test("creates buffer correctly", 2, function() {
        var content = new VirtualScrollViewContent(element, new ElasticPane(element), { itemsPerPage: 1, template: "", emptyTemplate: "" });
        content.setDataSource();
        ok(content.buffer instanceof kendo.data.Buffer);

        content = new VirtualScrollViewContent(element, new ElasticPane(element), { itemsPerPage: 6, template: "", emptyTemplate: "" });
        content.setDataSource();
        ok(content.buffer instanceof BatchBuffer);
    });

    test("sets the content correctly", 4, function() {
        var page = content.pages[0];

        content.setPageContent(page, 0);
        equal(page.element.children().length, 1);
        equal(page.element.find(">div").text(), "0");

        content.setPageContent(page, 3);
        equal(page.element.children().length, 1);
        equal(page.element.find(">div").text(), "3");
    });

    test("sets the empty content correctly when data is not available in the buffer", 1, function() {
        var page = content.pages[0];

        content.setPageContent(page, -1); //test for non existing content
        equal(page.element.find(">div").text(), "empty");
    })

    test("scrolls to the provided page", 12, function() {
        content.scrollTo(6);

        equal(content.page, 6);
        equal(content.pages[0].element.text(), "5");
        equal(content.pages[1].element.text(), "6");
        equal(content.pages[2].element.text(), "7");

        content.scrollTo(10);

        equal(content.page, 10);
        equal(content.pages[0].element.text(), "9");
        equal(content.pages[1].element.text(), "10");
        equal(content.pages[2].element.text(), "11");

        content.scrollTo(0);

        equal(content.page, 0);
        equal(content.pages[0].element.text(), "empty");
        equal(content.pages[1].element.text(), "0");
        equal(content.pages[2].element.text(), "1");
    });

    test("pages are reset correctly", 5, function() {
        content.scrollTo(5);
        equal(content.pages[1].element.text(), "5");

        content._resetPages();
        equal(content.pages[0].element.text(), "empty");
        equal(content.pages[1].element.text(), "0");
        equal(content.pages[2].element.text(), "1");
        equal(content.page, 0);
    });

    module("VirtualScrollView content inital page", {
        setup: function() {

            var dataSourceConfig = {
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i ++) {
                            results.push({ foo: i });
                        }

                        options.success(results);
                    }
                },
                pageSize: 36,
                serverPaging: true,
                schema: {
                    total: function() { return 100000; }
                }
            };

            var options = {
                autoBind: true,
                template: "<div class='foo'>#: foo #</div>",
                emptyTemplate: "<div>empty</div>",
                page: 16
            };

            element = $("<div style='width: 400px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 400px;' />");
            content = new VirtualScrollViewContent(element, new ElasticPane(element), options);
            content.setDataSource(dataSourceConfig);
            content.dataSource.fetch();
        }
    });

    test("Initial page is set to the one specified by the user", 3, function() {
        //page: 16
        equal(content.pages[0].element.text(), "15");
        equal(content.pages[1].element.text(), "16");
        equal(content.pages[2].element.text(), "17");
    });

    var content,
        pane;

    module("VirtualScrollView Content dragging", {
        setup: function() {
            var element = $("<div style='width: 400px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 400px;' />");

            var dataSourceConfig = {
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i ++) {
                            results.push({ foo: i });
                        }

                        options.success(results);
                    }
                },
                pageSize: 36,
                serverPaging: true,
                schema: {
                    total: function() { return 100000; }
                }
            };

            var options = {
                dataSource: dataSourceConfig,
                autoBind: true,
                template: "<div class='foo'>#: foo #</div>",
                emptyTemplate: "<div>empty</div>"
            };

            pane = new ElasticPane(element);
            content = new VirtualScrollViewContent(element, pane, options);
            content.setDataSource(dataSourceConfig);
            content.dataSource.fetch();
            content.resizeTo({width: 400 });
        }
    });

   test("small drag snaps the content back to the current page", 2, function() {
        pane.moveTo(50);
        content.paneMoved(NUDGE, false, $.noop, true);

        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

   test("slow drag to right snaps the content back to the current page when ScrollView is at the first page", 2, function() {
        pane.moveTo(-200);
        content.paneMoved(NUDGE, false, $.noop, true);

        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

   test("slow drag to right snaps the content back to the previous page when ScrollView is NOT at the first page", 3, function() {
        content.scrollTo(7);
        equal(content.page, 7);

        pane.moveTo(-200);
        content.paneMoved(NUDGE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 6);
        equal(pane.offset(), 0);
    });

   test("slow drag to left snaps the content back to the next page when ScrollView", 2, function() {
        pane.moveTo(200);
        content.paneMoved(NUDGE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 0);
    });

    test("swift swipe to right snaps the content back to the current page when ScrollView is at the first page", 2, function() {
        pane.moveTo(50);
        content.paneMoved(RIGHT_SWIPE, false, $.noop, true);

        equal(content.page, 0);
        equal(pane.offset(), 0);
    });

    test("swift swipe to right snaps the content back to the previous page when ScrollView is not at the first page", 2, function() {
        content.scrollTo(7);
        pane.moveTo(50);
        content.paneMoved(RIGHT_SWIPE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 6);
        equal(pane.offset(), 0);
    });

    test("swift swipe to left snaps the content to the next page if buffer end is NOT reached", 2, function() {
        pane.moveTo(-50);
        content.paneMoved(LEFT_SWIPE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 0);
    });

    test("swift swipe to left snaps the content back to the current page if buffer end is reached", 2, function() {
        pane.moveTo(-50);
        content.paneMoved(LEFT_SWIPE, false, $.noop, true);

        content.updatePage();
        equal(content.page, 1);
        equal(pane.offset(), 0);
    });

    test("preventing default reverts back to the previous page", 2, function() {
        pane.moveTo(50);
        var preventDefaultCallback = function() { return true; };

        content.paneMoved(LEFT_SWIPE, false, preventDefaultCallback, true);

        content.updatePage();
        equal(content.page, 0);
        equal(pane.offset(), 0);
    });
})();
