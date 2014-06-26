(function() {
    module("mobile scroller", {
        setup: function() {
            QUnit.fixture.html("<div id=scroller style='height: 200px'><div id=content style='height: 800px'>Scrollable</div></div>");
        },

        teardown: function() {
            QUnit.fixture.find("#scroller").kendoMobileScroller("destroy");
            QUnit.fixture.empty();
        }
    });

    test("contentResized pulls back to the bottom position", 1, function() {
        var scroller = QUnit.fixture.find("#scroller").kendoMobileScroller().data("kendoMobileScroller");
        scroller.scrollTo(0, -600);
        QUnit.fixture.find("#content").css("height", 400);
        scroller.contentResized();
        equal(scroller.movable.y, -200);
    });

    test("visible scroll hints makes the hints visible", 1, function() {
        QUnit.fixture.find("#scroller").kendoMobileScroller({ visibleScrollHints: true });
        ok(QUnit.fixture.find('.km-vertical-scrollbar').is(":visible"));
    });

    test("scroll hints are hidden when not needed", 1, function() {
        QUnit.fixture.find("#scroller").kendoMobileScroller({ visibleScrollHints: true });
        ok(!QUnit.fixture.find('.km-horizontal-scrollbar').is(":visible"));
    });

    asyncTest("animatedScrollTo method calls its callback", 1, function() {
        var scroller = QUnit.fixture.find("#scroller").kendoMobileScroller().data("kendoMobileScroller");
        scroller.animatedScrollTo(0, -200, function() { 
            start();
            ok(true, "callback is called");
        });
    });
})();
