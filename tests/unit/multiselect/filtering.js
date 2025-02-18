import '@progress/kendo-ui/src/kendo.multiselect.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

function popuplateSelect(length) {
    let options = [];

    length = length || 5;

    for (let i = 0; i < length; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }

    select.html(options);
}

describe("kendo.ui.MultiSelect filtering", function() {
    beforeEach(function() {
        $.fn.press = function(character) {
            let keyCode = character.charCodeAt(0);
            $(this).trigger({
                type: "keydown",
                keyCode: keyCode
            });
        };

        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    asyncTest("MultiSelect filters items on keydown", function(done) {
        popuplateSelect();
        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.input.val("Option1").press("1");

        setTimeout(function() {
            done(() => assert.equal(multiselect.ul.children().length, 1));
        });
    });

    it("MultiSelect filters data on rebind depending on the selected items", function() {
        popuplateSelect();

        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        assert.equal(multiselect.dataSource.filter().filters.length, 0);
    });

    it("MultiSelect filters data using selected items too", function() {
        popuplateSelect();

        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.ul.children().first().click();
        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.input.click();

        assert.isOk(select[0].children[0].selected);
        assert.isOk(select[0].children[1].selected);
    });

    it("MultiSelect filters data renders all datasource view data", function() {
        popuplateSelect();

        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.value(["0", "1"]);
        multiselect.search("Opt");

        let children = multiselect.ul.children();

        assert.equal(children.length, multiselect.dataSource.view().length);
    });

    it("MultiSelect does not append tags on list rebind after filter", function() {
        popuplateSelect();

        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect does not rebind twice after filter", function() {
        popuplateSelect();

        let calls = 0;
        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.bind("dataBound", () => {
            calls++;
        });

        multiselect.input.blur();

        multiselect.open();

        assert.equal(calls, 1);
    });

    it("MultiSelect allows selection after filter rebind", function() {
        popuplateSelect();

        let multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.input.blur();
        multiselect.open();

        multiselect.ul.children().first().click();

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect hides popup if no data", function() {
        popuplateSelect();
        let multiselect = new MultiSelect(select, {
            noDataTemplate: null
        });

        multiselect.wrapper.click();
        multiselect.search("no such item");

        assert.isOk(!multiselect.popup.visible());
    });

    it("keeps popup opened on empty search result if noDataTemplate", function() {
        let multiselect = new MultiSelect(select, {
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ text: "Foo", value: 1 }, { text: "Bar", value: 2 }, { text: "Baz", value: 3 }]
        });

        multiselect.search("Foo");

        assert.isOk(multiselect.popup.visible());

        multiselect.search("None");

        assert.isOk(multiselect.popup.visible());
    });

    it("MultiSelect do not show initial values on rebind", function() {
        popuplateSelect();
        let multiselect = new MultiSelect(select, { delay: 0, value: ["1", "2"] });

        multiselect.search("Option0");
        multiselect.ul.children().first().click();
        multiselect.value(null);

        multiselect.open();

        let selectValue = multiselect.element.val() || [];

        assert.equal(multiselect.value().length, 0);
        assert.equal(selectValue.length, 0);
    });

    it("MultiSelect with autoBind:false binds only once datasource when filter", function() {
        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            value: [{ text: "text", value: "value" }],
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([
                            { text: "text", value: "1" },
                            { text: "text2", value: "2" },
                            { text: "text3", value: "3" },
                            { text: "text4", value: "4" }
                        ]);
                    }
                },
                serverFiltering: true
            }
        });

        multiselect.dataSource.bind("change", function() {
            assert.isOk(true);
        });

        multiselect.search("te");
    });

    it("MultiSelect updates datasource filter state when force rebind", function() {
        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            value: [{ text: "text", value: "value" }],
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([
                            { text: "text", value: "1" },
                            { text: "text2", value: "2" },
                            { text: "text3", value: "3" },
                            { text: "text4", value: "4" }
                        ]);
                    }
                },
                serverFiltering: true
            }
        });

        multiselect.dataSource.bind("change", function() {
            let filter = multiselect.dataSource.filter();

            assert.isOk(filter);
        });

        multiselect.search("te");
    });

    asyncTest("MultiSelect filters on empty input", function(done) {
        let multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                done(() => assert.equal(e.filter.value, ""));
            });

            multiselect.input.val("").keydown();
        });

        multiselect.input.focus().val("baz").keydown();
    });

    asyncTest("MultiSelect does not trigger filter on empty input if minLength & enforceMinLength", function(done) {
        let count = 0;
        let multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                count++;
            });

            multiselect.input.val("").keydown();

            setTimeout(function() {
                done(() => assert.equal(count, 0, "should not filter on empty input and enforceMinLength"));
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    asyncTest("clicking on clear button does not clear filter if minLength and enforceMinLength", function(done) {
        let count = 0;
        let multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                count++;
            });

            multiselect._clear.click();

            setTimeout(function() {
                done(() => assert.equal(count, 0, "should not filter on empty input and enforceMinLength"));
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    it("MultiSelect renders value of the custom options on filter", function() {
        let multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "text", value: "1" },
                { text: "text2", value: "2" },
                { text: "text3", value: "3" },
                { text: "text4", value: "4" }
            ],
            value: ["1"]
        });

        multiselect.search("text2");

        let options = select.children();

        assert.equal(options.length, 2);
        assert.equal(options[0].value, "2");
        assert.equal(options[1].value, "1");
    });

    it("MultiSelect keep selected values if less items are returned on rebind", function() {
        let values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":first").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        values = multiselect.value();

        assert.equal(values.length, 2);
        assert.equal(values[0], "1");
        assert.equal(values[1], "4");
    });

    it("MultiSelect keeps the selected tags on rebind when returned data is less", function() {
        let values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":first").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        let tags = multiselect.tagList.children(".k-chip");

        assert.equal(tags.length, 2);
        assert.equal(tags.eq(0).children(":first").text(), "text1");
        assert.equal(tags.eq(1).children(":first").text(), "text4");
    });

    it("MultiSelect removes tag that does not exist in datasource after rebind", function() {
        let values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":first").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        multiselect.tagList.children(".k-chip").last().find(".k-i-x-circle,.k-svg-i-x-circle").click();

        let tags = multiselect.tagList.children(".k-chip");
        values = multiselect.value();

        assert.equal(tags.length, 1);
        assert.equal(tags.eq(0).children(":first").text(), "text1");

        assert.equal(values.length, 1);
        assert.equal(values[0], "1");
    });

    it("MultiSelect removes tag that does exist in datasource after rebind", function() {
        let values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":first").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        multiselect.tagList.children(".k-chip").first().find(".k-i-x-circle,.k-svg-i-x-circle").click();

        let tags = multiselect.tagList.children(".k-chip");
        values = multiselect.value();

        assert.equal(tags.length, 1);
        assert.equal(tags.eq(0).children(":first").text(), "text4");

        assert.equal(values.length, 1);
        assert.equal(values[0], "4");
    });

    it("MultiSelect removes all tags when less data is returned on rebind", function() {
        let values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":last").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        multiselect.tagList.children(".k-chip").last().find(".k-i-x-circle,.k-svg-i-x-circle").click();
        multiselect.tagList.children(".k-chip").last().find(".k-i-x-circle,.k-svg-i-x-circle").click();

        let tags = multiselect.tagList.children(".k-chip");
        values = multiselect.value();

        assert.equal(tags.length, 0);
        assert.equal(values.length, 0);
    });

    it("MultiSelect de-selects item after rebind when data is less", function() {
        let values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":last").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.open();

        multiselect.ul.find(".k-selected").click();

        let tags = multiselect.tagList.children(".k-chip");
        values = multiselect.value();

        assert.equal(tags.length, 1);
        assert.equal(values.length, 1);

        assert.equal(tags.eq(0).children(":first").text(), "text4");
        assert.equal(values[0], "4");
    });

    it("MultiSelect keeps selected dataitems on de-select after rebind ", function() {
        let values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text3", value: "3" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":last").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        multiselect.search("text3");
        multiselect.ul.children(":first").click();

        multiselect.open();

        multiselect.ul.find(".k-selected").click();

        let dataItems = multiselect.dataItems();

        assert.equal(dataItems.length, 2);
        assert.equal(dataItems[0].value, "4");
        assert.equal(dataItems[1].value, "3");
    });

    it("MultiSelect render the option text and value of the custom values", function() {
        let values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }]
        ];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success(values.shift());
                    }
                }
            }
        });

        multiselect.search("text1");
        multiselect.ul.children(":last").click();

        multiselect.search("text4");
        multiselect.ul.children(":first").click();

        let options = select.children();

        assert.equal(options.length, 2);

        assert.equal(options[0].text, "text4");
        assert.equal(options[0].value, "4");

        assert.equal(options[1].text, "text1");
        assert.equal(options[1].value, "1");
    });

    it("MultiSelect calls read with normalized filters collection", function() {
        let values = [{ text: "text1", value: "2" }, { text: "text1", value: "1" }];

        let multiselect = new MultiSelect(select, {
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            values: values,
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: "fake.url",
                    parameterMap: function(options) {
                        assert.equal(options.filter.filters.length, 0);
                    }
                }
            }
        });

        multiselect.open();
    });
    asyncTest("resize popup on search when autoWidth is enabled", function(done) {
        let data = [{ text: "Foooooooooooooooooooooooooooooooo", value: 1, type: "a" }, { text: "Bar", value: 2, type: "b" }, { text: "Baz", value: 3, type: "a" }];
        $(select).width(100);
        let multiselect = new MultiSelect(select, {
            autoWidth: true,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: data
            }
        });

        multiselect.one("open", function() {
            assert.isOk(multiselect.wrapper.width() < multiselect.popup.element.width());
            multiselect.popup.close();
            multiselect.dataSource.filter({ field: "text", value: "a", operator: "contains" });
            multiselect.one("open", function() {
                const wrapperWidth = multiselect.wrapper.width(),
                    popupWidth = multiselect.popup.element.width();

                done(() => assert.isOk(wrapperWidth >= popupWidth));
            });
            multiselect.open();
        });
        multiselect.open();

    });

    it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
        let multiselect = new MultiSelect(select, {
            autoWidth: true,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                },
            },
            dataSource: {
                data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text", "Short item"]
            }
        });

        multiselect.open();
        assert.closeTo(multiselect.popup.element.closest(".k-animation-container").width(), multiselect.popup.element.outerWidth(true), 1);
        multiselect.close();
        multiselect.open();
        assert.closeTo(multiselect.popup.element.closest(".k-animation-container").width(), multiselect.popup.element.outerWidth(true), 1);
    });

    it("enabled autoWidth disables X scrolling", function() {
        let multiselect = new MultiSelect(select, {
            autoWidth: true,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                },
            },
            dataSource: {
                data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text", "Short item"]

            }
        });

        multiselect.open();
        assert.equal(multiselect.listView.content.css("overflow"), "hidden auto");
    });

    asyncTest("update popup height when no items are found", function(done) {
        popuplateSelect(30);

        let multiselect = new MultiSelect(select);

        multiselect.open();

        let oldHeight = multiselect.list.height();

        multiselect.one("dataBound", function() {
            done(() => assert.isOk(multiselect.list.height() < oldHeight));
        });

        multiselect.input.focus().val("test").keydown();
    });

    asyncTest("MultiSelect caret is not moved on input focus", function(done) {
        popuplateSelect();
        let multiselect = new MultiSelect(select, {
            delay: 0,
            filter: "startswith",
            autoClose: false
        });

        multiselect.input.val("Option1");
        kendo.caret(multiselect.input[0], 3);
        multiselect.input.focus();

        setTimeout(function() {
            done(() => assert.equal(kendo.caret(multiselect.input[0])[0], 3));
        });
    });

    asyncTest("MultiSelect with filter on DataSource populates properly", function(done) {
        let multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: [{
                    value: 1,
                    text: "one",
                    filterVal: 1
                }, {
                    value: 1,
                    text: "one",
                    filterVal: 2
                }],
                filter: [{ field: "filterVal", operator: "eq", value: 1 }]
            }
        });

        multiselect.bind("open", function() {
            let items = multiselect.dataSource.view();

            done(() => assert.equal(items.length, 1));
        });

        multiselect.open();
    });

    asyncTest("filtering accepts compound filter", function(done) {
        let multiselect = new MultiSelect(select, {
            dataValueField: "value",
            dataTextField: "text",
            dataSource: {
                filter: [{
                    logic: "and",
                    filters: [{
                        field: "disc",
                        operator: "eq",
                        value: false
                    }]
                }],
                data: [{
                    text: "one",
                    value: "one",
                    disc: false
                }, {
                    text: "two",
                    value: "two",
                    disc: true
                }]
            }
        });

        multiselect.bind("open", function() {
            let items = multiselect.dataSource.view();

            done(() => assert.equal(items.length, 1));
        });

        multiselect.open();
    });

});
