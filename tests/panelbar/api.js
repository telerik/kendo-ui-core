(function() {
   var isRaised, isExpandRaised, isCollapseRaised, isSelectRaised, isActivateRaised;

    function getRootItem(index) {
        return $('#PanelBar1').children().eq(index);
    }

    function getPanelBar() {
        return $("#PanelBar1").data("kendoPanelBar");
    }

    //handlers
    function Expand(sender, args) {
        isExpandRaised = true;
    }

   function Activate(sender, args) {
       isActivateRaised = true;
   }

    function Collapse(sender, args) {
        isCollapseRaised = true;
    }

    function Select(sender, args) {
        isSelectRaised = true;
    }

    var onLoadPanelBar;

    module("api", {
        setup: function() {
            QUnit.fixture.html(__html__['tests/panelbar/api-fixture.html']);
            $("#PanelBar1").kendoPanelBar({ expand: Expand, collapse: Collapse, select: Select, activate: Activate });
            isRaised = true;
            onLoadPanelBar = $("#PanelBar1").data("kendoPanelBar");
        },
        teardown: function() {
            $("#panel2").empty();
        }
    });

    test('trigger input select should not bubble', function() {
        isRaised = false;

        var item = getRootItem(4);

        $(item).find('input').first().trigger('select');

        ok(!isRaised);
    });

    test('clicking should raise onSelect event', function() {
        var item = getRootItem(0);

        isSelectRaised = false;

        item.find('> .k-link').trigger('click');

        ok(isSelectRaised);
    });

    test('collapse should raise onCollapse event', function() {
        isCollapseRaised = false;

        var item = getRootItem(3);

        item.find('> .k-link').click();

        ok(isCollapseRaised);
    });

    test('expand should raise onExpand event', function() {
        isExpandRaised = false;

        var item = getRootItem(2);

        item.find('> .k-link').trigger('click');

        ok(isExpandRaised);
    });

    asyncTest('expand should raise onActivate event after duration', 1, function() {
        isActivateRaised = false;

        var item = getRootItem(4);

        item.find('> .k-link').trigger('click');

        setTimeout(function () {
            start();
            ok(isActivateRaised);
        }, 400);
    });

    test('disable method should disable disabled item', function() {
        var panel = getPanelBar();

        var item = getRootItem(2);

        panel.disable(item);

        ok(item.hasClass('k-state-disabled'));
    });

    test('enable method should enable disabled item', function() {
        var panel = getPanelBar();

        var item = getRootItem(2);

        panel.enable(item);

        ok(item.hasClass('k-state-default'));
    });

    test('collapse method should collapse last item', function() {

        var panel = getPanelBar();

        var item = getRootItem(4);

        panel.collapse(item);

        equal(item.find('> .k-group').css("display"), "none");
    });

    test('client object is available in on load', function() {
        ok(null !== onLoadPanelBar);
        ok(undefined !== onLoadPanelBar);
    });

    test('dataSource should create items with the text specified', function () {
        $("#panel2").kendoPanelBar({ dataSource: [ { text: "Item 1" } ] });

        equal($("#panel2").find(".k-item > .k-link:contains(Item 1)").length, 1);
    });

    test('dataSource should spawn arrows for items with group, content or contentUrl', function () {
        $("#panel2").kendoPanelBar({ dataSource: [ { text: "Item 1", content: "Test" }, { text: "Item 2", items: [] }, { text: "Item 3", contentUrl: "http://www.google.com" } ] });

        var icons = $("#panel2").find(".k-item > .k-link > .k-icon");

        ok(icons.eq(0).is(".k-panelbar-expand.k-i-arrow-s"));
        ok(icons.eq(1).is(".k-panelbar-expand.k-i-arrow-s"));
        ok(icons.eq(2).is(".k-panelbar-expand.k-i-arrow-s"));
    });

    test('dataSource should show collapse arrows for expanded items', function () {
        $("#panel2").kendoPanelBar({ dataSource: [ { text: "Item 1", content: "Test", expanded: true } ] });

        ok($("#panel2").find(".k-item > .k-link > .k-icon").is(".k-panelbar-collapse.k-i-arrow-n"));
    });

    test('setOptions resets the animation', function() {
        var p = new kendo.ui.PanelBar("<div />");

        ok(p.options.animation.expand.effects == "expand:vertical");

        p.setOptions({ animation: false });

        ok("effects" in p.options.animation.expand);
        ok(kendo.size(p.options.animation.expand.effects) == 0);
        p.destroy();
    });

    test('setOptions resets the dataSource object', function() {
        var p = new kendo.ui.PanelBar("<div />", { dataSource: [ { text: "Item 1" } ] });

        ok(p.element.find("li").text() == "Item 1");

        p.setOptions({ dataSource: [ { text: "Changed" } ] });

        ok(p.element.find("li").text() == "Changed");
        p.destroy();
    });

    test("Add dynamic item with cssClass", function () {
        var p = new kendo.ui.PanelBar("<ul></ul>");

        p.append({ text: "test", cssClass: "cssClass" });

        ok(p.element.find(".cssClass")[0]);
        p.destroy();
    });

    test("Adding dynamic content element renders properly on root and inner levels", function () {
        var p = new kendo.ui.PanelBar("<ul></ul>");

        p.append([
            {
                text: "Item 1",
                content: "Item 1 Content"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        content: "Sub Item 1 Content"
                    }
                ]
            }
        ]);

        ok(p.element.children("li:first").children("div.k-content")[0]);
        ok(p.element.find("> li:last > ul > li:first").children("div.k-content")[0]);
        p.destroy();
    });

    test("Adding dynamic contentUrl element renders contents on root and inner levels", function () {
        var p = new kendo.ui.PanelBar("<ul></ul>");

        p.append([
            {
                text: "Item 1",
                contentUrl: "AjaxView1.html"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        contentUrl: "AjaxView2.html"
                    }
                ]
            }
        ]);

        ok(p.element.children("li:first").children("div.k-content")[0]);
        ok(p.element.find("> li:last > ul > li:first").children("div.k-content")[0]);
        p.destroy();
    });
})();
