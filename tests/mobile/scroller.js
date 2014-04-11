(function() {
    module("mobile scroller", {
        setup: function() {
        },

        teardown: function() {
            kendo.history.stop();
            QUnit.fixture.empty();
        }
    });

    test("contentResized pulls back to the bottom position", 1, function() {
        QUnit.fixture.html("<div id=scroller style='height: 200px'><div id=content style='height: 800px'>Scrollable</div></div>");
        var scroller = QUnit.fixture.find("#scroller").kendoMobileScroller().data("kendoMobileScroller");
        scroller.scrollTo(0, -600);
        QUnit.fixture.find("#content").css("height", 400);
        scroller.contentResized();
        equal(scroller.movable.y, -200);
        scroller.destroy();
    });
})();
