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

    describe("kendo.ui.MultiSelect filtering", function () {
        beforeEach(function() {
            $.fn.press = function(character) {
                var keyCode = character.charCodeAt(0);
                $(this).trigger({
                    type: "keydown",
                    keyCode: keyCode
                });
            }

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

    it("MultiSelect filters items on keydown", function(done) {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.input.val("Option1").press("1");

        setTimeout(function() {
            assert.equal(multiselect.ul.children().length, 1);
            done();
        });
    });

    it("MultiSelect filters data on rebind depending on the selected items", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        assert.equal(multiselect.dataSource.filter().filters.length, 0);
    });

    it("MultiSelect filters data using selected items too", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
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

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.value(["0", "1"]);
        multiselect.search("Opt");

        var children = multiselect.ul.children();

        assert.equal(children.length, multiselect.dataSource.view().length);
    });

    it("MultiSelect does not append tags on list rebind after filter", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        assert.equal(multiselect.tagList.children().length, 1);
    });

    it("MultiSelect allows selection after filter rebind", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.input.blur();
        multiselect.open();

        multiselect.ul.children().first().click();

        assert.equal(multiselect.tagList.children().length, 1);
    });

    it("MultiSelect hides popup if no data", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            noDataTemplate: ""
        });

        multiselect.wrapper.click();
        multiselect.search("no such item");

        assert.isOk(!multiselect.popup.visible());
    });

    it("keeps popup opened on empty search result if noDataTemplate", function() {
        var multiselect = new MultiSelect(select, {
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}]
        });

        multiselect.search("Foo");

        assert.isOk(multiselect.popup.visible());

        multiselect.search("None");

        assert.isOk(multiselect.popup.visible());
    });

    it("MultiSelect do not show initial values on rebind", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { delay: 0, value: ["1", "2"] });

        multiselect.search("Option0");
        multiselect.ul.children().first().click();
        multiselect.value(null);

        multiselect.open();

        var selectValue = multiselect.element.val() || [];

        assert.equal(multiselect.value().length, 0);
        assert.equal(selectValue.length, 0);
    });

    it("MultiSelect with autoBind:false binds only once datasource when filter", function() {
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
            assert.isOk(true);
        });

        multiselect.search("te");
    });

    it("MultiSelect updates datasource filter state when force rebind", function() {
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

            assert.isOk(filter);
        });

        multiselect.search("te");
    });

    it("MultiSelect filters on empty input", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                assert.equal(e.filter.value, "");
                done();
            });

            multiselect.input.val("").keydown();
        });

        multiselect.input.focus().val("baz").keydown();
    });

    it("MultiSelect does not trigger filter on empty input if minLength & enforceMinLength", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                assert.isOk(false, "should not filter on empty input and enforceMinLength");
            });

            multiselect.input.val("").keydown();

            setTimeout(function() {
                done();
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    it("clicking on clear button does not clear filter if minLength and enforceMinLength", function(done) {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            minLength: 3,
            enforceMinLength: true,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.one("filtering", function(e) {
                assert.isOk(false, "should not filter on empty input and enforceMinLength");
            });

            multiselect._clear.click();

            setTimeout(function() {
                done();
            }, 0);
        });

        multiselect.input.focus().val("baz").keydown();
    });

    it("MultiSelect renders value of the custom options on filter", function() {
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

        assert.equal(options.length, 2);
        assert.equal(options[0].value, "2");
        assert.equal(options[1].value, "1");
    });

    it("MultiSelect keep selected values if less items are returned on rebind", function() {
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

        assert.equal(values.length, 2);
        assert.equal(values[0], "1");
        assert.equal(values[1], "4");
    });

    it("MultiSelect keeps the selected tags on rebind when returned data is less", function() {
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

        assert.equal(tags.length, 2);
        assert.equal(tags.eq(0).children(":first").text(), "text1");
        assert.equal(tags.eq(1).children(":first").text(), "text4");
    });

    it("MultiSelect removes tag that does not exist in datasource after rebind", function() {
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

        assert.equal(tags.length, 1);
        assert.equal(tags.eq(0).children(":first").text(), "text1");

        assert.equal(values.length, 1);
        assert.equal(values[0], "1");
    });

    it("MultiSelect removes tag that does exist in datasource after rebind", function() {
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

        assert.equal(tags.length, 1);
        assert.equal(tags.eq(0).children(":first").text(), "text4");

        assert.equal(values.length, 1);
        assert.equal(values[0], "4");
    });

    it("MultiSelect removes all tags when less data is returned on rebind", function() {
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

        assert.equal(tags.length, 0);
        assert.equal(values.length, 0);
    });

    it("MultiSelect de-selects item after rebind when data is less", function() {
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

        assert.equal(tags.length, 1);
        assert.equal(values.length, 1);

        assert.equal(tags.eq(0).children(":first").text(), "text4");
        assert.equal(values[0], "4");
    });

    it("MultiSelect keeps selected dataitems on de-select after rebind ", function() {
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

        assert.equal(dataItems.length, 2);
        assert.equal(dataItems[0].value, "4");
        assert.equal(dataItems[1].value, "3");
    });

    it("MultiSelect render the option text and value of the custom values", function() {
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

        assert.equal(options.length, 2);

        assert.equal(options[0].text, "text4");
        assert.equal(options[0].value, "4");

        assert.equal(options[1].text, "text1");
        assert.equal(options[1].value, "1");
    });

    it("MultiSelect calls read with normalized filters collection", function() {
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
                        assert.equal(options.filter.filters.length, 0);
                    }
                }
            }
        });

        multiselect.open();
    });
    it("resize popup on search when autoWidth is enabled", function(done) {
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

        multiselect.one("open", function() {
            assert.isOk(multiselect.wrapper.width() < multiselect.popup.element.width());
            multiselect.popup.close();
            multiselect.dataSource.filter({field: "text", value: "a", operator: "contains"});
            multiselect.one("open", function() {
                assert.isOk(multiselect.wrapper.width() >= multiselect.popup.element.width());
                done();
            });
            multiselect.open();
        });
        multiselect.open();

    });

    it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
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
        assert.equal(multiselect.popup.element.parent(".k-animation-container").width(), multiselect.popup.element.outerWidth(true) + 1);
        multiselect.close();
        multiselect.open();
        assert.equal(multiselect.popup.element.parent(".k-animation-container").width(), multiselect.popup.element.outerWidth(true) + 1);
    });

    it("enabled autoWidth disables X scrolling", function() {
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
        assert.equal(multiselect.listView.content.css("overflow"), "hidden auto")
    });

    it("enabled autoWidth sets overflowX to scroll when scrolling is needed", function() {
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
                data: [
                    "Short item",
                    "An item with really, really, really, really, really, really, really, really, really, long text",
                    "Short item",
                    "Short item",
                    "Short item",
                    "Short item",
                    "Short item"
                ]
            }
        });

        multiselect.open();
        assert.equal(multiselect.listView.content.css("overflow"), "hidden scroll")
    });

    it("update popup height when no items are found", function(done) {
        popuplateSelect(30);

        var multiselect = new MultiSelect(select);

        multiselect.open();

        var oldHeight = multiselect.list.height();

        multiselect.one("dataBound", function() {
            assert.isOk(multiselect.list.height() < oldHeight);
            done();
        });

        multiselect.input.focus().val("test").keydown();
    });

    it("MultiSelect caret is not moved on input focus", function(done) {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            delay: 0,
            filter: "startswith",
            autoClose: false
        });

        multiselect.input.val("Option1");
        kendo.caret(multiselect.input[0], 3);
        multiselect.input.focus();

        setTimeout(function() {
            assert.equal(kendo.caret(multiselect.input[0])[0], 3);
            done();
        });
    });

    });
}());
