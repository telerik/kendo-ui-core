(function() {
    var ListBox = kendo.ui.ListBox,
        keys = kendo.keys,
        listA;


    describe("ListBox aria", function () {
        beforeEach(function() {
            var element = $('<select id="listA"></select>').appendTo(Mocha.fixture);

            listA  = createListBoxWithToolbar({
                    dataSource: [ { name: "Tim", id:4 }, { name: "Johny", id:5 }, { name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    navigatable: true
            }, element);

            $(document.body).append(Mocha.fixture);
        });
        afterEach(function() {
            if(listA) {
              listA.destroy();
            }
            kendo.destroy(Mocha.fixture);
        });

    it("List has a data role set", function() {
        assert.isOk(listA._getList().attr("role") === "listbox");
    });

    it("All items have id and role set", function() {
        var allSet = true;
        listA.items().each(function () {
            if(!$(this).attr("id") || $(this).attr("role") !== "option") {
                allSet = false;
            }
        });

        assert.isOk(allSet === true);
    });

    it("aria-activedescendant is properly set", function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        assert.isOk(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    it("aria-activedescendant is properly set", function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        assert.isOk(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    it("blur clears aria-activedescendant", function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._blur();
        assert.isOk(!listA._getList().attr("aria-activedescendant"));
    });

    it("click sets aria-activedescendant", function() {
        listA._click({ currentTarget: listA.items().first() });
        assert.isOk(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    it("toolbar's tools have aria-label", function () {
        var toolsButtons = listA.toolbar.element.find("a.k-button");
        var ariaLabelAttr = "aria-label";

        assert.equal(toolsButtons.filter('[data-command="remove"]').attr(ariaLabelAttr), "Delete");
        assert.equal(toolsButtons.filter('[data-command="moveUp"]').attr(ariaLabelAttr), "Move Up");
        assert.equal(toolsButtons.filter('[data-command="moveDown"]').attr(ariaLabelAttr), "Move Down");
        assert.equal(toolsButtons.filter('[data-command="transferTo"]').attr(ariaLabelAttr), "Transfer To");
        assert.equal(toolsButtons.filter('[data-command="transferFrom"]').attr(ariaLabelAttr), "Transfer From");
        assert.equal(toolsButtons.filter('[data-command="transferAllTo"]').attr(ariaLabelAttr), "Transfer All To");
        assert.equal(toolsButtons.filter('[data-command="transferAllFrom"]').attr(ariaLabelAttr), "Transfer All From");
    });

    });
}());
