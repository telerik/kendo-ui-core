(function(){

var AutoComplete = kendo.ui.AutoComplete;
var input;

module("kendo.ui.AutoComplete initialization", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("kendoAutoComplete attaches a autocomplete object to target", function() {
    input.kendoAutoComplete({ data: [] });

    ok(input.data("kendoAutoComplete") instanceof AutoComplete);
});

test("data source is initialized from options.dataSource when array is passed", function() {
    var data = [1, 2];
    var autocomplete = new AutoComplete(input, {
        dataSource: data
    });

    ok(autocomplete.dataSource);
    autocomplete.dataSource.read();
    equal(autocomplete.dataSource.data().length, 2);
});

test("data source is initialized from options.dataSource", function() {
    var data = [1, 2], autocomplete = new AutoComplete(input, {
        dataSource: {
            data: data
        }
    });

    ok(autocomplete.dataSource);
    autocomplete.dataSource.read();
    equal(autocomplete.dataSource.data().length, 2);
});

test("do not open on dataSource.query", function() {
    var data = [1, 2], autocomplete = new AutoComplete(input, {
        dataSource: {
            data: data
        }
    });

    autocomplete.dataSource.fetch();

    ok(!autocomplete.popup.visible());
});

test("rendering honers dataTextField", function() {
    var data = [{text: 1}, {text: 2}], autocomplete = new AutoComplete(input, {
        dataSource: data,
        dataTextField: "text"
    });

    autocomplete.dataSource.query();

    equal(autocomplete.ul.children().eq(0).text(), "1");
});

test("autocomplate initializes a UL for its items", function() {
    var autocomplete = new AutoComplete(input, []);

    ok(autocomplete.ul);
    ok(autocomplete.ul.is("ul"));
});

test("autocomplate initializes a popup for its items", function() {
    var autocomplete = new AutoComplete(input, []);

    ok(autocomplete.popup);
    ok(autocomplete.popup instanceof kendo.ui.Popup);
    ok(autocomplete.popup.options.anchor[0], input[0]);
    ok(autocomplete.popup.element[0], autocomplete.ul[0]);
});

test("autocomplete populates its list when the datasource changes", function() {
    var autocomplete = new AutoComplete(input, ["foo", "bar"]);

    autocomplete.dataSource.read();

    equal(autocomplete.ul.children("li").length, 2);
    equal(autocomplete.ul.children("li").first().text(), "foo");
});

test("autocomplete sets default item template", function() {
    var autocomplete = new AutoComplete(input);

    var template = autocomplete.listView.options.template;

    equal(template, "#:data#");
});

test("autocomplete sets default item template using dataTextField option", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "test"
    });

    var template = autocomplete.listView.options.template;

    equal(template, "#:data.test#");
});

test("autocomplete sets custom item template", function() {
    var autocomplete = new AutoComplete(input, {
        template: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.template;

    equal(template, "#= data.toUpperCase() #");
});

test("autocomplete sets a default group template", function() {
    var autocomplete = new AutoComplete(input, {
    });

    var template = autocomplete.listView.options.groupTemplate;

    equal(template, "#:data#");
});

test("autocomplete supports setting a custom group template", function() {
    var autocomplete = new AutoComplete(input, {
        groupTemplate: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.groupTemplate;

    equal(template, "#= data.toUpperCase() #");
});

test("autocomplete sets a default fixed group template", function() {
    var autocomplete = new AutoComplete(input, {
    });

    var template = autocomplete.listView.options.fixedGroupTemplate;

    equal(template, "#:data#");
});

test("autocomplete supports setting a custom fixed group template", function() {
    var autocomplete = new AutoComplete(input, {
        fixedGroupTemplate: "#= data.toUpperCase() #"
    });

    var template = autocomplete.listView.options.fixedGroupTemplate;

    equal(template, "#= data.toUpperCase() #");
});

test("defining header template", function() {
    var autocomplete = new AutoComplete(input, {
        template: "#= data.toUpperCase() #",
        headerTemplate: "<div>Header</div>"
    });

    var list = autocomplete.list;

    equal(list.children()[0].outerHTML, "<div>Header</div>");
});

test("render footer container", function() {
    var autocomplete = new AutoComplete(input, {
        footerTemplate: "footer"
    });

    var footer = autocomplete.footer;

    ok(footer);
    ok(footer.hasClass("k-footer"));
});

test("render footer template", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Item1"],
        footerTemplate: "footer"
    });

    var footer = autocomplete.footer;

    autocomplete.search("item");

    equal(footer.html(), "footer");
});

test("compile footer template with the autocomplete instance", function() {
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = autocomplete.footer;

    equal(footer.html(), autocomplete.dataSource.total());
});

test("update footer template on dataBound", function() {
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = autocomplete.footer;

    autocomplete.dataSource.data(["Item1"]);

    equal(footer.html(), autocomplete.dataSource.total());
});

test("adjust height if footer template", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        autoBind: false,
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        footerTemplate: "<div>Footer</div>",
        height: 100
    });

    autocomplete.search("item");

    ok(autocomplete.listView.content.height() < 100);
});

test("highlight first item", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: ["1", "2", "3"],
        highlightFirst: true
    });

    autocomplete.search("1");

    ok(autocomplete.ul.children().eq(0).hasClass("k-state-focused"));
});

test("resetting dataSource detaches the previouse events", 0, function() {
    var autocomplete = new AutoComplete(input);

    var dataSource = autocomplete.dataSource;

    autocomplete.setDataSource({});

    autocomplete.bind("dataBound", function() {
        ok(false, "Change event is not detached");
    });

    dataSource.read();
});

test("resetting DataSource rebinds the widget", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text"
    });

    var dataSource = new kendo.data.DataSource({
        data:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.setDataSource(dataSource);

    strictEqual(autocomplete.dataSource, dataSource);
});

test("dataItem() returns dataItem depending on passed index", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.dataSource.read();

    equal(autocomplete.dataItem(1), autocomplete.dataSource.view()[1]);
});

test("dataItem() returns dataItem depending on passed dom elements", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    autocomplete.dataSource.read();

    equal(autocomplete.dataItem(autocomplete.items()[1]), autocomplete.dataSource.view()[1]);
});

test("dataItem() returns null if no argument", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource:[{text: 1, value: 1}, {text:2, value:2}]
    });

    equal(autocomplete.dataItem(), null);
});

test("Value of the autocomplete is empty string when placeholder is used", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "input..."
    });

    equal(autocomplete.value(), "");
});

test("destroy method works", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "input..."
    });

    autocomplete.destroy();
    ok(true);
});

//loading
test("AutoComplete creates loading element", function() {
    var autocomplete = new AutoComplete(input);

    ok(autocomplete._loading);
});
/*
asyncTest("AutoComplete shows loading icon on progress", 1, function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.dataSource.trigger("progress");

    setTimeout(function() {
        notEqual(autocomplete._loading.css("display"), "none");
        start();
    }, 200);
});

asyncTest("AutoComplete hides loading icon on dataSource change", 1, function() {
    var autocomplete = new AutoComplete(input);

    autocomplete._showBusy();

    setTimeout(function() {
        autocomplete.refresh();

        equal(autocomplete._loading.css("display"), "none");
        start();
    }, 200);
});
*/
test("AutoComplete sets ignoreCase option to false", function() {
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

    equal(autocomplete.options.ignoreCase, false);
});

test("readonly() makes input element readonly", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();

    equal(autocomplete.element.attr("readonly"), "readonly");
});

test("readonly(false) removes readonly attribute", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.readonly(false);

    equal(autocomplete.element.attr("readonly"), undefined);
});

test("readonly() removes disabled attribute and disabled class", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.enable(false);
    autocomplete.readonly();

    equal(autocomplete.element.attr("readonly"), "readonly");
    equal(autocomplete.element.attr("disabled"), undefined);
    ok(autocomplete.wrapper.hasClass("k-state-default"));
    ok(!autocomplete.wrapper.hasClass("k-state-disabled"));
});

test("enable(false) removes readonly attribute and default class", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.enable(false);

    equal(autocomplete.element.attr("readonly"), undefined);
    equal(autocomplete.element.attr("disabled"), "disabled");
    ok(!autocomplete.wrapper.hasClass("k-state-default"));
    ok(autocomplete.wrapper.hasClass("k-state-disabled"));
});

test("enable() enables widget after readonly()", function() {
    var autocomplete = new AutoComplete(input);

    autocomplete.readonly();
    autocomplete.enable();

    equal(autocomplete.element.attr("readonly"), undefined);
    equal(autocomplete.element.attr("disabled"), undefined);
    ok(autocomplete.wrapper.hasClass("k-state-default"));
    ok(!autocomplete.wrapper.hasClass("k-state-disabled"));
});

test("AutoComplete honors readonly attribute", function() {
    var autocomplete = new AutoComplete(input.attr("readonly", true));

    equal(autocomplete.element.attr("readonly"), "readonly");
    equal(autocomplete.element.attr("disabled"), undefined);
});

test("AutoComplete uses disabled attr over the readonly", function() {
    var autocomplete = new AutoComplete(input.attr("readonly", true).attr("disabled", true));

    equal(input.attr("readonly"), undefined);
});

test("AutoComplete does not focus input if refresh triggered from dataSource", function() {
    var autocomplete = new AutoComplete(input);
    autocomplete.suggest("test");

    notEqual(input[0], document.activeElement);
});

test("AutoComplete uses input value if options.value is null", function() {
    var autocomplete = new AutoComplete(input.val("test"));

    equal(input.val(), "test");
});

test("AutoComplete adds scrollbar width to the fixed group header padding", function() {
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

    ok(parseFloat(padding) > 0);
});

test("AutoComplete calculates popup height properly when ul has overflow-x styling", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        height: 50
    });

    autocomplete.ul.css("overflow-x", "hidden");

    autocomplete.search("item");

    var list = autocomplete.list;

    equal(list.height(), 50);
});

test("AutoComplete does not add scrollbar width if popup is shorter then options.height", function() {
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

    ok(parseFloat(padding) < 15);
});

test("setOptions updates listView template when dataTextField is set", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
        dataTextField: "name",
        filter: "startswith"
    });

    autocomplete.dataSource.read();

    autocomplete.setOptions({
        dataTextField: "anotherName"
    });

    equal(autocomplete.listView.options.template, "#:data.anotherName#");
});

test("setOptions updates listView dataValueField when dataTextField is set", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
        dataTextField: "name",
        filter: "startswith"
    });

    autocomplete.dataSource.read();

    autocomplete.setOptions({
        dataTextField: "anotherName"
    });

    equal(autocomplete.listView.options.dataValueField, "anotherName");
});

test("setOptions method updates footer template", 1, function() {
    var autocomplete = new AutoComplete(input, { });

    autocomplete.setOptions({ footerTemplate: "footer" });

    equal(autocomplete.footer.html(), "footer");
});

test("setOptions method hides footer template", 1, function() {
    var autocomplete = new AutoComplete(input, {
        footerTemplate: "footer"
    });

    autocomplete.setOptions({ footerTemplate: "" });

    equal(autocomplete.footer, null);
});

test("setOptions method updates header template", 1, function() {
    var autocomplete = new AutoComplete(input, { });

    autocomplete.setOptions({ headerTemplate: "<div>header</div>" });

    equal(autocomplete.header.html(), "header");
});

test("setOptions method hides header template", 1, function() {
    var autocomplete = new AutoComplete(input, {
        headerTemplate: "<div>Header</div>"
    });

    autocomplete.setOptions({ headerTemplate: "" });

    equal(autocomplete.header, null);
});

test("AutoComlete is disabled when placed in disabled fieldset", function() {
     $(input).wrap('<fieldset disabled="disabled"></fieldset>');
     input.kendoAutoComplete().data("kendoAutoComplete");
     equal(input.attr("disabled"), "disabled");
});

//no data template
test("AutoComplete builds a noDataTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    ok(autocomplete.noDataTemplate);
});

test("render nodata container", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.search("test");

    ok(autocomplete.noData);
    ok(autocomplete.noData.hasClass("k-nodata"));
    equal(autocomplete.noData.children("div").length, 1);
    equal(autocomplete.noData.text(), autocomplete.options.noDataTemplate);
});

test("render nodata before footerTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test",
        footerTemplate: "footer"
    });

    ok(autocomplete.noData.next().hasClass("k-footer"));
});

test("hides noData template if any data", function() {
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

    ok(!autocomplete.noData.is(":visible"));
});

test("shows noData template if no data", function() {
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

    ok(autocomplete.noData.is(":visible"));
});

test("hides noData template if widget is bound on subsequent call", function() {
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

    ok(autocomplete.noData.is(":visible"));

    autocomplete.dataSource.data([
        { name: "item1", type: "a" },
        { name: "item2", type: "a" },
        { name: "item3", type: "b" }
    ]);

    ok(!autocomplete.noData.is(":visible"));
});

test("update noData template on dataBound", function() {
    var autocomplete = new AutoComplete(input, {
        autoBind: true,
        noDataTemplate: "#: instance.dataSource.total() #"
    });

    var noData = autocomplete.noData;

    autocomplete.dataSource.data(["Item1"]);

    equal(noData.text(), autocomplete.dataSource.total());
});

test("setOptions re-renders noDataTemplate", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.setOptions({
        noDataTemplate: "no data"
    });

    equal(autocomplete.noData.text(), "no data");
});

test("setOptions removes noData template", function() {
    var autocomplete = new AutoComplete(input, {
        noDataTemplate: "test"
    });

    autocomplete.setOptions({
        noDataTemplate: null
    });

    equal(autocomplete.noData, null);
});

test("hide group header when no data loaded", function() {
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
    equal(groupHeader.css("display"), "none");
});
}());
