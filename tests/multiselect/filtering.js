(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function popuplateSelect(length) {
        var options = [];

        length = length || 5;

        for (var i=0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect filtering", {
        setup: function() {
            $.fn.press = function(character) {
                var keyCode = character.charCodeAt(0);
                $(this).trigger({
                    type: "keydown",
                    keyCode: keyCode
                });
            }

            kendo.ns = "kendo-";
            select = $("<select multiple=multiple/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.ns = "";
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    asyncTest("MultiSelect filters items on keydown", 1, function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.input.val("Option1").press("1");

        setTimeout(function() {
            start();
            equal(multiselect.ul.children().length, 1);
        });
    });

    test("MultiSelect filters data on rebind depending on the selected items", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        equal(multiselect.dataSource.filter().filters.length, 0);
    });

    test("MultiSelect filters data using selected items too", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.ul.children().first().click();
        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.input.click();

        ok(select[0].children[0].selected);
        ok(select[0].children[1].selected);
    });

    test("MultiSelect filters data renders all datasource view data", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.value(["0", "1"]);
        multiselect.search("Opt");

        var children = multiselect.ul.children();

        equal(children.length, multiselect.dataSource.view().length);
    });

    test("MultiSelect does not append tags on list rebind after filter", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect allows selection after filter rebind", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.input.blur();
        multiselect.open();

        multiselect.ul.children().first().click();

        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect hides popup if no data", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            noDataTemplate: ""
        });

        multiselect.wrapper.click();
        multiselect.search("no such item");

        ok(!multiselect.popup.visible());
    });

    test("keeps popup opened on empty search result if noDataTemplate", 2, function(assert) {
        var multiselect = new MultiSelect(select, {
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}]
        });

        multiselect.search("Foo");

        ok(multiselect.popup.visible());

        multiselect.search("None");

        ok(multiselect.popup.visible());
    });

    test("MultiSelect do not show initial values on rebind", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { delay: 0, value: ["1", "2"] });

        multiselect.search("Option0");
        multiselect.ul.children().first().click();
        multiselect.value(null);

        multiselect.open();

        var selectValue = multiselect.element.val() || [];

        equal(multiselect.value().length, 0);
        equal(selectValue.length, 0);
    });

    test("MultiSelect with autoBind:false binds only once datasource when filter", 1, function() {
        var multiselect = new MultiSelect(select, {
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
            ok(true);
        });

        multiselect.search("te");
    });

    test("MultiSelect updates datasource filter state when force rebind", 1, function() {
        var multiselect = new MultiSelect(select, {
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
            var filter = multiselect.dataSource.filter();

            ok(filter);
        });

        multiselect.search("te");
    });

    asyncTest("MultiSelect filters on empty input", 1, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                start();
                equal(e.filter.value, "");
            });

            multiselect.input.val("").keydown();
        });

        multiselect.input.focus().val("baz").keydown();
    });

    asyncTest("MultiSelect does not trigger filter on empty input if minLength & enforceMinLength", 0, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                ok(false, "should not filter on empty input and enforceMinLength");
            });

            multiselect.input.val("").keydown();

            setTimeout(function() {
                start();
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    asyncTest("clicking on clear button does not clear filter if minLength and enforceMinLength", 0, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                ok(false, "should not filter on empty input and enforceMinLength");
            });

            multiselect._clear.click();

            setTimeout(function() {
                start();
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    test("MultiSelect renders value of the custom options on filter", 3, function() {
        var multiselect = new MultiSelect(select, {
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

        var options = select.children();

        equal(options.length, 2);
        equal(options[0].value, "2");
        equal(options[1].value, "1");
    });

    test("MultiSelect keep selected values if less items are returned on rebind", 3, function() {
        var values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        var multiselect = new MultiSelect(select, {
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

        var values = multiselect.value();

        equal(values.length, 2);
        equal(values[0], "1");
        equal(values[1], "4");
    });

    test("MultiSelect keeps the selected tags on rebind when returned data is less", 3, function() {
        var values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        var multiselect = new MultiSelect(select, {
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

        var tags = multiselect.tagList.children();

        equal(tags.length, 2);
        equal(tags.eq(0).children(":first").text(), "text1");
        equal(tags.eq(1).children(":first").text(), "text4");
    });

    test("MultiSelect removes tag that does not exist in datasource after rebind", 4, function() {
        var values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        var multiselect = new MultiSelect(select, {
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

        multiselect.tagList.children().last().find(".k-i-close").click();

        var tags = multiselect.tagList.children();
        var values = multiselect.value();

        equal(tags.length, 1);
        equal(tags.eq(0).children(":first").text(), "text1");

        equal(values.length, 1);
        equal(values[0], "1");
    });

    test("MultiSelect removes tag that does exist in datasource after rebind", 4, function() {
        var values = [
            [{ text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }]
        ];

        var multiselect = new MultiSelect(select, {
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

        multiselect.tagList.children().first().find(".k-i-close").click();

        var tags = multiselect.tagList.children();
        var values = multiselect.value();

        equal(tags.length, 1);
        equal(tags.eq(0).children(":first").text(), "text4");

        equal(values.length, 1);
        equal(values[0], "4");
    });

    test("MultiSelect removes all tags when less data is returned on rebind", 2, function() {
        var values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        var multiselect = new MultiSelect(select, {
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

        multiselect.tagList.children().last().find(".k-i-close").click();
        multiselect.tagList.children().last().find(".k-i-close").click();

        var tags = multiselect.tagList.children();
        var values = multiselect.value();

        equal(tags.length, 0);
        equal(values.length, 0);
    });

    test("MultiSelect de-selects item after rebind when data is less", 4, function() {
        var values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        var multiselect = new MultiSelect(select, {
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

        multiselect.ul.find(".k-state-selected").click();

        var tags = multiselect.tagList.children();
        var values = multiselect.value();

        equal(tags.length, 1);
        equal(values.length, 1);

        equal(tags.eq(0).children(":first").text(), "text4");
        equal(values[0], "4");
    });

    test("MultiSelect keeps selected dataitems on de-select after rebind ", 3, function() {
        var values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }],
            [{ text: "text3", value: "3" }],
            [{ text: "text1", value: "1" }, { text: "text1", value: "2" }] //diff sort
        ];

        var multiselect = new MultiSelect(select, {
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

        multiselect.ul.find(".k-state-selected").click();

        var dataItems = multiselect.dataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0].value, "4");
        equal(dataItems[1].value, "3");
    });

    test("MultiSelect render the option text and value of the custom values", 5, function() {
        var values = [
            [{ text: "text1", value: "2" }, { text: "text1", value: "1" }],
            [{ text: "text4", value: "4" }]
        ];

        var multiselect = new MultiSelect(select, {
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

        var options = select.children();

        equal(options.length, 2);

        equal(options[0].text, "text4");
        equal(options[0].value, "4");

        equal(options[1].text, "text1");
        equal(options[1].value, "1");
    });

    test("MultiSelect calls read with normalized filters collection", 1, function() {
        var values = [{ text: "text1", value: "2" }, { text: "text1", value: "1" }];

        var multiselect = new MultiSelect(select, {
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
                        equal(options.filter.filters.length, 0);
                    }
                }
            }
        });

        multiselect.open();
    });
    test("resize popup on search when autoWidth is enabled", function(assert) {
        var data = [{text: "Foooooooooooooooooooooooooooooooo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
        $(select).width(100);
        var multiselect = new MultiSelect(select, {
            autoWidth: true,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: data
            }
        });

        var done1 = assert.async();
        var done2 = assert.async();
        multiselect.one("open", function() {
            assert.ok(multiselect.wrapper.width() < multiselect.popup.element.width());
            multiselect.popup.close();
            multiselect.dataSource.filter({field: "text", value: "a", operator: "contains"});
            done1();
            multiselect.one("open", function() {
                assert.ok(multiselect.wrapper.width() >= multiselect.popup.element.width());
                done2();
            });
            multiselect.open();
        });
        multiselect.open();

    });

    test("autoWidth adds one pixel to avoid browser pixel rounding", function(assert) {
        var multiselect = new MultiSelect(select, {
            autoWidth: true,
            animation:{
                open: {
                    duration:0
                },
                close: {
                    duration:0
                },
            },
            dataSource: {
                data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text","Short item"]
            }
        });

        multiselect.open();
        equal(multiselect.popup.element.parent(".k-animation-container").width(), multiselect.popup.element.outerWidth(true) + 1);
        multiselect.close();
        multiselect.open();
        equal(multiselect.popup.element.parent(".k-animation-container").width(), multiselect.popup.element.outerWidth(true) + 1);
    });

    asyncTest("update popup height when no items are found", 1, function() {
        popuplateSelect(30);

        var multiselect = new MultiSelect(select);

        multiselect.open();

        var oldHeight = multiselect.list.height();

        multiselect.one("dataBound", function() {
            start();
            ok(multiselect.list.height() < oldHeight);
        });

        multiselect.input.focus().val("test").keydown();
    });
})();
