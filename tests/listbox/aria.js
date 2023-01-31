(function() {
    var ListBox = kendo.ui.ListBox,
        keys = kendo.keys,
        listA,
        listB;

    describe("ListBox accessibility with AXE", function() {
        beforeEach(function() {});
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("ListBox is accessible", function(done) {
            createListBox();

            axeRunFixture(done);
        });

        it("ListBox with ToolBar is accessible", function(done) {
            createListBoxWithToolbar();

            axeRunFixture(done);
        });

        it("Connected ListBox is accessible", function(done) {
            $("<label for='listBoxA'>Label</label>").appendTo(Mocha.fixture);
            $("<label for='listBoxB'>Label</label>").appendTo(Mocha.fixture);

            var elementA = $('<select id="listBoxA"></select>').appendTo(Mocha.fixture);
            var elementB = $('<select id="listBoxB"></select>').appendTo(Mocha.fixture);

            createListBoxWithToolbar({
                data: [{
                    id: 1,
                    text: "item1"
                }, {
                    id: 2,
                    text: "item2"
                }],
                connectWith: "listBoxB"
            }, elementA);

           createListBoxWithToolbar({
                dataSource: {
                    data: []
                },
                connectWith: "listBoxA"
            }, elementB);

            axeRunFixture(done);
        });

        it("multiselectable ListBox has 'aria-multiselectable' on the element with role='listbox'", function() {
            createListBox();

            assert.equal(Mocha.fixture.find("[role='listbox']").attr("aria-multiselectable"), "true");
        });
    });

    describe("ListBox aria", function() {
        beforeEach(function() {
            var elementA = $('<select id="listA"></select>').appendTo(Mocha.fixture);
            var elementB = $('<select id="listB"></select>').appendTo(Mocha.fixture);

            listA = createListBoxWithToolbar({
                dataSource: [ { name: "Tim", id: 4 }, { name: "Johny", id: 5 }, { name: "Dicky", id: 6 }],
                dataTextField: "name",
                selectable: true,
                navigatable: true,
                connectWith: "listB"
            }, elementA);

            listB = createListBoxWithToolbar({
                dataSource: [ { name: "Tim2", id: 7 }, { name: "Johny2", id: 8 }, { name: "Dicky2", id: 9 }],
                    dataTextField: "name",
                    selectable: true,
                    navigatable: true,
                    connectWith: "listA"
            }, elementB);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("List has a data role set", function() {
            assert.isOk(listA._getList().attr("role") === "listbox");
        });

        it("All items have id and role set", function() {
            var allSet = true;
            listA.items().each(function() {
                if (!$(this).attr("id") || $(this).attr("role") !== "option") {
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

        it("toolbar's tools have aria-label", function() {
            var toolsButtons = listA.toolbar.element.find("button.k-button");
            var ariaLabelAttr = "aria-label";

            assert.equal(toolsButtons.filter('[data-command="remove"]').attr(ariaLabelAttr), "Delete");
            assert.equal(toolsButtons.filter('[data-command="moveUp"]').attr(ariaLabelAttr), "Move Up");
            assert.equal(toolsButtons.filter('[data-command="moveDown"]').attr(ariaLabelAttr), "Move Down");
            assert.equal(toolsButtons.filter('[data-command="transferTo"]').attr(ariaLabelAttr), "Transfer To");
            assert.equal(toolsButtons.filter('[data-command="transferFrom"]').attr(ariaLabelAttr), "Transfer From");
            assert.equal(toolsButtons.filter('[data-command="transferAllTo"]').attr(ariaLabelAttr), "Transfer All To");
            assert.equal(toolsButtons.filter('[data-command="transferAllFrom"]').attr(ariaLabelAttr), "Transfer All From");
        });

        it("items have id and uid set", function() {
            assert.isOk(listA.items().first().data("uid").length);
            assert.isOk(listA.items().first().attr("id").length);

            assert.isOk(listB.items().first().data("uid").length);
            assert.isOk(listB.items().first().attr("id").length);
        });

        it("has aria-busy set to 'true' while loading from remote", function() {
            listA = createListBox({
                dataSource: {
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([ "one", "two" ]);
                            });
                        }
                    }
                }
            });

            assert.equal(listA.wrapper.attr("aria-busy"), "true");
        });
    });
}());
