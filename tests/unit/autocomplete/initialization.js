import '@progress/kendo-ui/src/kendo.autocomplete.js';

let AutoComplete = kendo.ui.AutoComplete,
    input;

describe("kendo.ui.AutoComplete initialization", function() {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("kendoAutoComplete attaches a autocomplete object to target", function() {
        input.kendoAutoComplete({ data: [] });

        assert.isOk(input.data("kendoAutoComplete") instanceof AutoComplete);
    });

    it("data source is initialized from options.dataSource when array is passed", function() {
        let data = [1, 2];
        let autocomplete = new AutoComplete(input, {
            dataSource: data
        });

        assert.isOk(autocomplete.dataSource);
        autocomplete.dataSource.read();
        assert.equal(autocomplete.dataSource.data().length, 2);
    });

    it("data source is initialized from options.dataSource", function() {
        let data = [1, 2], autocomplete = new AutoComplete(input, {
            dataSource: {
                data: data
            }
        });

        assert.isOk(autocomplete.dataSource);
        autocomplete.dataSource.read();
        assert.equal(autocomplete.dataSource.data().length, 2);
    });

    it("do not open on dataSource.query", function() {
        let data = [1, 2], autocomplete = new AutoComplete(input, {
            dataSource: {
                data: data
            }
        });

        autocomplete.dataSource.fetch();

        assert.isOk(!autocomplete.popup.visible());
    });

    it("rendering honers dataTextField", function() {
        let data = [{ text: 1 }, { text: 2 }], autocomplete = new AutoComplete(input, {
            dataSource: data,
            dataTextField: "text"
        });

        autocomplete.dataSource.query();

        assert.equal(autocomplete.ul.children().eq(0).text(), "1");
    });

    it("autocomplate initializes a UL for its items", function() {
        let autocomplete = new AutoComplete(input, []);

        assert.isOk(autocomplete.ul);
        assert.isOk(autocomplete.ul.is("ul"));
    });

    it("autocomplate initializes a popup for its items", function() {
        let autocomplete = new AutoComplete(input, []);

        assert.isOk(autocomplete.popup);
        assert.isOk(autocomplete.popup instanceof kendo.ui.Popup);
        assert.isOk(autocomplete.popup.options.anchor[0], input[0]);
        assert.isOk(autocomplete.popup.element[0], autocomplete.ul[0]);
    });

    it("autocomplete populates its list when the datasource changes", function() {
        let autocomplete = new AutoComplete(input, ["foo", "bar"]);

        autocomplete.dataSource.read();

        assert.equal(autocomplete.ul.children("li").length, 2);
        assert.equal(autocomplete.ul.children("li").first().text(), "foo");
    });

    it("autocomplete sets default item template", function() {
        let autocomplete = new AutoComplete(input);

        let template = autocomplete.listView.options.template;
        let result = template("abc");

        assert.equal(result, "abc");
    });

    it("autocomplete sets default item template using dataTextField option", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "customField"
        });

        let template = autocomplete.listView.options.template;
        let result = template({ customField: "abc" });

        assert.equal(result, "abc");
    });

    it("autocomplete sets custom item template", function() {
        let autocomplete = new AutoComplete(input, {
            template: (data) => data.toUpperCase()
        });

        let template = autocomplete.listView.options.template;
        let result = template("abc");

        assert.equal(result, "ABC");
    });

    it("autocomplete sets a default group template", function() {
        let autocomplete = new AutoComplete(input, {
        });

        let template = autocomplete.listView.options.groupTemplate;
        let result = template("abc");

        assert.equal(result, "abc");
    });

    it("autocomplete supports setting a custom group template", function() {
        let autocomplete = new AutoComplete(input, {
            groupTemplate: (data) => data.toUpperCase()
        });

        let template = autocomplete.listView.options.groupTemplate;
        let result = template("abc");

        assert.equal(result, "ABC");
    });

    it("autocomplete sets a default fixed group template", function() {
        let autocomplete = new AutoComplete(input, {
        });

        let template = autocomplete.listView.options.fixedGroupTemplate;
        let result = template("abc");

        assert.equal(result, "abc");
    });

    it("autocomplete supports setting a custom fixed group template", function() {
        let autocomplete = new AutoComplete(input, {
            fixedGroupTemplate: (data) => data.toUpperCase()
        });

        let template = autocomplete.listView.options.fixedGroupTemplate;
        let result = template("abc");

        assert.equal(result, "ABC");
    });

    it("defining header template", function() {
        let autocomplete = new AutoComplete(input, {
            template: (data) => data.toUpperCase(),
            headerTemplate: () => "<div id='t'>Header</div>"
        });

        let list = autocomplete.list;

        assert.equal(list.prev()[0].outerHTML, '<div id="t">Header</div>');
    });

    it("render footer container", function() {
        let autocomplete = new AutoComplete(input, {
            footerTemplate: () => "footer"
        });

        let footer = autocomplete.footer;

        assert.isOk(footer);
        assert.isOk(footer.hasClass("k-list-footer"));
    });

    it("render footer template", function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["Item1"],
            footerTemplate: () => "footer"
        });

        let footer = autocomplete.footer;

        autocomplete.search("item");

        assert.equal(footer.html(), "footer");
    });

    it("compile footer template with the autocomplete instance", function() {
        let autocomplete = new AutoComplete(input, {
            autoBind: true,
            footerTemplate: ({ instance }) => instance.dataSource.total()
        });

        let footer = autocomplete.footer;

        assert.equal(footer.html(), autocomplete.dataSource.total());
    });

    it("update footer template on dataBound", function() {
        let autocomplete = new AutoComplete(input, {
            autoBind: true,
            footerTemplate: ({ instance }) => instance.dataSource.total()
        });

        let footer = autocomplete.footer;

        autocomplete.dataSource.data(["Item1"]);

        assert.equal(footer.html(), autocomplete.dataSource.total());
    });

    it("adjust height if footer template", function() {
        let autocomplete = new AutoComplete(input, {
            animation: false,
            autoBind: false,
            dataSource: ["item1", "item2", "item3", "item4", "item5"],
            footerTemplate: () => "<div>Footer</div>",
            height: 100
        });

        autocomplete.search("item");

        assert.isOk(autocomplete.listView.content.height() < 100);
    });

    it("highlight first item", function() {
        let autocomplete = new AutoComplete(input, {
            animation: false,
            dataSource: ["1", "2", "3"],
            highlightFirst: true
        });

        autocomplete.search("1");

        assert.isOk(autocomplete.ul.children().eq(0).hasClass("k-focus"));
    });

    it("resetting dataSource detaches the previouse events", function() {
        let autocomplete = new AutoComplete(input);

        let dataSource = autocomplete.dataSource;

        autocomplete.setDataSource({});

        autocomplete.bind("dataBound", function() {
            assert.isOk(false, "Change event is not detached");
        });

        dataSource.read();
    });

    it("resetting DataSource rebinds the widget", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text"
        });

        let dataSource = new kendo.data.DataSource({
            data: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
        });

        autocomplete.setDataSource(dataSource);

        assert.strictEqual(autocomplete.dataSource, dataSource);
    });

    it("dataItem() returns dataItem depending on passed index", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
        });

        autocomplete.dataSource.read();

        assert.equal(autocomplete.dataItem(1), autocomplete.dataSource.view()[1]);
    });

    it("dataItem() returns dataItem depending on passed dom elements", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
        });

        autocomplete.dataSource.read();

        assert.equal(autocomplete.dataItem(autocomplete.items()[1]), autocomplete.dataSource.view()[1]);
    });

    it("dataItem() returns null if no argument", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
        });

        assert.equal(autocomplete.dataItem(), null);
    });

    it("Value of the autocomplete is empty string when placeholder is used", function() {
        let autocomplete = new AutoComplete(input, {
            placeholder: "input..."
        });

        assert.equal(autocomplete.value(), "");
    });

    it("destroy method works", function() {
        let autocomplete = new AutoComplete(input, {
            placeholder: "input..."
        });

        autocomplete.destroy();
        assert.isOk(true);
    });

    //loading
    it("AutoComplete creates loading element", function() {
        let autocomplete = new AutoComplete(input);

        assert.isOk(autocomplete._loading);
    });
    /*
    asyncTest("AutoComplete shows loading icon on progress", function(done) {
        let autocomplete = new AutoComplete(input);

        autocomplete.dataSource.trigger("progress");

        setTimeout(function() {
            assert.notEqual(autocomplete._loading.css("display"), "none");
            done();
        }, 200);
    });

    asyncTest("AutoComplete hides loading icon on dataSource change", function(done) {
        let autocomplete = new AutoComplete(input);

        autocomplete._showBusy();

        setTimeout(function() {
            autocomplete.refresh();

            assert.equal(autocomplete._loading.css("display"), "none");
            done();
        }, 200);
    });
    */
    it("AutoComplete sets ignoreCase option to false", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "ID",
            dataSource: {
                data: [
                    { ID: 1 }
                ],
                schema: {
                    model: {
                        fields: {
                            ID: {
                                type: "number"
                            }
                        }
                    }
                }
            }
        });

        assert.equal(autocomplete.options.ignoreCase, false);
    });

    it("readonly() makes input element readonly", function() {
        let autocomplete = new AutoComplete(input);

        autocomplete.readonly();

        assert.include(["readonly", "true"], autocomplete.element.attr("readonly"));
    });

    it("readonly(false) removes readonly attribute", function() {
        let autocomplete = new AutoComplete(input);

        autocomplete.readonly();
        autocomplete.readonly(false);

        assert.equal(autocomplete.element.attr("readonly"), undefined);
    });

    it("readonly() removes disabled attribute and disabled class", function() {
        let autocomplete = new AutoComplete(input);

        autocomplete.enable(false);
        autocomplete.readonly();

        assert.include(["readonly", "true"], autocomplete.element.attr("readonly"));
        assert.equal(autocomplete.element.attr("disabled"), undefined);
        assert.isOk(!autocomplete.wrapper.hasClass("k-disabled"));
    });

    it("enable(false) removes readonly attribute and default class", function() {
        let autocomplete = new AutoComplete(input);

        autocomplete.readonly();
        autocomplete.enable(false);

        assert.equal(autocomplete.element.attr("readonly"), undefined);
        assert.include(["disabled", "true"], autocomplete.element.attr("disabled"));
        assert.isOk(autocomplete.wrapper.hasClass("k-disabled"));
    });

    it("enable() enables widget after readonly()", function() {
        let autocomplete = new AutoComplete(input);

        autocomplete.readonly();
        autocomplete.enable();

        assert.equal(autocomplete.element.attr("readonly"), undefined);
        assert.equal(autocomplete.element.attr("disabled"), undefined);
        assert.isOk(!autocomplete.wrapper.hasClass("k-disabled"));
    });

    it("enable(false) hides clear icon", function() {
        let autocomplete = new AutoComplete(input, {
            value: "Montana"
        });

        autocomplete.enable(false);

        assert.isOk(autocomplete._clear.hasClass("k-hidden"));
    });

    it("readonly(true) hides clear icon", function() {
        let autocomplete = new AutoComplete(input, {
            value: "Montana"
        });

        autocomplete.readonly(true);

        assert.isOk(autocomplete._clear.hasClass("k-hidden"));
    });

    it("AutoComplete honors readonly attribute", function() {
        let autocomplete = new AutoComplete(input.attr("readonly", true));

        assert.include(["readonly", "true"], autocomplete.element.attr("readonly"));
        assert.equal(autocomplete.element.attr("disabled"), undefined);
    });

    it("AutoComplete uses disabled attr over the readonly", function() {
        let autocomplete = new AutoComplete(input.attr("readonly", true).attr("disabled", true));

        assert.equal(input.attr("readonly"), undefined);
    });

    it("AutoComplete does not focus input if refresh triggered from dataSource", function() {
        let autocomplete = new AutoComplete(input);
        autocomplete.suggest("test");

        assert.notEqual(input[0], document.activeElement);
    });

    it("AutoComplete uses input value if options.value is null", function() {
        let autocomplete = new AutoComplete(input.val("test"));

        assert.equal(input.val(), "test");
    });

    it("AutoComplete adds scrollbar width to the fixed group header padding", function() {
        let dataSource = new kendo.data.DataSource({
            data: [
                { value: "1" },
                { value: "2" },
                { value: "3" },
                { value: "4" },
                { value: "5" }
            ],
            group: "value"
        });

        let autocomplete = input.kendoAutoComplete({
            animation: false,
            dataSource: dataSource,
            height: 50
        }).data("kendoAutoComplete");

        let padding = autocomplete.list.find(".k-list-group-sticky-header").css("padding-right");

        autocomplete.dataSource.read();
        autocomplete.popup.open();

        padding = autocomplete.list.find(".k-list-group-sticky-header").css("padding-right");

        assert.isOk(parseFloat(padding) > 0);
    });

    it("AutoComplete calculates popup height properly when ul has overflow-x styling", function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["item1", "item2", "item3", "item4", "item5"],
            height: 50
        });

        autocomplete.ul.css("overflow-x", "hidden");

        autocomplete.search("item");

        let list = autocomplete.list;

        assert.equal(list.height(), 50);
    });

    it("AutoComplete does not add scrollbar width if popup is shorter then options.height", function() {
        let dataSource = new kendo.data.DataSource({
            data: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 }
            ],
            group: "value"
        });

        let autocomplete = input.kendoAutoComplete({
            animation: false,
            dataSource: dataSource,
            height: 350
        }).data("kendoAutoComplete");

        autocomplete.dataSource.read();
        autocomplete.popup.open();

        let padding = autocomplete.list.find(".k-list-group-sticky-header").css("padding-right");

        assert.isOk(parseFloat(padding) < 15);
    });

    it("setOptions updates listView template when dataTextField is set", function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
            dataTextField: "name",
            filter: "startswith"
        });

        autocomplete.dataSource.read();

        autocomplete.setOptions({
            dataTextField: "anotherName"
        });

        let result = autocomplete.listView.options.template({ anotherName: "abc" });

        assert.equal(result, "abc");
    });

    it("setOptions updates listView dataValueField when dataTextField is set", function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
            dataTextField: "name",
            filter: "startswith"
        });

        autocomplete.dataSource.read();

        autocomplete.setOptions({
            dataTextField: "anotherName"
        });

        assert.equal(autocomplete.listView.options.dataValueField, "anotherName");
    });

    it("setOptions method updates footer template", function() {
        let autocomplete = new AutoComplete(input, {});

        autocomplete.setOptions({ footerTemplate: () => "footer" });

        assert.equal(autocomplete.footer.html(), "footer");
    });

    it("setOptions method hides footer template", function() {
        let autocomplete = new AutoComplete(input, {
            footerTemplate: () => "footer"
        });

        autocomplete.setOptions({ footerTemplate: null });

        assert.equal(autocomplete.footer, null);
    });

    it("setOptions method updates header template", function() {
        let autocomplete = new AutoComplete(input, {});

        autocomplete.setOptions({ headerTemplate: () => "<div>header</div>" });

        assert.equal(autocomplete.header.html(), "header");
    });

    it("setOptions method hides header template", function() {
        let autocomplete = new AutoComplete(input, {
            headerTemplate: () => "<div>Header</div>"
        });

        autocomplete.setOptions({ headerTemplate: null });

        assert.equal(autocomplete.header, null);
    });

    it("readonly method sets input to readonly", function() {
        let autocomplete = new AutoComplete(input);
        autocomplete.readonly(true);
        autocomplete.element.focus();

        assert.include(["readonly", "true"], autocomplete.element.attr("readonly"));
    });

    it("AutoComlete is disabled when placed in disabled fieldset", function() {
        $(input).wrap('<fieldset disabled="disabled"></fieldset>');
        input.kendoAutoComplete().data("kendoAutoComplete");
        assert.include(["disabled", "true"], input.attr("disabled"));
    });

    //no data template
    it("AutoComplete builds a noDataTemplate", function() {
        let autocomplete = new AutoComplete(input, {
            noDataTemplate: () => "test"
        });

        assert.isOk(autocomplete.noDataTemplate);
    });

    it("render nodata container", function() {
        let autocomplete = new AutoComplete(input, {
            noDataTemplate: () => "test"
        });

        autocomplete.search("test");

        assert.isOk(autocomplete.noData);
        assert.isOk(autocomplete.noData.hasClass("k-no-data"));
        assert.equal(autocomplete.noData.text(), autocomplete.options.noDataTemplate());
    });

    it("render nodata before footerTemplate", function() {
        let autocomplete = new AutoComplete(input, {
            noDataTemplate: () => "test",
            footerTemplate: () => "footer"
        });

        assert.isOk(autocomplete.noData.next().hasClass("k-list-footer"));
    });

    it("hides noData template if any data", function() {
        let autocomplete = new AutoComplete(input, {
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
            template: (data) => data.name
        });

        autocomplete.search("item");

        assert.isOk(!autocomplete.noData.is(":visible"));
    });

    it("shows noData template if no data", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: []
            },
            noDataTemplate: () => "no data",
            template: (data) => data.name
        });

        autocomplete.search("item");

        assert.isOk(autocomplete.noData.is(":visible"));
    });

    it("hides noData template if widget is bound on subsequent call", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: []
            },
            noDataTemplate: () => "no data",
            template: (data) => data.name
        });

        autocomplete.search("item");

        assert.isOk(autocomplete.noData.is(":visible"));

        autocomplete.dataSource.data([
            { name: "item1", type: "a" },
            { name: "item2", type: "a" },
            { name: "item3", type: "b" }
        ]);

        assert.isOk(!autocomplete.noData.is(":visible"));
    });

    it("update noData template on dataBound", function() {
        let autocomplete = new AutoComplete(input, {
            autoBind: true,
            noDataTemplate: ({ instance }) => instance.dataSource.total()
        });

        let noData = autocomplete.noData;

        autocomplete.dataSource.data(["Item1"]);

        assert.equal(noData.text(), autocomplete.dataSource.total());
    });

    it("setOptions re-renders noDataTemplate", function() {
        let autocomplete = new AutoComplete(input, {
            noDataTemplate: () => "test"
        });

        autocomplete.setOptions({
            noDataTemplate: () => "no data"
        });

        assert.equal(autocomplete.noData.text(), "no data");
    });

    it("setOptions removes noData template", function() {
        let autocomplete = new AutoComplete(input, {
            noDataTemplate: () => "test"
        });

        autocomplete.setOptions({
            noDataTemplate: null
        });

        assert.equal(autocomplete.noData, null);
    });

    it("hide group header when no data loaded", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", value: "1" },
                    { name: "item2", value: "2" },
                    { name: "item3", value: "3" }
                ],
                group: "name"
            },
            template: (data) => data.name
        });

        autocomplete.search("test");
        let groupHeader = autocomplete.list.find(".k-list-group-sticky-header");
        assert.equal(groupHeader.css("display"), "none");
    });

    it("renders not-floating label from string", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", value: "1" },
                    { name: "item2", value: "2" },
                    { name: "item3", value: "3" }
                ],
                group: "name"
            },
            label: "Label"
        });

        assert.equal(autocomplete.label.element.text(), "Label");
        assert.isNotOk(!!autocomplete.label.floatingLabel);
    });

    it("renders label from object", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", value: "1" },
                    { name: "item2", value: "2" },
                    { name: "item3", value: "3" }
                ],
                group: "name"
            },
            label: {
                content: "some label"
            }
        });

        assert.equal(autocomplete.label.element.text(), "some label");
    });

    it("renders floating label", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", value: "1" },
                    { name: "item2", value: "2" },
                    { name: "item3", value: "3" }
                ],
                group: "name"
            },
            label: {
                content: "some label",
                floating: true
            }
        });

        autocomplete.label.element.before("<div>TEST</div>");
        assert.equal(autocomplete.label.element.text(), "some label");
        assert.isOk(!!autocomplete.label.floatingLabel);
    });

    it("renders label with funciton", function() {
        let autocomplete = new AutoComplete(input, {
            dataValueField: "name",
            dataTextField: "name",
            dataSource: {
                data: [
                    { name: "item1", value: "1" },
                    { name: "item2", value: "2" },
                    { name: "item3", value: "3" }
                ],
                group: "name"
            },
            label: () => `some label`
        });

        assert.equal(autocomplete.label.element.text(), "some label");
    });
});
