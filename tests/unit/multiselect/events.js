import '@progress/kendo-ui/src/kendo.multiselect.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

function populateSelect(length) {
    let options = [];
    length = length || 5;
    for (let i = 0; i < length; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }

    select.html(options);
}

describe("kendo.ui.MultiSelect Events", function() {
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

    asyncTest("MultiSelect triggers open event", function(done) {
        let multiselect = new MultiSelect(select, {
            open: function() {
                done(() => assert.isOk(true));
            }
        });

        multiselect.open();
    });

    asyncTest("MultiSelect triggers close event", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        multiselect.open();
        multiselect.close();
    });

    asyncTest("MultiSelect triggers dataBound event on refresh", function(done) {
        let multiselect = new MultiSelect(select, {
            dataBound: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    asyncTest("MultiSelect raises change event on click", function(done) {
        let multiselect = new MultiSelect(select, {
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    asyncTest("MultiSelect raises change event on enter", function(done) {
        let multiselect = new MultiSelect(select, {
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    asyncTest("MultiSelect raises change event delete", function(done) {
        let multiselect = new MultiSelect(select, {
            change: function() {
                done(() => assert.isOk(true));
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

    asyncTest("MultiSelect raises change event on delete button", function(done) {
        let multiselect = new MultiSelect(select, {
            change: function() {
                done(() => assert.isOk(true));
            },
            value: ["1", "2"]
        });

        multiselect.tagList.find(".k-i-x-circle,.k-svg-i-x-circle").first().click();
    });

    it("MultiSelect raises select event", function() {
        let multiselect = new MultiSelect(select, {
            select: function(e) {
                assert.equal(e.dataItem, this.dataSource.view()[0]);
                assert.equal(e.item[0], this.ul.children().first()[0]);
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    it("MultiSelect raises select event on ENTER", function() {
        let multiselect = new MultiSelect(select, {
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
        let multiselect = new MultiSelect(select, {
            select: function(e) {
                e.preventDefault();
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();

        assert.equal(multiselect.value().length, 0);
    });

    it("MultiSelect triggers deselect on tag remove", function() {
        let multiselect = new MultiSelect(select, {
            deselect: function(e) {
                assert.equal(e.dataItem, this.dataItems()[0]);
                assert.equal(e.item[0], this.tagList.children().first()[0]);
            },
            value: ["0", "1"]
        });

        multiselect.tagList.find(".k-i-x").first().click();
    });

    it("MultiSelect triggers deselect on item deselect", function() {
        let multiselect = new MultiSelect(select, {
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
        let multiselect = new MultiSelect(select, {
            deselect: function(e) {
                e.preventDefault();
            },
            value: ["0", "1"]
        });

        multiselect.tagList.find(".k-i-x").first().click();

        assert.equal(multiselect.value().length, 2);
    });

    it("MultiSelect does not raise change event when set value using value method", function() {
        let multiselect = new MultiSelect(select, {
            change: function() {
                assert.isOk(false);
            }
        });

        multiselect.value(["1", "2"]);

        //simulate change
        multiselect._change();
    });

    asyncTest("MultiSelect triggers filtering event on data source filter", function(done) {
        let multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                let filter = e.filter;

                done(() => {
                    assert.equal(filter.field, "");
                    assert.equal(filter.operator, "contains");
                    assert.equal(filter.value, "baz");
                });
            }
        });

        multiselect.search("baz");
    });

    asyncTest("modifying filter expression in filtering event changes datasource result", function(done) {
        let multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.filter.value = "foo";
            }
        });

        multiselect.one("dataBound", function() {
            let data = multiselect.dataSource.view();

            done(() => {
                assert.equal(data.length, 1);
                assert.equal(data[0], "foo");
            });
        });

        multiselect.search("baz");
    });

    it("MultiSelect filtering event can be prevented", function() {
        let multiselect = new MultiSelect(select, {
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

    asyncTest("MultiSelect triggers filtering when filter is cleared", function(done) {
        let multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.bind("filtering", function(e) {
                done(() => assert.equal(e.filter, undefined));
            });

            multiselect.ul.children("li").first().click();
            multiselect.open();
        });

        multiselect.search("bar");
    });

    asyncTest("trigger change event when clear single tag on delete", function(done) {
        let multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1, 2, 3],
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });
    });

    asyncTest("trigger change event when clear all items", function(done) {
        let multiselect = new MultiSelect(select, {
            change: function() {
                done(() => assert.isOk(true));
            },
            value: ["1", "2"]
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC
        });
    });


    asyncTest("element click calls _focusHandler", function(done) {
        let multiselect = new MultiSelect(select, {});

        multiselect.input.on("focus", function() {
            done(() => assert.isOk(true));
        });

        multiselect.element.click();
    });

    asyncTest("MultiSelect triggers deselect on tag remove in single tagMode", function(done) {
        let multiselect = new MultiSelect(select, {
            tagMode: "single",
            deselect: function(e) {
                let dataItem = this.dataItems()[0];
                let tag = this.tagList.children().first()[0];

                done(() => {
                    assert.equal(e.dataItem, dataItem);
                    assert.equal(e.item[0], tag);
                });
            },
            value: ["1"]
        });

        multiselect._clearValue();
    });

    it("MultiSelect triggers deselect for every item on tag remove in single tagMode", function() {
        let callCount = 0;

        let multiselect = new MultiSelect(select, {
            tagMode: "single",
            deselect: function() {
                callCount += 1;
            },
            value: ["0", "1"]
        });

        multiselect._clearValue();

        assert.equal(callCount, 2);
    });

    it("MultiSelect does not allow tag remove if deselected is prevented in single tagMode", function() {
        let multiselect = new MultiSelect(select, {
            tagMode: "single",
            deselect: function(e) {
                e.preventDefault();
            },
            value: ["0", "1"]
        });

        multiselect._clearValue();

        assert.equal(multiselect.value().length, 2);
    });
});
