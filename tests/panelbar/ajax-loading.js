(function () {
    var panelbar;

    function createPanelBar() {
        QUnit.fixture.html(__html__['tests/panelbar/ajax-loading-fixture.html']);
        panelbar = $("#PanelBar1").kendoPanelBar({
            animation: false,
            contentUrls: [
                "AjaxView1.html",
                "AjaxView2.html",
                "AjaxView1.html",
                "AjaxView2.html",
                "AjaxView1.html",
                "error.html"
            ]
        }).data("kendoPanelBar");
    }

    function destroyPanelBar() {
        panelbar.destroy();
        panelbar = null;
        $("#PanelBar1").remove();
    }

    function getRootItem(index) {
        return panelbar.element.children().eq(index).children(".k-link");
    }

    module("AjaxLoading", {
        setup: function() {
            window.con = window.console;
            $.mockjax({
                url: "error.html",
                response: function() {
                    this.responseText = 'foo<script type="text/javascript">throw new Error("Exception required to fire the error event")<' + '/script>';
                }
            });

            $.mockjax({
                url: "AjaxView1.html",
                response: function() {
                    this.responseText = __html__['tests/panelbar/ajax-view1-fixture.html'];
                }
            });

            $.mockjax({
                url: "AjaxView2.html",
                response: function() {
                    this.responseText = __html__['tests/panelbar/ajax-view2-fixture.html'];
                }
            });
        },
        teardown: function() {
            window.console = window.con;
            destroyPanelBar();
        }
    });

    test("PanelBar renders anchor instead of span if contentUrl", function() {
        createPanelBar();

        var children = $("#PanelBar1").find("li:last").children();

        equal(children.filter("a").length, 1);
        equal(children.filter("span").length, 0)
    });

    asyncTest("clicking collapsed content items should expand them", 1, function() {
        createPanelBar();

        var item = getRootItem(0);

        panelbar.bind("contentLoad", function() {
            start();
            equal($(arguments[0].contentElement).css("display"), "block");
            panelbar.unbind("contentLoad");
        });

        item.trigger("click");
    });

    test("clicking expanded content items should collapse them", function() {
        createPanelBar();

        var item = getRootItem(0);

        item.trigger("click");

        equal(item.parent().find(".k-content").css("display"), "none");
    });

    asyncTest("clicking collapsed content items should toggle arrow", 1, function() {
        createPanelBar();

        var item = getRootItem(1);

        panelbar.bind("contentLoad", function() {
            start();
            ok($(arguments[0].item).find(".k-icon").hasClass("k-i-arrow-n"));
            panelbar.unbind("contentLoad");
        });

        item.trigger("click");
    });

    test("clicking expanded content items should toggle arrow", 1, function() {
        createPanelBar();

        var item = getRootItem(1);

        item.trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-s"));
    });

    asyncTest("clicking should make item active", 1, function() {
        createPanelBar();

        var item = getRootItem(2);

        panelbar.bind("contentLoad", function() {
            start();
            ok(item.parent().hasClass("k-state-active"));
            panelbar.unbind("contentLoad");
        });

        item.click();
    });

    asyncTest("initially expanded items fetch their AJAX content", 1, function() {
        QUnit.fixture.html(__html__['tests/panelbar/active-panelbar-fixture.html']);
        panelbar = $("#PanelBar1").kendoPanelBar({
            animation: false,
            contentUrls: [
                "AjaxView1.html",
                "AjaxView2.html",
                "AjaxView1.html",
                "AjaxView2.html",
                "AjaxView1.html"
            ]
        }).data("kendoPanelBar");

        var item = getRootItem(4);

        panelbar.bind("contentLoad", function() {
            start();
            equal(item.parent().find(".k-content").css("display"), "block");
            panelbar.unbind("contentLoad");
        });
    });

    asyncTest("ajax content with error fires error handler and writes the error message to the console", 1, function () {
        createPanelBar();

        var item = getRootItem(5);

        panelbar.bind("error", function (e) {
            start();
            ok(true);
        });

        item.click();
    });
})();
