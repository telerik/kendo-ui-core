(function() {
    var ListBox = kendo.ui.ListBox,
        keys = kendo.keys,
        listA;


    module("ListBox aria", {
        setup: function() {
            var element = $('<select id="listA"></select>').appendTo(QUnit.fixture);

            listA  = createListBoxWithToolbar({
                    dataSource: [ { name: "Tim", id:4 }, { name: "Johny", id:5 }, { name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    navigatable: true
            }, element);

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            if(listA) {
              listA.destroy();
            }
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("List has a data role set", 1, function() {
        ok(listA._getList().attr("role") === "listbox");
    });

    test("All items have id and role set", 1, function() {
        var allSet = true;
        listA.items().each(function () {
            if(!$(this).attr("id") || $(this).attr("role") !== "option") {
                allSet = false;
            }
        });

        ok(allSet === true);
    });

    test("aria-activedescendant is properly set", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    test("aria-activedescendant is properly set", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    test("blur clears aria-activedescendant", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._blur();
        ok(!listA._getList().attr("aria-activedescendant"));
    });

    test("click sets aria-activedescendant", 1, function() {
        listA._click({ currentTarget: listA.items().first() });
        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    test("toolbar's tools have aria-label", function () {
        var toolsButtons = listA.toolbar.element.find("a.k-button");
        var ariaLabelAttr = "aria-label";

        equal(toolsButtons.filter('[data-command="remove"]').attr(ariaLabelAttr), "Delete");
        equal(toolsButtons.filter('[data-command="moveUp"]').attr(ariaLabelAttr), "Move Up");
        equal(toolsButtons.filter('[data-command="moveDown"]').attr(ariaLabelAttr), "Move Down");
        equal(toolsButtons.filter('[data-command="transferTo"]').attr(ariaLabelAttr), "To Right");
        equal(toolsButtons.filter('[data-command="transferFrom"]').attr(ariaLabelAttr), "To Left");
        equal(toolsButtons.filter('[data-command="transferAllTo"]').attr(ariaLabelAttr), "All to Right");
        equal(toolsButtons.filter('[data-command="transferAllFrom"]').attr(ariaLabelAttr), "All to Left");
    });

})();
