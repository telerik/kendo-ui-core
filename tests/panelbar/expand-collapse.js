(function() {
    var isRaised, isExpandRaised, isCollapseRaised, isSelectRaised;

    function getRootItem(index) {
        return $('#PanelBar1').children().eq(index)
    }

    function getPanelBar() {
        return $("#PanelBar1").data("kendoPanelBar");
    }

    //handlers
    function Expand(sender, args) {
        isExpandRaised = true;
    }

    function Collapse(sender, args) {
        isCollapseRaised = true;
    }

    function Select(sender, args) {
        isSelectRaised = true;
    }

    module('panelbar expand collapse', {
        setup: function() {
            kendo.effects.disable();
            QUnit.fixture.html(__html__['tests/panelbar/expand-collapse-fixture.html']);
            $("#PanelBar1").kendoPanelBar({ animation: false });
            isRaised = true;
        },
        teardown: function() {
            kendo.effects.enable();
        }
    });

    test("clicking collapsed item not expand if it is disabled", function() {

        var item = getRootItem(1);

        item
                .toggleClass("k-state-default", false)
                .toggleClass("k-state-disabled", true);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "none");
    });

    test("clicking expanded items should toggle arrow", function() {
        var item = getRootItem(3);

        item.find("> .k-link").trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-s"));
    });

    test("clicking collapsed items should expand them", function() {
        var item = getRootItem(2);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "block");
    });

    test("clicking collapsed items should toggle arrow", function() {
        var item = getRootItem(0);

        item.find("> .k-link").trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-n"));
    });

    test("clicking collapsed items should not expand child groups", function() {
        var item = getRootItem(4);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group .k-group").css("display"), "none");
    });

    test("clicking child group items should not collapse root group", function() {
        var item = getRootItem(4);

        getPanelBar().expand(item);

        item.find(".k-item > .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "block");
    });

    test("clicking arrows toggles child groups", function() {
        var item = getRootItem(3);

        item.find("> .k-link > .k-icon").trigger("click");

        equal(item.find(".k-group").css("display"), "none");
    });
})();
