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

    test("adds class to the panel", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.element.hasClass("km-collapsible-panel"), "has specified CSS class");
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

        ok(panel.content.is(":hidden"));
    });

    test("if 'collapsed: false' is set the content will not be initially hidden", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false
        }).data("kendoMobileCollapsible");

        ok(panel.content.is(":visible"));
    });

    test("expand method expands the content", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        panel.expand();
        ok(panel.content.is(":visible"));
    });

    test("collapse method collapses the content", function() {
        var panel = $("#collapsible").kendoMobileCollapsible({
            collapsed: false
        }).data("kendoMobileCollapsible");

        panel.collapse();
        ok(panel.content.is(":hidden"));
    });

    test("isCollapsed method returns the collapsed state", function() {
        var panel = $("#collapsible").kendoMobileCollapsible().data("kendoMobileCollapsible");

        ok(panel.isCollapsed());

        panel.expand();
        ok(!panel.isCollapsed());
    });

})();
