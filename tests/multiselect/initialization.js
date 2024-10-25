(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    var CONTAINER_HEIGHT = 200;

    function populateSelect() {
        var options = [];
        for (var i = 0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    describe("kendo.ui.MultiSelect Initialization", function() {
        beforeEach(function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

    it("MultiSelect wraps input element", function() {
        var multiselect = new MultiSelect(select),
            wrapper = multiselect.wrapper;

        assert.equal(wrapper[0].nodeName, "SPAN");
        assert.isOk(wrapper.hasClass("k-multiselect"));
    });

    it("MultiSelect input has data-validate attribute set to false", function() {
        var multiselect = new MultiSelect(select),
            input = multiselect.input;

        assert.isOk(input.data("validate") === false);
    });

    it("MultiSelect copies className of the element to the wrapper", function() {
        var multiselect = new MultiSelect(select.addClass("test")),
            wrapper = multiselect.wrapper;

        assert.isOk(wrapper.hasClass("test"));
    });

    it("MultiSelect shows wrapper even if element is hidden", function() {
        var multiselect = new MultiSelect(select.hide()),
            wrapper = multiselect.wrapper;

        assert.isOk(wrapper.is(":visible"));
    });

    it("MultiSelect creates ul", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.tagList);
    });

    it("MultiSelect wraps tagList with k-input-values and clears float", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.tagList.parent().parent().hasClass("k-multiselect"));
    });

    it("MultiSelect appends tagList to k-input-values element in the wrapper", function() {
        var multiselect = new MultiSelect(select);

        assert.equal(multiselect.wrapper.children(".k-input-values").children(".k-chip-list")[0], multiselect.tagList[0]);
    });

    it("MultiSelect creates input element", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.input);
        assert.isOk(multiselect.input.attr("autocomplete"), "off");
    });

    it("MultiSelect appends input to the wrapper", function() {
        var multiselect = new MultiSelect(select);

        assert.equal(multiselect.wrapper.find(".k-input-values").find(".k-input-inner").eq(0)[0], multiselect.input[0]);
    });

    it("MultiSelect builds templates", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.tagTemplate);
    });

    it("multiselect sets default item template", function() {
        var multiselect = new MultiSelect(select);

        var template = multiselect.listView.options.template;
        var result = template("abc");

        assert.equal(result, "abc");
    });

    it("template should use defined dataTextField", function() {
        var multiselect = new MultiSelect(select, {
            dataTextField: "ProductName"
        });

        var template = multiselect.listView.options.template;
        var result = template({ ProductName: "abc" });

        assert.equal(result, "abc");
    });

    it("changing the template", function() {
        var multiselect = new MultiSelect(select, {
            dataTextField: "",
            template: (data) => data.toUpperCase()
        });

        var template = multiselect.listView.options.template;
        var result = template("abc");

        assert.equal(result, "ABC");
    });

    it("MultiSelect renders header template", function() {
        var multiselect = new MultiSelect(select, {
            template: (data) => data.toUpperCase(),
            headerTemplate: () => "<div id='t'>Header</div>"
        });

        var list = multiselect.list;

        assert.equal(list.prev()[0].outerHTML, '<div id="t">Header</div>');
    });

    it("render footer container", function() {
        var multiselect = new MultiSelect(select, {
            footerTemplate: () => "footer"
        });

        var footer = multiselect.footer;

        assert.isOk(footer);
        assert.isOk(footer.hasClass("k-list-footer"));
    });

    it("render footer template", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: true,
            footerTemplate: () => "footer"
        });

        var footer = multiselect.footer;

        assert.equal(footer.html(), "footer");
    });

    it("compile footer template with the multiselect instance", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: true,
            footerTemplate: ({ instance }) => instance.dataSource.total()
        });

        var footer = multiselect.footer;

        assert.equal(footer.html(), multiselect.dataSource.total());
    });

    it("update footer template on dataBound", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: true,
            footerTemplate: ({ instance }) => instance.dataSource.total()
        });

        var footer = multiselect.footer;

        multiselect.dataSource.data(["Item1"]);

        assert.equal(footer.html(), multiselect.dataSource.total());
    });

    it("adjust height if footer template", function() {
        var multiselect = new MultiSelect(select, {
            animation: false,
            autoBind: false,
            dataSource: ["item1", "item2", "item3", "item4", "item5"],
            footerTemplate: () => "<div>Footer</div>",
            height: 100
        });

        multiselect.open();

        assert.isOk(multiselect.listView.content.height() < 100);
    });

    it("MultiSelect creates DataSource", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.dataSource);
    });

    it("MultiSelect binds DataSource if autoBind: true", function() {
        populateSelect();
        var multiselect = new MultiSelect(select);

        assert.equal(multiselect.ul.children().length, select.children().length);
    });

    it("MultiSelect creates popup", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.popup);
        assert.isOk(multiselect.popup instanceof kendo.ui.Popup);
        assert.equal(multiselect.popup.options.anchor[0], multiselect.wrapper[0]);
        assert.equal(multiselect.popup.element[0], multiselect.list.parent()[0]);
    });

    it("MultiSelect initializes an UL for its items", function() {
        select.attr("id", "multiselect");
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect.ul);
        assert.isOk(multiselect.ul.is("ul"));
        assert.isOk(multiselect.list.attr("id"), select.attr("id") + "-list");
        assert.equal(multiselect.listView.content.css("overflow"), "hidden auto");
    });

    it("MultiSelect calls value method on init", function() {
        populateSelect();
        var multiselect = new MultiSelect(select, {
            value: "0"
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect creates _searchText", function() {
        populateSelect();
        var multiselect = new MultiSelect(select),
            searchText = multiselect._span,
            input = multiselect.input;

        assert.equal(searchText.css("position"), "absolute");
        assert.equal(searchText.css("visibility"), "hidden");
        assert.equal(searchText.css("top"), "-3333px");
        assert.equal(searchText.css("left"), "-3333px");
        assert.equal(searchText.css("font-size"), input.css("font-size"));
        assert.equal(searchText.css("font-style"), input.css("font-style"));
        assert.equal(searchText.css("font-weight"), input.css("font-weight"));
        assert.equal(searchText.css("font-family"), input.css("font-family"));
        assert.equal(searchText.css("line-height"), input.css("line-height"));
        assert.equal(searchText.css("text-transform"), input.css("text-transform"));
        assert.equal(searchText.css("letter-spacing"), input.css("letter-spacing"));
    });

    /*it("multiselect can be initialized in hidden container", function() {
        populateSelect();

        var div = $("<div style='display: none'></div>").appendTo(Mocha.fixture),
            multiselect = select.appendTo(div).kendoMultiSelect().data("kendoMultiSelect");

        div.show();
        multiselect.popup.open();

        assert.equal(multiselect.popup.element.parent().width(), multiselect.wrapper.width());
    });*/

    it("multiselect does not set width if list has style.width", function() {
        populateSelect();
        var multiselect = select.kendoMultiSelect().data("kendoMultiSelect");

        multiselect.list.width(400);

        multiselect.open();

        assert.equal(multiselect.list.width(), 400);
    });

    it("MultiSelect sets static height to the list", function() {
        var dataSource = new kendo.data.DataSource.create([1, 2, 3, 4, 5]);
        dataSource.read();

        var multiselect = select.kendoMultiSelect({
            autoBind: false,
            dataSource: dataSource,
            template: () => "<div style='height:30px'><%= data %> </div>",
            height: 50
        }).data("kendoMultiSelect");

        multiselect.refresh();
        multiselect.open();

        assert.equal(multiselect.list.height(), 50);
    });

    it("MultiSelect shrinks ul if the height of the items is more then options.height", function() {
        populateSelect();
        var multiselect = select.kendoMultiSelect().data("kendoMultiSelect");
        multiselect.options.height = 50;

        multiselect.refresh();
        multiselect.open();

        assert.equal(multiselect.list.css("height"), "50px");
    });

    it("MultiSelect calculates popup height properly when ul has overflow-x styling", function() {
        var multiselect = new MultiSelect(select, {
             dataSource: ["item1", "item2", "item3", "item4", "item5"],
             height: 50
        });

        multiselect.ul.css("overflow-x", "hidden");

        multiselect.open();

        var list = multiselect.list;

        assert.equal(list.height(), 50);
    });

    it("MultiSelect adds scrollbar width to the fixed group header padding", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 }
            ],
            group: "value"
        });

        var multiselect = select.kendoMultiSelect({
            dataSource: dataSource,
            height: 50
        }).data("kendoMultiSelect");

        multiselect.open();

        var padding = multiselect.list.find(".k-list-group-sticky-header").css("padding-right");

        assert.isOk(parseFloat(padding) >= kendo.support.scrollbar());
    });

    it("MultiSelect does not add scrollbar width to the fixed group header padding if popup has not scroll", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 }
            ],
            group: "value"
        });

        var multiselect = select.kendoMultiSelect({
            dataSource: dataSource,
            height: 350
        }).data("kendoMultiSelect");

        multiselect.open();

        var padding = multiselect.list.find(".k-list-group-sticky-header").css("padding-right");

        assert.isOk(parseFloat(padding) < 15);
    });

    it("MultiSelect uses select.value on init", function() {
        populateSelect();
        select.val("0");

        var multiselect = new MultiSelect(select);

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect creates loading element", function() {
        populateSelect();
        var multiselect = new MultiSelect(select);

        assert.isOk(multiselect._loading);
    });

    it("MultiSelect disables widget on init", function() {
        populateSelect();
        var multiselect = new MultiSelect(select.attr("disabled", "disabled"));

        assert.isOk(multiselect.input.attr("disabled"));
    });

    it("MultiSelect  disables on init", function() {
       select.kendoMultiSelect({
            enabled: false
       });

       assert.isOk(select.data("kendoMultiSelect").input.attr("disabled"));
    });
/*
    it("MultiSelect shows loading icon on progress", function(done) {
        populateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.dataSource.trigger("progress");

        setTimeout(function() {
            assert.isOk(!multiselect._loading.hasClass("k-loading-hidden"));
            done();
        }, 200);
    });

    it("MultiSelect hides loading icon on dataSource change", function(done) {
        populateSelect();
        var multiselect = new MultiSelect(select);

        multiselect._showBusy();

        setTimeout(function() {
            multiselect.refresh();
            assert.isOk(multiselect._loading.hasClass("k-loading-hidden"));
            done();
        }, 200);
    });
*/
    it("form reset support", function(done) {
        populateSelect();

        select[0].children[1].setAttribute("selected", "selected");
        select[0].children[2].setAttribute("selected", "selected");

        var form = $("<form/>").appendTo(Mocha.fixture).append(select),
            multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);
        form[0].reset();

        setTimeout(function() {
            assert.isOk(select[0].children[1].selected);
            assert.isOk(select[0].children[2].selected);
            done();
        }, 150);
    });

    it("reset support for form defined by attribute", function(done) {
        populateSelect();

        select[0].children[1].setAttribute("selected", "selected");
        select[0].children[2].setAttribute("selected", "selected");

        select.attr("form", "form1");
        var form = $('<form id="form1"/>').appendTo(Mocha.fixture),
            multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);
        form[0].reset();

        setTimeout(function() {
            assert.isOk(select[0].children[1].selected);
            assert.isOk(select[0].children[2].selected);
            done();
        }, 150);
    });

    it("form reset support does not remove place2older", function(done) {
        populateSelect();

        var form = $("<form/>").appendTo(Mocha.fixture).append(select);
        var multiselect = new MultiSelect(select, {
            placeholder: "Select..."
        });

        form[0].reset();

        setTimeout(function() {
            assert.equal(multiselect.input.val(), "Select...");
            done();
        }, 150);
    });

    it("widget sets only option.selected property", function() {
        populateSelect();

        var multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);

        assert.isOk(select[0].children[3].selected);
        assert.isOk(select[0].children[4].selected);

        assert.isOk(!select[0].children[3].getAttribute("selected"));
        assert.isOk(!select[0].children[4].getAttribute("selected"));
    });

    it("widget persists defaultSelected property", function() {
        populateSelect();

        select[0].children[1].setAttribute("selected", "selected");
        select[0].children[2].setAttribute("selected", "selected");

        var multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);

        assert.isOk(!select[0].children[1].selected);
        assert.isOk(!select[0].children[2].selected);
        assert.isOk(select[0].children[1].defaultSelected);
        assert.isOk(select[0].children[2].defaultSelected);

        assert.isOk(select[0].children[3].selected);
        assert.isOk(select[0].children[4].selected);
        assert.isOk(!select[0].children[3].getAttribute("selected"));
        assert.isOk(!select[0].children[4].getAttribute("selected"));
    });

    it("persist tabIndex of the original element", function() {
        var multiselect = new MultiSelect($("<select tabindex='5'/>").appendTo(Mocha.fixture));

        var input = multiselect.input;

        assert.equal(input.attr("tabIndex"), 5);
        multiselect.destroy();
    });

    it("do not highlight first on open", function() {
        populateSelect();
        var multiselect = new MultiSelect(select, { highlightFirst: false });

        multiselect.open();

        assert.equal(multiselect.current(), null);
    });

    it("do not highlight first item on refresh", function() {
        populateSelect();
        var multiselect = new MultiSelect(select, { highlightFirst: false });

        multiselect.open();
        multiselect.refresh();

        assert.equal(multiselect.current(), null);
    });

    it("do not highlight when source is paged", function() {
        var multiselect = new MultiSelect(select, {
            dataSource: {
                data: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8"],
                pageSize: 2
            }
        });

        stub(multiselect.listView, {
            focusFirst: multiselect.listView.focusFirst
        });

        multiselect.dataSource.read();

        multiselect.dataSource.page(2);

        assert.equal(multiselect.listView.calls("focusFirst"), 1);
    });

    it("do not highlight first item when autoBind is false", function() {
        populateSelect();
        var multiselect = new MultiSelect(select, {
            highlightFirst: false,
            autoBind: false
        });

        multiselect.open();

        assert.equal(multiselect.current(), null);
    });

    it("Copy accesskey to the visible input", function() {
        populateSelect();
        var multiselect = new MultiSelect(select.attr("accesskey", "w"), { highlightFirst: false });

        assert.isOk(!multiselect.element.attr("accesskey"));
        assert.equal(multiselect.input.attr("accesskey"), "w");
    });

    it("should not render accesskey on its input when none is configured", function() {
        var multiselect = new MultiSelect(select);

        assert.isOk(!multiselect.input[0].hasAttribute("accesskey"));
    });

    it("MultiSelect honors readonly attribute", function() {
        var multiselect = new MultiSelect(select.attr("readonly", true));

        assert.equal(multiselect.element.attr("readonly"), "readonly");
        assert.equal(multiselect.element.attr("disabled"), undefined);
    });

    it("MultiSelect adds k-no-click to wrapper element when readonly", function() {
        var multiselect = new MultiSelect(select.attr("readonly", true));

        assert.isOk(multiselect.wrapper.hasClass('k-no-click'));
    });

    it("MultiSelect uses disabled attr over the readonly", function() {
        var multiselect = new MultiSelect(select.attr("readonly", true).attr("disabled", true));

        assert.equal(multiselect.input.attr("readonly"), undefined);
        assert.equal(multiselect.input.attr("disabled"), "disabled");
    });

    it("MultiSelect binds to simple data passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            value: [
                "Item1",
                "Item3"
            ]
        });

        assert.equal(multiselect.element.children().length, 2);
        assert.equal(multiselect.dataItems().length, 2);
    });

    it("MultiSelect selects an item which value field is an empty string", function() {
        var multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "id",
            dataSource: [
                { id: "", text: "text" },
                { id: "1", text: "text1" }
            ],
            value: [""]
        });

        assert.isOk(multiselect.element.children().first()[0].selected);
        assert.equal(multiselect.value(), "");
    });

    it("MultiSelect binds to complex data passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        assert.equal(multiselect.element.children().length, 2);
        assert.equal(multiselect.dataItems().length, 2);
        assert.equal(multiselect.value()[0], "1");
        assert.equal(multiselect.value()[1], "2");
    });

    it("MultiSelect binds to complex object passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: { optionID: "2", optionText: "Item2" }
        });

        assert.equal(multiselect.element.children().length, 1);
        assert.equal(multiselect.dataItems().length, 1);
        assert.equal(multiselect.value()[0], "2");
    });

    it("MultiSelect selects value even when values contains complex objects", function() {
        var multiselect = new MultiSelect(select, {
            dataSource: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ],
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        assert.equal(multiselect.element.children().length, 2);
        assert.equal(multiselect.dataItems().length, 2);
        assert.equal(multiselect.value()[0], "1");
        assert.equal(multiselect.value()[1], "2");
    });

    it("MultiSelect does nothing if autoBind:false and simple strings is set as value", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: ["1", "2"]
        });

        assert.equal(multiselect.element.children().length, 0);
        assert.equal(multiselect.dataItems().length, 0);
    });

    it("MultiSelect fetches data source on first manual search when autoBind: false and serverFiltering: false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            minLength: 3,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: function() {
                        assert.isOk(true);
                    }
                }
            },
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });
        multiselect.open();
        multiselect.search("test");
    });

    it("MultiSelect fetches data source on first search when autoBind: false and serverFiltering: false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            minLength: 3,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: function() {
                        assert.isOk(true);
                    }
                }
            },
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });
        multiselect.search("test");
    });

    it("MultiSelect passes normalized filter expression during initial source binding (autoBind: false)", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            minLength: 3,
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: "fake.url",
                    parameterMap: function(options) {
                        var filter = options.filter;

                        assert.equal(filter.filters.length, 1);
                        assert.equal(filter.logic, "and");
                    }
                }
            },
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        multiselect.search("test");
    });

    it("MultiSelect updates logic to 'and' on initial request", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            minLength: 3,
            dataSource: {
                serverFiltering: true,
                filter: {
                    filters: [{ field: "optionText", operator: "eq", value: "test" }],
                    logic: "or"
                },
                transport: {
                    read: "fake.url",
                    parameterMap: function(options) {
                        var filter = options.filter;

                        assert.equal(filter.filters.length, 1);
                        assert.equal(filter.logic, "and");
                    }
                }
            },
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        multiselect.search("test");
    });

    it("copy select title attribute to the visible input", function() {
        populateSelect();
        var multiselect = select.attr("title", "foo").kendoMultiSelect().data("kendoMultiSelect");
        var title = select.attr("title");

        assert.equal(multiselect.input.attr("title"), title);
    });

    it("MultiSelect updates selected text when selected items are changed", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { text: "item1", value: 1 },
                { text: "item2", value: 2 },
                { text: "item3", value: 3 },
                { text: "item4", value: 4 },
                { text: "item5", value: 5 }
            ]
        });

        var multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            value: ["1", "3", "5"]
        });

        dataSource.view()[2].set("text", "updated");

        var tags = multiselect.tagList.children(".k-chip");

        assert.equal(tags.length, 3);
        assert.equal(tags.eq(1).children(":first").text(), "updated");
    });

    it("MultiSelect updates selected value when selected items are changed", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { text: "item1", value: 1 },
                { text: "item2", value: 2 },
                { text: "item3", value: 3 },
                { text: "item4", value: 4 },
                { text: "item5", value: 5 }
            ]
        });

        var multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            value: [1, 3, 5]
        });

        dataSource.view()[2].set("value", "updated");

        var options = multiselect.element.children();

        assert.equal(options.eq(2).val(), "updated");
    });

    it("MultiSelect is disabled when placed in disabled fieldset", function() {
        $(select).wrap('<fieldset disabled="disabled"></fieldset>');
        select.kendoMultiSelect().data("kendoMultiSelect");
        assert.equal(select.attr("disabled"), "disabled");
    });

    it("MultiSelect doesn't re-render options on list change when value exists", function() {
        populateSelect();

        var multiselect = select.kendoMultiSelect().data("kendoMultiSelect");

        stub(multiselect, {
            _render: multiselect._render
        });

        multiselect.value([1, 3, 5]);

        assert.equal(multiselect.calls("_render"), 0);
    });

    //no data template
    it("MultiSelect builds a noDataTemplate", function() {
        var multiselect = new MultiSelect(select, {
            noDataTemplate: () => "test"
        });

        assert.isOk(multiselect.noDataTemplate);
    });

    it("render nodata container", function() {
        var multiselect = new MultiSelect(select, {
            noDataTemplate: () => "test"
        });

        assert.isOk(multiselect.noData);
        assert.isOk(multiselect.noData.hasClass("k-no-data"));
        assert.equal(multiselect.noData.text(), multiselect.options.noDataTemplate());
    });

    it("render nodata before footerTemplate", function() {
        var multiselect = new MultiSelect(select, {
            noDataTemplate: () => "test",
            footerTemplate: () => "footer"
        });

        assert.isOk(multiselect.noData.next().hasClass("k-list-footer"));
    });

    it("hides noData template if any data", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            noDataTemplate: () => "no data",
            template: ({ name }) => name
        });

        multiselect.open();

        assert.isOk(!multiselect.noData.is(":visible"));
    });

    it("shows noData template if no data", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            noDataTemplate: () => "no data",
            template: ({ name }) => name
        });

        multiselect.open();

        assert.isOk(multiselect.noData.is(":visible"));
    });

    it("hides noData template if widget is bound on subsequent call", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            noDataTemplate: () => "no data",
            template: ({ name }) => name
        });

        multiselect.open();

        assert.isOk(multiselect.noData.is(":visible"));

        multiselect.dataSource.data([
            { name: "item1", type: "a" },
            { name: "item2", type: "a" },
            { name: "item3", type: "b" }
        ]);

        assert.isOk(!multiselect.noData.is(":visible"));
    });

    it("update noData template on dataBound", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: true,
            noDataTemplate: ({ instance }) => instance.dataSource.total()
        });

        var noData = multiselect.noData;

        multiselect.dataSource.data(["Item1"]);

        assert.equal(noData.text(), multiselect.dataSource.total());
    });

    it("adds class hidden to the wrapper if clearButton is enabled and value is null", function() {
        var multiselect = new MultiSelect(select, {
            clearButton: true
        });

        multiselect._hideBusy();

        assert.isOk(multiselect._clear.hasClass("k-hidden"));
    });

    it("down arrow is rendered if configured", function() {
        var multiselect = new MultiSelect(select, {
            downArrow: true
        });

        assert.equal(multiselect._arrow.length, 1);
        assert.equal(multiselect.wrapper.find("> .k-input-button > .k-svg-i-caret-alt-down").length, 1);
    });

    it("k-multiselect-wrap-arrow class is applied when down arrow is configured", function() {
        var multiselect = new MultiSelect(select, {
            downArrow: true
        });

        assert.equal(multiselect._arrow.length, 1);
    });

    it("styling options - fillMode", function() {
        var multiselect = new MultiSelect(select, {
            fillMode: "outline"
        });

        assert.isOk(multiselect.wrapper.hasClass("k-input-outline"));
    });

    it("styling options - size", function() {
        var multiselect = new MultiSelect(select, {
            size: "small"
        });

        assert.isOk(multiselect.wrapper.hasClass("k-input-sm"));
    });

    it("styling options - rounded", function() {
        var multiselect = new MultiSelect(select, {
            rounded: "large"
        });

        assert.isOk(multiselect.wrapper.hasClass("k-rounded-lg"));
    });

    it("styling options - checks for valid options", function() {
        var multiselect = new MultiSelect(select, {
            size: "full"
        });

        assert.isNotOk(multiselect.wrapper.hasClass("k-rounded-large")); // Does not add valid class for other option
        assert.isNotOk(multiselect.wrapper.hasClass("k-input-full")); // Does not add invalid class with prefix
        assert.isNotOk(multiselect.wrapper.hasClass("k-input-md")); // Does not add default class for the option
        assert.isOk(multiselect.wrapper.hasClass("k-rounded-md")); // Adds default class for other options
    });

    it("renders not-floating label from string", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            label: "Label"
        });

        assert.equal(multiselect.label.element.text(), "Label");
        assert.isNotOk(!!multiselect.label.floatingLabel);
    });

    it("renders label from object", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            label: {
                content: "some label"
            }
        });

        assert.equal(multiselect.label.element.text(), "some label");
    });

    it("renders floating label", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            label: {
                content: "some label",
                floating: true
            }
        });

        assert.equal(multiselect.label.element.text(), "some label");
        assert.isOk(!!multiselect.label.floatingLabel);
    });

    it("renders label with funciton", function() {
        var multiselect = new MultiSelect(select, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [ ]
            },
            label: () => `some label`
        });

        assert.equal(multiselect.label.element.text(), "some label");
    });
    });
}());
