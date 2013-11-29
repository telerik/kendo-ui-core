(function() {
    var ScrollView = kendo.Observable.extend({
        init: function (element) {
            kendo.Observable.fn.init.call(this);
            this.element = element;
        }
    });

    var element,
        scrollView,
        pager;

    module("ScrollView Pager", { setup: function () {
        element = $("<div />");
        scrollView = new ScrollView(element);
        pager = new kendo.mobile.ui.ScrollViewPager(scrollView);
    }});

    test("renders ul element in passed widget container", 1, function() {
        equal(element.find("ol.km-pages").length, 1);
    });

    test("renders correct number of elements on ScrollView refresh", 2, function() {
        scrollView.trigger("refresh", { pageCount: 5, page: 1 });
        equal(element.find("ol.km-pages > li").length, 5);
        ok(element.find("ol.km-pages > li").eq(1).is(".km-current-page"));
    });

    test("switches to the correct page on ScrollView change", 3, function() {
        scrollView.trigger("refresh", { pageCount: 5, page: 1 });
        ok(element.find("ol.km-pages > li").eq(1).is(".km-current-page"));

        scrollView.trigger("change", { page: 2 });
        ok(!element.find("ol.km-pages > li").eq(1).is(".km-current-page"));
        ok(element.find("ol.km-pages > li").eq(2).is(".km-current-page"));
    });

    test("destroy unbinds ScrollView event handlers", 1, function() {
        scrollView.trigger("refresh", { pageCount: 5, page: 1 });
        pager.destroy();
        scrollView.trigger("change", { page: 2 });
        ok(pager.element.find("li").eq(1).is(".km-current-page"));
    });

    test("destroy removes pager element", 1, function() {
        pager.destroy();
        equal(element.find("ol.km-pages").length, 0);
    });
})();
