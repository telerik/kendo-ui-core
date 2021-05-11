(function() {

var ComboBox = kendo.ui.ComboBox,
    input;


    describe("ComboBox WAI-ARIA with AXE", function () {
        beforeEach(function() {
            input = $("<input id='cb'/>").appendTo(Mocha.fixture);
            $("<label for='cb'>Label</label>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            input.data("kendoComboBox").destroy();
            kendo.destroy(Mocha.fixture);
        });

        it("ComboBox is accessible", function(done) {
            var combo = new ComboBox(input);

            axeRunFixture(done);
        });

        it("ComboBox with DataSource is accessible", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"]
            });

            axeRunFixture(done);
        });

        // Fails because of the aria-expanded attribute on a role="textbox" element
        it("ComboBox with search term is accessible", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"]
            });

            combo.search("I");

            axeRunFixture(done);
        });

        it("ComboBox with suggest='true' term is accessible", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"],
                suggest: true
            });

            combo.search("I");

            axeRunFixture(done);
        });

        it("ComboBox with search term has accessible popup", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"]
            });

            combo.search("I");

            axeRun(combo.popup.element[0], done);
        });

        it("ComboBox with value is accessible", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"],
                value: "Item"
            });

            axeRunFixture(done);
        });

        it("ComboBox with templates has accessible popup", function(done) {
            var combo = new ComboBox(input, {
                dataSource: ["Item"],
                footerTemplate: 'Total items found',
                headerTemplate: 'Total items found'
            });

            combo.search("I");

            axeRun(combo.popup.element[0], done);
        });
    });

describe("kendo.ui.ComboBox ARIA", function () {
    beforeEach(function() {

        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        input.data("kendoComboBox").destroy();
        kendo.destroy(Mocha.fixture);
    });

it("ComboBox adds role to the input", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.input[0].getAttribute("role"), "combobox");
});

it("ComboBox adds aria-owns", function() {
    var combobox = new ComboBox(input.attr("id", "test"));

    assert.equal(combobox.input.attr("aria-owns"), combobox.ul.attr("id"));
});

it("ComboBox adds aria-owns without input id", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.input.attr("aria-owns"), combobox.ul.attr("id"));
});

it("ComboBox adds aria-controls without input id", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.input.attr("aria-controls"), combobox.ul.attr("id"));
});

it("ComboBox adds aria-activedescentant", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        dataSource: ["Item1", "Item2"],
        value: "Item2"
    });

    assert.equal(combobox.selectedIndex, 1);
    assert.equal(combobox.ul.children().eq(0).attr("id"), undefined);
    assert.equal(combobox.input.attr("aria-activedescendant"), combobox.ul.children().eq(1).attr("id"));
});

it("ComboBox adds aria-disabled='true'", function() {
    var combobox = new ComboBox(input.attr("disabled", "disabled"));

    assert.equal(combobox.input.attr("aria-disabled"), "true");
});

it("ComboBox adds aria-disabled='false'", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.input.attr("aria-disabled"), "false");
});

it("ComboBox adds aria-expanded='false'", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.input.attr("aria-expanded"), "false");
});

it("ComboBox adds aria-expanded='true'", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    combobox.open();

    assert.equal(combobox.input.attr("aria-expanded"), "true");
});

it("ComboBox sets aria-expanded to false on close", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    combobox.open();
    combobox.close();

    assert.isOk(!combobox.popup.visible());
    assert.equal(combobox.input.attr("aria-expanded"), "false");
});

it("ComboBox makes down arrow ARIA accessible", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox._arrow.attr("role"), "button");
    // assert.equal(combobox._arrow.attr("tabindex"), "-1");
    assert.equal(combobox._arrow.attr("aria-controls"), undefined);
});

it("ComboBox adds role='listbox' to list element", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.ul.attr("role"), "listbox");
});

it("ComboBox adds role to the popup element", function() {
    var combobox = new ComboBox(input);

    assert.equal(combobox.ul.attr("role"), "listbox");
});

it("ComboBox adds aria-hidden to the popup element", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    assert.equal(combobox.ul.attr("aria-hidden"), "true");

    combobox.open();

    assert.equal(combobox.ul.attr("aria-hidden"), "false");

    combobox.close();

    assert.equal(combobox.ul.attr("aria-hidden"), "true");
});

it("ComboBox adds aria-live=off if no filter", function() {
     var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    assert.equal(combobox.ul.attr("aria-live"), "off");
});

it("ComboBox adds aria-live=polite if filter is set", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    assert.equal(combobox.ul.attr("aria-live"), "polite");
});

it("ComboBox adds aria-busy=true when loader is shown", function(done) {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    var e = {
        isDefaultPrevented: function(){
            return false;
        }
    };

    combobox._showBusy(e);

    setTimeout(function() {
        assert.equal(combobox.input.attr("aria-busy"), "true");
        done();
    }, 150);
});

it("ComboBox does not adds aria-busy=true when loader is prevented", function(done) {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    var e = {
        isDefaultPrevented: function(){
            return true;
        }
    };
    combobox._showBusy(e);

    setTimeout(function() {
        assert.equal(combobox.input.attr("aria-busy"), "false");
        done();
    }, 150);
});

it("ComboBox adds aria-busy=false when loader is hidden", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    combobox._hideBusy();
    assert.equal(combobox.input.attr("aria-busy"), "false");
});

it("ComboBox does not have aria-activedescendant if no item is selected on load", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: false,
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    assert.equal(combobox.selectedIndex, -1);
    assert.equal(combobox.input.attr("aria-activedescendant"), undefined);
});

it("ComboBox remove aria-activedescendant if no item is selected", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    combobox.value("");
    assert.equal(combobox.selectedIndex, -1);
    assert.equal(combobox.input.attr("aria-activedescendant"), undefined);
});

it("ComboBox adds aria-selected to the selected item", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    assert.equal(combobox.current().attr("aria-selected"), "true");
});

it("ComboBox removes aria-selected from unselected item", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    combobox.value("");

    assert.isOk(!combobox.ul.children("[aria-selected=true]")[0]);
});

it("widget takes aria-label attribute", function() {
    var combobox = new ComboBox(input.attr("aria-label", "labeltext"));

    assert.equal(combobox.input.attr("aria-label"), "labeltext");
});

it("widget takes aria-labelledby attribute", function() {
    var combobox = new ComboBox(input.attr("aria-labelledby", "labelID"));

    assert.equal(combobox.input.attr("aria-labelledby"), "labelID");
});

it("widget sets aria-labelledby attribute to label's  id", function() {
    var label = input.before("<label id='labelID' for='comboInput'>labeltext</label>").prev("label");
    var combobox = new ComboBox(input.attr("id", "comboInput"));

    assert.isOk(combobox.input.attr("aria-labelledby"));
    assert.equal(combobox.input.attr("aria-labelledby"), label.attr("id"));

    label.remove();
});

it("widget sets aria-labelledby attribute to label's generated id", function() {
    var label = input.before("<label for='comboInput'>labeltext</label>").prev("label");
    var combobox = new ComboBox(input.attr("id", "comboInput"));

    assert.isOk(combobox.input.attr("aria-labelledby"));
    assert.equal(combobox.input.attr("aria-labelledby"), label.attr("id"));

    label.remove();
});

it("ComboBox has its aria-autocomplete set to 'none' when no filtering and no suggest is enabled", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        dataSource: ["item1", "item2"]
    });

    assert.equal(combobox.input.attr("aria-autocomplete"), "none");
});

it("ComboBox has its aria-autocomplete set to 'list' when filtering is enabled", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    assert.equal(combobox.input.attr("aria-autocomplete"), "list");
});

it("ComboBox has its aria-autocomplete set to 'both' when filtering and suggest is enabled", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        suggest: true,
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    assert.equal(combobox.input.attr("aria-autocomplete"), "both");
});

it("ComboBox has its aria-autocomplete set to 'inline' when suggest is enabled", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        suggest: true,
        dataSource: ["item1", "item2"]
    });

    assert.equal(combobox.input.attr("aria-autocomplete"), "inline");
});

    });
}());
