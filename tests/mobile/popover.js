(function() {
    var fixtureTemplate = '<script type="text/fixture" id="fixture"> \
        <div data-role="view"> \
            <a href="#foo" data-rel="popover" data-role="button" id="fooAnchor">Open foo</a> \
            <div data-role="popover" id="foo"> \
                <div data-role="view"> \
                    Foo \
                </div> \
            </div> \
        </div> \
    </script>'

    var fixtureTemplate2 = '<script type="text/fixture" id="fixture2"> \
        <div data-role="view"></div> \
        <div data-role="modalview" id="modalview"> \
            <a href="#foo" data-rel="popover" data-role="button" id="fooAnchor2">Open foo</a> \
            <div data-role="popover" id="foo"> \
                <div data-role="view"> \
                    Foo \
                </div> \
            </div> \
        </div> \
    </script>';

    var root,
        popOver,
        app;

    function setup(fixtureID) {
        root = QUnit.fixture;
        root.append(fixtureTemplate).append(fixtureTemplate2);
        root.html($(fixtureID).text()).wrapInner("<div />");
        location.hash = '';
        app = new kendo.mobile.Application(root.children().first());
        popOver = root.find("#foo").data("kendoMobilePopOver");
    }

    function teardown() {
        root.empty();
        kendo.history.stop();
    }

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        ok(root.find(selector).is(":visible"));
    }

    module("PopOver", {
        setup: function() {
            setup("#fixture");
        },

        teardown: teardown
    });

    test("detaches itself to the app container", 1, function(){
        equal(root.find("#foo").length, 1);
    });

    test("is hidden initially", 1, function(){
        hidden("#foo");
    });

    test("is visible when open", 1, function(){
        popOver.openFor(root.find("#fooAnchor"));
        visible("#foo");
    });

    test("destroy removes the overlay", 1, function(){
        popOver.destroy();
        ok(!popOver.popup.overlay.parent().length);
    });

    test("when in ModalView, its popup is used as parent", 1, function(){
        root.empty();

        setup("#fixture2");
        popOver.openFor(root.find("#fooAnchor2"));

        ok(popOver.popup.overlay.parent()[0] == $("#modalview").data("kendoMobileModalView").wrapper[0]);
        teardown();
    });

    asyncTest("provides target in event handler", 1, function(){
        popOver.bind("open", function(e) {
            start();
            equal(e.target[0], $("#fooAnchor")[0]);
        });
        root.find("#fooAnchor").trigger("mouseup");
    });

    asyncTest("is closed when closed", 1, function(){
        popOver.openFor(root.find("#fooAnchor"));
        popOver.close();
        setTimeout(function() {
            start();
            hidden("#foo");
        }, 710);
    });
})();
