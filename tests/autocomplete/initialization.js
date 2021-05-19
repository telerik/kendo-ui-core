(function(){

var AutoComplete = kendo.ui.AutoComplete;
var input;

describe("kendo.ui.AutoComplete initialization", function () {
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
    var data = [1, 2];
    var autocomplete = new AutoComplete(input, {
        dataSource: data
    });

    assert.isOk(autocomplete.dataSource);
    autocomplete.dataSource.read();
    assert.equal(autocomplete.dataSource.data().length, 2);
});

it("data source is initialized from options.dataSource", function() {
    var data = [1, 2], autocomplete = new AutoComplete(input, {
        dataSource: {
            data: data
        }
    });

    assert.isOk(autocomplete.dataSource);
    autocomplete.dataSource.read();
    assert.equal(autocomplete.dataSource.data().length, 2);
});

it("do not open on dataSource.query", function() {
    var data = [1, 2], autocomplete = new AutoComplete(input, {
        dataSource: {
            data: data
        }
        });

    autocomplete.dataSource.fetch();

    assert.isOk(!autocomplete.popup.visible());
});

it("rendering honers dataTextField", function() {
    var data = [{text: 1}, {text: 2}], autocomplete = new AutoComplete(input, {
        dataSource: data,
        dataTextField: "text"
    });

    autocomplete.dataSource.query();

    assert.equal(autocomplete.ul.children().eq(0).text(), "1");
});

it("autocomplate initializes a UL for its items", function() {
    var autocomplete = new AutoComplete(input, []);

    assert.isOk(autocomplete.ul);
    assert.isOk(autocomplete.ul.is("ul"));
});

it("autocomplate initializes a popup for its items", function() {
    var autocomplete = new AutoComplete(input, []);

    assert.isOk(autocomplete.popup);
    assert.isOk(autocomplete.popup instanceof kendo.ui.Popup);
    assert.isOk(autocomplete.popup.options.anchor[0], input[0]);
    assert.isOk(autocomplete.popup.element[0], autocomplete.ul[0]);
});

it("autocomplete populates its list when the datasource changes", function() {
    var autocomplete = new AutoComplete(input, ["foo", "bar"]);

    autocomplete.dataSource.read();

    assert.equal(autocomplete.ul.children("li").length, 2);
    assert.equal(autocomplete.ul.children("li").first().text(), "foo");
});

it("autocomplete sets default item template", function() {
    var autocomplete = new AutoComplete(input);

    var template = autocomplete.listView.options.template;

    assert.equal(template, "#:data#");
});

it("autocomplete sets default item template using dataTextField option", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "test"
    });

    var template = autocomplete.listView.options.template;

    assert.equal(template, "#:data.test#");
});

it("autocomplete sets custom item template", function() {
    var autocomplete = new AutoComplete(input, {
        template: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.template;

    assert.equal(template, "#= data.toUpperCase() #");
});

it("autocomplete sets a default group template", function() {
    var autocomplete = new AutoComplete(input, {
    });

    var template = autocomplete.listView.options.groupTemplate;

    assert.equal(template, "#:data#");
});

it("autocomplete supports setting a custom group template", function() {
    var autocomplete = new AutoComplete(input, {
        groupTemplate: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.groupTemplate;

    assert.equal(template, "#= data.toUpperCase() #");
});

it("autocomplete sets a default fixed group template", function() {
    var autocomplete = new AutoComplete(input, {
    });

    var template = autocomplete.listView.options.fixedGroupTemplate;

    assert.equal(template, "#:data#");
});

it("autocomplete supports setting a custom fixed group template", function() {
    var autocomplete = new AutoComplete(input, {
        fixedGroupTemplate: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.fixedGroupTemplate;

    assert.equal(template, "#= data.toUpperCase() #");
});

it("defining header template", function() {
    var autocomplete = new AutoComplete(input, {
        template: "#= data.toUpperCase() #",
        headerTemplate: "<div>Header</div>"
    });

    var list = autocomplete.list;

    assert.equal(list.children()[0].outerHTML, "<div>Header</div>");
});

it("render footer container", function() {
    var autocomplete = new AutoComplete(input, {
        footerTemplate: "footer"
    });

    var footer = autocomplete.footer;

    assert.isOk(footer);
    assert.isOk(footer.hasClass("k-footer"));
});

it("render footer template", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Item1"],
        footerTemplate: "footer"
    });

    var footer = autocomplete.footer;

    autocomplete.search("item");

    assert.equal(footer.html(), "footer");
});

it("compile footer template with the autocomplete instance", function() {
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = autocomplete.footer;

    assert.equal(footer.html(), autocomplete.dataSource.total());
});

it("update footer template on dataBound", function() {
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = autocomplete.footer;

    autocomplete.dataSource.data(["Item1"]);

    assert.equal(footer.html(), autocomplete.dataSource.total());
});

it("adjust height if footer template", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        autoBind: false,
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        footerTemplate: "<div>Footer</div>",
        height: 100
    });

    autocomplete.search("item");

    assert.isOk(autocomplete.listView.content.height() < 100);
});

it("highlight first item", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: ["1", "2", "3"],
        highlightFirst: true
    });

    autocomplete.search("1");

    assert.isOk(autocomplete.ul.children().eq(0).hasClass("k-state-focused"));
});

it("resetting dataSource detaches the previouse events", function() {
    var autocomplete = new AutoComplete(input);

    var dataSource = autocomplete.dataSource;

    autocomplete.setDataSource({});

    autocomplete.bind("dataBound", function() {
        assert.isOk(false, "Change event is not detached");
    });

    dataSource.read();
});

it("resetting DataSource rebinds the widget", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text"
    });

    var dataSource = new kendo.data.DataSource({
        data:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.setDataSource(dataSource);

    assert.strictEqual(autocomplete.dataSource, dataSource);
});

it("dataItem() returns dataItem depending on passed index", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.dataSource.read();

    assert.equal(autocomplete.dataItem(1), autocomplete.dataSource.view()[1]);
});

it("dataItem() returns dataItem depending on passed dom elements", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.dataSource.read();

    assert.equal(autocomplete.dataItem(autocomplete.items()[1]), autocomplete.dataSource.view()[1]);
});

it("dataItem() returns null if no argument", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    assert.equal(autocomplete.dataItem(), null);
});

it("Value of the autocomplete is empty string when placeholder is used", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "input..."
    });

    assert.equal(autocomplete.value(), "");
});

it("destroy method works", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "input..."
    });

    autocomplete.destroy();
    assert.isOk(true);
});

//loading
it("AutoComplete creates loading element", function() {
    var autocomplete = new AutoComplete(input);

    assert.isOk(autocomplete._loading);
});
/*
it("AutoComplete shows loading icon on progress", function(done) {
    var autocomplete = new AutoComplete(input);

    autocomplete.dataSource.trigger("progress");

    setTimeout(function() {
        assert.notEqual(autocomplete._loading.css("display"), "none");
        done();
    }, 200);
});

it("AutoComplete hides loading icon on dataSource change", function(done) {
    var autocomplete = new AutoComplete(input);

    autocomplete._showBusy();

    setTimeout(function() {
        autocomplete.refresh();

        assert.equal(autocomplete._loading.css("display"), "none");
        done();
    }, 200);
});
*/
it("AutoComplete sets ignoreCase option to false", function() {
    var autocomplete = new AutoComplete(input, {
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
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();

    assert.equal(autocomplete.element.attr("readonly"), "readonly");
});

it("readonly(false) removes readonly attribute", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.readonly(false);

    assert.equal(autocomplete.element.attr("readonly"), undefined);
});

it("readonly() removes disabled attribute and disabled class", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.enable(false);
    autocomplete.readonly();

    assert.equal(autocomplete.element.attr("readonly"), "readonly");
    assert.equal(autocomplete.element.attr("disabled"), undefined);
    assert.isOk(autocomplete.wrapper.hasClass("k-state-default"));
    assert.isOk(!autocomplete.wrapper.hasClass("k-state-disabled"));
});

it("enable(false) removes readonly attribute and default class", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.enable(false);

    assert.equal(autocomplete.element.attr("readonly"), undefined);
    assert.equal(autocomplete.element.attr("disabled"), "disabled");
    assert.isOk(!autocomplete.wrapper.hasClass("k-state-default"));
    assert.isOk(autocomplete.wrapper.hasClass("k-state-disabled"));
});

it("enable() enables widget after readonly()", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.enable();

    assert.equal(autocomplete.element.attr("readonly"), undefined);
    assert.equal(autocomplete.element.attr("disabled"), undefined);
    assert.isOk(autocomplete.wrapper.hasClass("k-state-default"));
    assert.isOk(!autocomplete.wrapper.hasClass("k-state-disabled"));
});

it("AutoComplete honors readonly attribute", function() {
    var autocomplete = new AutoComplete(input.attr("readonly", true));

    assert.equal(autocomplete.element.attr("readonly"), "readonly");
    assert.equal(autocomplete.element.attr("disabled"), undefined);
});

it("AutoComplete uses disabled attr over the readonly", function() {
    var autocomplete = new AutoComplete(input.attr("readonly", true).attr("disabled", true));

    assert.equal(input.attr("readonly"), undefined);
});

it("AutoComplete does not focus input if refresh triggered from dataSource", function() {
    var autocomplete = new AutoComplete(input);
    autocomplete.suggest("test");

    assert.notEqual(input[0], document.activeElement);
});

it("AutoComplete uses input value if options.value is null", function() {
    var autocomplete = new AutoComplete(input.val("test"));

    assert.equal(input.val(), "test");
});

it("AutoComplete adds scrollbar width to the fixed group header padding", function() {
    var dataSource = new kendo.data.DataSource({
        data: [
            { value: "1" },
            { value: "2" },
            { value: "3" },
            { value: "4" },
            { value: "5" }
        ],
        group: "value"
    });

    var autocomplete = input.kendoAutoComplete({
        animation: false,
        dataSource: dataSource,
        height: 50
    }).data("kendoAutoComplete");

    var padding = autocomplete.list.find(".k-group-header").css("padding-right");

    autocomplete.dataSource.read();
    autocomplete.popup.open();

    var padding = autocomplete.list.find(".k-group-header").css("padding-right");

    assert.isOk(parseFloat(padding) > 0);
});

it("AutoComplete calculates popup height properly when ul has overflow-x styling", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        height: 50
    });

    autocomplete.ul.css("overflow-x", "hidden");

    autocomplete.search("item");

    var list = autocomplete.list;

    assert.equal(list.height(), 50);
});

it("AutoComplete does not add scrollbar width if popup is shorter then options.height", function() {
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

    var autocomplete = input.kendoAutoComplete({
        animation: false,
        dataSource: dataSource,
        height: 350
    }).data("kendoAutoComplete");

    autocomplete.dataSource.read();
    autocomplete.popup.open();

    var padding = autocomplete.list.find(".k-group-header").css("padding-right");

    assert.isOk(parseFloat(padding) < 15);
});

it("setOptions updates listView template when dataTextField is set", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
        dataTextField: "name",
        filter: "startswith"
    });

    autocomplete.dataSource.read();

    autocomplete.setOptions({
        dataTextField: "anotherName"
    });

    assert.equal(autocomplete.listView.options.template, "#:data.anotherName#");
});

it("setOptions updates listView dataValueField when dataTextField is set", function() {
    var autocomplete = new AutoComplete(input, {
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
    var autocomplete = new AutoComplete(input, { });

    autocomplete.setOptions({ footerTemplate: "footer" });

    assert.equal(autocomplete.footer.html(), "footer");
});

it("setOptions method hides footer template", function() {
    var autocomplete = new AutoComplete(input, {
        footerTemplate: "footer"
    });

    autocomplete.setOptions({ footerTemplate: "" });

    assert.equal(autocomplete.footer, null);
});

it("setOptions method updates header template", function() {
    var autocomplete = new AutoComplete(input, { });

    autocomplete.setOptions({ headerTemplate: "<div>header</div>" });

    assert.equal(autocomplete.header.html(), "header");
});

it("setOptions method hides header template", function() {
    var autocomplete = new AutoComplete(input, {
        headerTemplate: "<div>Header</div>"
    });

    autocomplete.setOptions({ headerTemplate: "" });

    assert.equal(autocomplete.header, null);
});

it("AutoComlete is disabled when placed in disabled fieldset", function() {
     $(input).wrap('<fieldset disabled="disabled"></fieldset>');
     input.kendoAutoComplete().data("kendoAutoComplete");
     assert.equal(input.attr("disabled"), "disabled");
});

//no data template
it("AutoComplete builds a noDataTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    assert.isOk(autocomplete.noDataTemplate);
});

it("render nodata container", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.search("test");

    assert.isOk(autocomplete.noData);
    assert.isOk(autocomplete.noData.hasClass("k-nodata"));
    assert.equal(autocomplete.noData.children("div").length, 1);
    assert.equal(autocomplete.noData.text(), autocomplete.options.noDataTemplate);
});

it("render nodata before footerTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test",
        footerTemplate: "footer"
    });

    assert.isOk(autocomplete.noData.next().hasClass("k-footer"));
});

it("hides noData template if any data", function() {
    var autocomplete = new AutoComplete(input, {
        dataValueField: "name",
        dataTextField: "name",
        dataSource: {
            data: [
                { name: "item1", type: "a" },
                { name: "item2", type: "a" },
                { name: "item3", type: "b" }
            ]
        },
        noDataTemplate: "no data",
        template: '#:data.name#'
    });

    autocomplete.search("item");

    assert.isOk(!autocomplete.noData.is(":visible"));
});

it("shows noData template if no data", function() {
    var autocomplete = new AutoComplete(input, {
        dataValueField: "name",
        dataTextField: "name",
        dataSource: {
            data: [ ]
        },
        noDataTemplate: "no data",
        template: '#:data.name#'
    });

    autocomplete.search("item");

    assert.isOk(autocomplete.noData.is(":visible"));
});

it("hides noData template if widget is bound on subsequent call", function() {
    var autocomplete = new AutoComplete(input, {
        dataValueField: "name",
        dataTextField: "name",
        dataSource: {
            data: [ ]
        },
        noDataTemplate: "no data",
        template: '#:data.name#'
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
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        noDataTemplate: "#: instance.dataSource.total() #"
    });

    var noData = autocomplete.noData;

    autocomplete.dataSource.data(["Item1"]);

    assert.equal(noData.text(), autocomplete.dataSource.total());
});

it("setOptions re-renders noDataTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.setOptions({
        noDataTemplate: "no data"
    });

    assert.equal(autocomplete.noData.text(), "no data");
});

it("setOptions removes noData template", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.setOptions({
        noDataTemplate: null
    });

    assert.equal(autocomplete.noData, null);
});

it("hide group header when no data loaded", function() {
    var autocomplete = new AutoComplete(input, {
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
        template: '#:data.name#'
    });

    autocomplete.search("test");
    var groupHeader = autocomplete.list.find(".k-group-header");
    assert.equal(groupHeader.css("display"), "none");
});
    });
}());
