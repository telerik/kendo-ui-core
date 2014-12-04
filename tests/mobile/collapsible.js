(function() {
    var Collapsible = kendo.mobile.ui.Collapsible,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup,
        dom;

    function click(dom) {
        dom.trigger(MOUSEDOWN);
        dom.trigger(MOUSEUP);
    }

    module("Collapsible panel", {
        setup: function() {
            dom = "<div id='collapsible'>" +
                    "<h4>Header</h4>" +
                    "<p>Content1</p>" +
                    "<p>Content2</p>" +
                  "</div>";

            QUnit.fixture.html(dom);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    });

    /* Initialization */

    test("adds class to the panel", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.element.hasClass("km-collapsible"), "has specified CSS class");
    });

    test("wraps the header element", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        equal(QUnit.fixture.find("h4").parent().data("role"), "collapsible-header");
    });

    test("adds class to the header element", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.header.hasClass("km-collapsible-header"), "has specified CSS class");
    });

    test("wraps the content element", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        equal(QUnit.fixture.find("p").parent().data("role"), "collapsible-content");
    });

    test("adds class to the content element", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.content.hasClass("km-collapsible-content"), "has specified CSS class");
    });

    test("by default after the initialization content is hidden", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.element.is(".km-collapsed"));
    });

    test("if 'collapsed: false' is set the content will not be initially hidden", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false
        }).data("kendoMobileCollapsible");

        ok(panel.content.is(":visible"));
    });

    test("appends icon span to the header element", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.header.find(".km-icon").hasClass("km-plus"));
    });

    test("changes the icon after user expands the content", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        click(panel.header);

        ok(panel.header.find(".km-icon").hasClass("km-minus"));
    });

    test("changes the icon after user collapses the content", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false
        }).data("kendoMobileCollapsible");

        click(panel.header);

        ok(panel.header.find(".km-icon").hasClass("km-plus"));
    });

    test("accepts icon class through the options", 2, function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapseIcon: "foo",
            expandIcon: "bar"
        }).data("kendoMobileCollapsible");

        ok(panel.header.find(".km-icon").hasClass("km-bar"));

        click(panel.header);

        ok(panel.header.find(".km-icon").hasClass("km-foo"));
    });

    test("animated collapsible content receives class", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.content.hasClass("km-animated"));
    });

    test("non animated collapsible content does not have a class", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            animation: false
        }).data("kendoMobileCollapsible");

        ok(!panel.content.hasClass("km-animated"));
    });

    /* UI interactions */

    test("clicking the header expands the content when content is hidden", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            animation: false
        }).data("kendoMobileCollapsible");

        click($("#collapsible h4"));
        ok(panel.content.is(":visible"));
    });

    test("clicking the header collapses the content when content is visible", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            animation: false,
            collapsed: false
        }).data("kendoMobileCollapsible");

        click($("#collapsible h4"));
        ok(panel.content.is(":hidden"));
    });

    /* API */

    test("expand method expands the content", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        panel.expand(true);
        ok(panel.content.is(":visible"));
    });

    test("collapse method collapses the content", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false
        }).data("kendoMobileCollapsible");

        panel.collapse(true);
        ok(panel.content.is(":hidden"));
    });

    test("isCollapsed method returns the collapsed state", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.isCollapsed());

        panel.expand(true);
        ok(!panel.isCollapsed());
    });

    /* Events */

    test("expand event fires", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            expand: function() { ok(true); }
        });

        click($("#collapsible h4"));
    });

    test("collapse event fires", 1, function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false,
            collapse: function() { ok(true); }
        });

        click($("#collapsible h4"));
    });

})();
