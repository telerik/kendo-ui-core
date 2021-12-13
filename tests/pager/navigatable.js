(function() {
    var DataSource = kendo.data.DataSource,
        pager,
        keys = kendo.keys,
        element,
        dataSource;

    function setup(dataOptions, options) {
        dataOptions = $.extend({
            data: [ {data:1},{data:2},{data:3},{data:4},{data:5},{data:6},{data:7},{data:8},{data:9},{data:10},{data:11},{data:12},
                {data:1},{data:2},{data:3},{data:4},{data:5},{data:6},{data:7},{data:8},{data:9},{data:10},{data:11},{data:12},
                {data:1},{data:2},{data:3},{data:4},{data:5},{data:6},{data:7},{data:8},{data:9},{data:10},{data:11},{data:12},
                {data:1},{data:2},{data:3},{data:4},{data:5},{data:6},{data:7},{data:8},{data:9},{data:10},{data:11},{data:12}],
            pageSize: 3,
            page: 1,
        }, dataOptions);

        dataSource = new DataSource(dataOptions);
        options = $.extend({
            dataSource: dataSource,
            refresh: true,
            pageSizes: true,
            input: true,
            buttonCount: 3,
            navigatable: true
        }, options);
        var element = $("<div />").appendTo(Mocha.fixture).kendoPager(options);
        pager = element.data("kendoPager");
        return element;
    }

    describe('pager aria', function() {
        beforeEach(function() {
            element = setup();
            pager.dataSource.fetch();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("right arrow performs paging when pager is focused", function() {
            element.focus();
            var right = { keyCode: keys.RIGHT, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(right);
            assert.equal(pager.page(), 2);
            assert.equal(element.find(":kendoFocusable:not([tabindex='-1'])").length, 0);
        });

        it("left arrow performs paging when pager is focused", function() {
            pager.page(4);
            element.focus();
            var left = { keyCode: keys.LEFT, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(left);
            assert.equal(element.find("input").attr("aria-label"), "3");
            assert.equal(element.find(":kendoFocusable:not([tabindex='-1'])").length, 0);
        });

        it("enter focuses first focusable element in pager", function() {
            element.focus();
            var enter = { keyCode: keys.ENTER, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(enter);
            var activeElement = $(document.activeElement);
            assert.isOk(activeElement.hasClass("k-link"));
            assert.equal(activeElement.text(), "1");
            assert.isOk(!element.hasClass("k-state-focused"));
        });

        it("escape focuses pager", function() {
            var focusEl = element.find(".k-link:eq(3)");
            focusEl.focus();
            var esc = { keyCode: keys.ESC, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(esc);
            assert.equal(element[0], document.activeElement);
            assert.isOk(element.hasClass("k-state-focused"));
        });

        it("tab moves focus to next focusable", function() {
            var focusEl = element.find(".k-link:eq(3)");
            focusEl.focus();
            var tab = { keyCode: keys.TAB, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(tab);
            assert.equal(element.find(".k-link:eq(4)")[0], document.activeElement);
        });

        it("shift + tab moves focus to prev focusable", function() {
            var focusEl = element.find(".k-link:eq(4)");
            focusEl.focus();
            var tab = { keyCode: keys.TAB, shiftKey: true, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(tab);
            assert.equal(element.find(".k-link:eq(3)")[0], document.activeElement);
        });

        it("selected page button remains focused after enter", function() {
            var focusEl = element.find(".k-link:eq(4)");
            focusEl.focus();
            var enter = { keyCode: keys.ENTER, shiftKey: true, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl  };
            pager._keyDown(enter);

            assert.equal(element.find(".k-link:eq(4)")[0], document.activeElement);
        });

        it("arrow button remains focused after enter", function() {
            var focusEl = element.find(".k-pager-nav:eq(3)");
            focusEl.focus();
            var enter = { keyCode: keys.ENTER, shiftKey: true, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(enter);

            assert.equal(element.find(".k-pager-nav:eq(3)")[0], document.activeElement);
        });

        it("tab focuses first button when focus was on last", function() {
            var focusEl = element.find(".k-pager-refresh");
            focusEl.focus();
            var tab = { keyCode: keys.TAB, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(tab);

            assert.equal(element.find(".k-link:eq(2)")[0], document.activeElement);
        });

        it("more pages button remains focused after enter", function() {
            var focusEl = element.find(".k-link:eq(5)");
            focusEl.focus();
            var enter = { keyCode: keys.ENTER, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(enter);

            assert.equal(element.find(".k-link:eq(5)")[0], document.activeElement);
        });

        it("first more pages button remains focused after enter", function() {
            pager.page(7);
            var focusEl = element.find(".k-link:eq(2)");
            focusEl.focus();
            var enter = { keyCode: keys.ENTER, preventDefault: $.noop, stopPropagation: $.noop, target: focusEl };
            pager._keyDown(enter);

            assert.equal(element.find(".k-link:eq(2)")[0], document.activeElement);
        });

        it("home pages to first page", function() {
            pager.page(3);
            element.focus();
            var home = { keyCode: keys.HOME, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(home);

            assert.equal(pager.page(), 1);
        });

        it("end pages to last page", function() {
            element.focus();
            var end = { keyCode: keys.END, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(end);

            assert.equal(pager.page(), pager.totalPages());
        });

        it("pagedown pages to next page pages to first page", function() {
            element.focus();
            var pagedown = { keyCode: keys.PAGEDOWN, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(pagedown);

            assert.equal(pager.page(), 2);
        });

        it("pageup pages to previous page", function() {
            pager.page(3);
            element.focus();
            var pageup = { keyCode: keys.PAGEUP, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(pageup);

            assert.equal(pager.page(), 2);
        });

        it("tab on wrapper does not focus inner child", function() {
            element.focus();
            var tab = { keyCode: keys.TAB, preventDefault: $.noop, stopPropagation: $.noop, target: element };
            pager._keyDown(tab);

            assert.notEqual(element.find(".k-link:eq(2)")[0], document.activeElement);
        });
    });
}());
