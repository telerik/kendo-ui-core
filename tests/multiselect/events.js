(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function populateSelect(length) {
        var options = [];
        length = length || 5;
        for (var i=0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    describe("kendo.ui.MultiSelect Events", function () {
        beforeEach(function() {
            kendo.ns = "kendo-";
            select = $("<select multiple/>").appendTo(Mocha.fixture);
            populateSelect();
        });
        afterEach(function() {
            kendo.ns = "";
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

    it("MultiSelect triggers open event", function() {
        var multiselect = new MultiSelect(select, {
            open: function() {
                assert.isOk(true);
            }
        });

        multiselect.open();
    });

    it("MultiSelect triggers close event", function() {
        var multiselect = new MultiSelect(select, {
            close: function() {
                assert.isOk(true);
            }
        });

        multiselect.open();
        multiselect.close();
    });

    it("MultiSelect triggers dataBound event on refresh", function() {
        var multiselect = new MultiSelect(select, {
            dataBound: function() {
                assert.isOk(true);
            }
        });
    });

    it("MultiSelect raises change event on click", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(true);
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    it("MultiSelect raises change event on enter", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(true);
            }
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    it("MultiSelect raises change event delete", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(true);
            },
            value: ["1", "2"]
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });
    });

    it("MultiSelect raises change event on delete button", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(true);
            },
            value: ["1", "2"]
        });

        multiselect.tagList.find(".k-i-close").first().click();
    });

    it("MultiSelect raises select event", function() {
        var multiselect = new MultiSelect(select, {
            select: function(e) {
                assert.equal(e.dataItem, this.dataSource.view()[0]);
                assert.equal(e.item[0], this.ul.children().first()[0]);
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    it("MultiSelect raises select event on ENTER", function() {
        var multiselect = new MultiSelect(select, {
            select: function(e) {
                assert.equal(e.dataItem, this.dataSource.view()[1]);
                assert.equal(e.item[0], this.ul.children()[1]);
            }
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    it("MultiSelect does not select item if select is prevented", function() {
        var multiselect = new MultiSelect(select, {
            select: function(e) {
                e.preventDefault();
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();

        assert.equal(multiselect.value().length, 0);
    });

    it("MultiSelect triggers deselect on tag remove", function() {
        var multiselect = new MultiSelect(select, {
            deselect: function(e) {
                assert.equal(e.dataItem, this.dataItems()[0]);
                assert.equal(e.item[0], this.tagList.children().first()[0]);
            },
            value: ["0", "1"]
        });

        multiselect.tagList.find(".k-i-close").first().click();
    });

    it("MultiSelect triggers deselect on item deselect", function() {
        var multiselect = new MultiSelect(select, {
            deselect: function(e) {
                assert.equal(e.dataItem, this.dataItems()[0]);
                assert.equal(e.item[0], this.ul.children().first()[0]);
            },
            value: ["0", "1"]
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    it("MultiSelect does not allow tag remove if deselected is prevented", function() {
        var multiselect = new MultiSelect(select, {
            deselect: function(e) {
                e.preventDefault();
            },
            value: ["0", "1"]
        });

        multiselect.tagList.find(".k-i-close").first().click();

        assert.equal(multiselect.value().length, 2);
    });

    it("MultiSelect does not raise change event when set value using value method", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(false);
            }
        });

        multiselect.value(["1","2"]);

        //simulate change
        multiselect._change();
    });

    it("MultiSelect triggers filtering event on data source filter", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                var filter = e.filter;

                assert.equal(filter.field, "");
                assert.equal(filter.operator, "contains");
                assert.equal(filter.value, "baz");

                done();
            }
        });

        multiselect.search("baz");
    });

    it("modifying filter expression in filtering event changes datasource result", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.filter.value = "foo";
            }
        });

        multiselect.one("dataBound", function() {
            var data = multiselect.dataSource.view();

            assert.equal(data.length, 1);
            assert.equal(data[0], "foo");

            done();
        });

        multiselect.search("baz");
    });

    it("MultiSelect filtering event can be prevented", function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.preventDefault();
            }
        });

        multiselect.dataSource.bind("change", function() {
            assert.isOk(false);
        });

        multiselect.search("baz");
    });

    it("MultiSelect triggers filtering when filter is cleared", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.bind("filtering", function(e) {
                assert.equal(e.filter, undefined);
                done();
            });

            multiselect.ul.children("li").first().click();
            multiselect.open();
        });

        multiselect.search("bar");
    });

    it("trigger change event when clear single tag on delete", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3],
            change: function() {
                assert.isOk(true);
            }
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });
    });

    it("trigger change event when clear all items", function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(true);
            },
            value: ["1", "2"]
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC
        });
    });
    });
}());
