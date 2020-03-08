(function() {
    var ResponsivePanel = kendo.ui.ResponsivePanel;
    var dom;

    describe("responsive panel", function() {
        beforeEach(function() {
            dom = $("<div/>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("applies css classes", function() {
            new ResponsivePanel(dom);

            assert.isOk(dom.hasClass("k-rpanel"), "generic panel class is applied");
            assert.isOk(dom.hasClass("k-rpanel-left"), "alignment class is applied");
        });

        it("applies only orientation css class", function() {
            new ResponsivePanel(dom, { orientation: "right" });

            assert.isOk(dom.hasClass("k-rpanel-right"));
            assert.isOk(!dom.hasClass("k-rpanel-left"));
        });

        it("toggles expanded class when toggle element is clicked", function() {
            new ResponsivePanel(dom);

            var button = $("<button class='k-rpanel-toggle' />").appendTo(Mocha.fixture);

            button.trigger("click");

            assert.isOk(dom.hasClass("k-rpanel-expanded"));

            button.trigger("click");

            assert.isOk(!dom.hasClass("k-rpanel-expanded"));
        });

        it("removes expanded class when document is touched", function() {
            var panel = new ResponsivePanel(dom);

            panel.open();

            Mocha.fixture.trigger("click");

            assert.isOk(!dom.hasClass("k-rpanel-expanded"));
        });

        it("adds animation class after opening", function() {
            var panel = new ResponsivePanel(dom);

            assert.isOk(!dom.hasClass("k-rpanel-animate"));

            panel.open();

            assert.isOk(dom.hasClass("k-rpanel-animate"));
        });

        it("suppresses animation upon widget resize", function() {
            var panel = new ResponsivePanel(dom);

            panel.open();

            panel.resize();

            assert.isOk(!dom.hasClass("k-rpanel-animate"));
        });

        it("suppresses animation upon window resize", function() {
            var panel = new ResponsivePanel(dom);

            panel.open();

            $(window).trigger("resize");

            assert.isOk(!dom.hasClass("k-rpanel-animate"));
        });

        it("open method triggers open event", function() {
            var handler = spy();

            var panel = new ResponsivePanel(dom, {
                open: handler
            });

            panel.open();

            assert.equal(handler.calls, 1);
        });

        it("open event can be prevented", function() {
            var panel = new ResponsivePanel(dom, {
                open: function(e) {
                    e.preventDefault();
                }
            });

            panel.open();

            assert.isOk(!dom.hasClass("k-rpanel-expanded"));
        });

        it("close method triggers close event", function() {
            var handler = spy();

            var panel = new ResponsivePanel(dom, {
                close: handler
            });

            panel.close();

            assert.equal(handler.calls, 1);
        });

        it("close event can be prevented", function() {
            var panel = new ResponsivePanel(dom, {
                close: function(e) {
                    e.preventDefault();
                }
            });

            panel.open();
            panel.close();

            assert.isOk(dom.hasClass("k-rpanel-expanded"));
        });

        it("autoClose: false does not close panel on clicks", function() {
            var panel = new ResponsivePanel(dom, { autoClose: false });

            panel.open();

            Mocha.fixture.trigger("click");

            assert.isOk(dom.hasClass("k-rpanel-expanded"));
        });

        it("does not close panel if closing event is prevented", function() {
            var panel = new ResponsivePanel(dom);

            panel.open();
            panel._close({
                target: document.body,
                isDefaultPrevented: function() { return true }
            });

            assert.isOk(dom.hasClass("k-rpanel-expanded"));
        });

        it("touchend event is prevented", function() {
            new ResponsivePanel(dom);
            var button = $("<button class='k-rpanel-toggle' />").appendTo(Mocha.fixture);

            button.trigger('touchend');

            assert.isOk(!dom.hasClass("k-rpanel-expanded"));
        });
    });
}());
