import '@progress/kendo-ui/src/kendo.combobox.js';
import '@progress/kendo-ui/src/kendo.textbox.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';
import { stub } from '../../helpers/unit/stub.js';

    let ComboBox = kendo.ui.ComboBox;
    let TextBox = kendo.ui.TextBox;
    let input;

    describe("kendo.ui.ComboBox initialization", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.ns = "";

            let combobox = input.getKendoComboBox();

            if (combobox) {
                combobox.destroy();
            }

            let selectCombo = Mocha.fixture.find("select").getKendoComboBox();

            if (selectCombo) {
                selectCombo.destroy();
            }

            kendo.destroy(Mocha.fixture);
        });

        it("kendoComboBox attaches a combobox object to target", function() {
            let combobox = input.kendoComboBox({ data: [] }).data("kendoComboBox");

            assert.isOk(input.data("kendoComboBox") instanceof ComboBox);
        });

        it("kendoComboBox extends passed options", function() {
            let combobox = new ComboBox(input, { test: 1 });
            let options = combobox.options;

            assert.notEqual(options.test, undefined);
            assert.equal(options.test, 1);
        });

        it("combobox creates static list view", function() {
            let combobox = new ComboBox(input);

            assert.isOk(combobox.listView instanceof kendo.ui.StaticList);
        });

        it("wraps element if no wrapper span.k-input and hide element", function() {
            input.wrap("<span class='test'/>");

            let combobox = new ComboBox(input);
            let wrapper = combobox.wrapper;

            assert.isOk(wrapper.is("span"));
            assert.isOk(wrapper.parent().is("span.test"));
            assert.isOk(wrapper.hasClass("k-input k-combobox"));
            assert.isOk(!input.is(":visible"));

            input.unwrap();
        });

        it("create a text input", function() {
            let autocompleteAttr = "off";
            let combobox = new ComboBox(input.attr("name", "combo1"), {
                text: "test"
            });
            let text = combobox.input;

            assert.isOk(text.is("input"));
            assert.isOk(text.hasClass("k-input-inner"));

            assert.equal(text.val(), "test");
            assert.equal(text.attr("autocomplete"), autocompleteAttr);
            assert.equal(text.attr("name"), "combo1_input");
            assert.isOk(text.attr(kendo.attr("skip")));
        });

        it("text input should be wrapped with span", function() {
            let combobox = new ComboBox(input);
            let comboWrapper = combobox.input.parent();

            assert.isOk(comboWrapper.is("span"));
        });

        it("include arrow after input.k-input-inner", function() {
            let combobox = new ComboBox(input);
            let button = combobox.input.next().next();
            let arrow = button.children().eq(0);

            assert.isOk(button.is("button"));
            assert.isOk(button.hasClass("k-input-button"));
            assert.isOk(arrow.is("span"));
            assert.isOk(arrow.is(".k-icon.k-i-caret-alt-down, .k-svg-icon.k-svg-i-caret-alt-down"));
        });

        it("text input should keep the visible input empty on init", function() {
            let combobox = new ComboBox(input.val("item"), {
                autoBind: false
            });

            assert.equal(combobox.input.val(), "");
        });

        it("text input shows options.text value", function() {
            let text = "visible";
            let combobox = new ComboBox(input.val("item"), {
                autoBind: false,
                text: text
            });

            assert.equal(combobox.input.val(), text);
        });

        it("bound widget should set text to the custom value", function() {
            let combobox = new ComboBox(input.val("item"), {
                autoBind: true,
                dataSource: []
            });

            assert.equal(combobox.input.val(), input.val());
        });

        it("data source instance reference is preserved when pass DataSource", function() {
            let dataSource = kendo.data.DataSource.create([{ text: 1, value: 1 }, { text: 2, value: 2 }]);
            let combobox = new ComboBox(input, { dataSource: dataSource });

            assert.isOk(combobox.dataSource);
            assert.equal(combobox.dataSource, dataSource);
            assert.equal(combobox.options.dataSource, dataSource);
        });

        it("data source is initialized from options when it is an array", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, data);

            assert.isOk(combobox.dataSource);
            combobox.dataSource.read();
            assert.equal(combobox.dataSource.data().length, 2);
        });

        it("data source is initialized from options.dataSource when array is passed", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, {
                dataSource: data
            });

            assert.isOk(combobox.dataSource);
            combobox.dataSource.read();
            assert.equal(combobox.dataSource.data().length, 2);
        });

        it("data source is initialized from options.dataSource", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, {
                dataSource: {
                    data: data
                }
            });

            assert.isOk(combobox.dataSource);
            combobox.dataSource.read();
            assert.equal(combobox.dataSource.data().length, 2);
        });

        it("data source is initialized from OPTION items + one custom OPTION", function() {
            let select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select);
            let data = combobox.dataSource.view();

            assert.isOk(combobox.dataSource);
            assert.equal(data.length, 2);
            assert.equal(data[0].text, "Chai");
            assert.equal(data[0].value, "1");
        });

        it("ComboBox selects correct option on init", function() {
            let select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Chang</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select);

            assert.equal(select.val(), "2");
        });

        it("ComboBox persists custom value after re-bind", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select);

            combobox.value("custom");
            combobox.dataSource.data(["test"]);

            assert.equal(combobox.value(), "custom");
        });

        it("selected index is get from select element", function() {
            let select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select);

            assert.equal(combobox.options.index, 1);
        });

        it("set text if select and not autoBind", function() {
            let select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, { autoBind: false });

            assert.equal(combobox.input.val(), "Chai");
        });

        it("retrieved data from OPTIONS does not override options.dataSource", function() {
            let select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Beverages</option></select>").appendTo(Mocha.fixture);
            let data = [{ text: "Foo", value: "Foo" }];
            let combobox = new ComboBox(select, {
                dataSource: {
                    data: data
                }
            });

            assert.isOk(combobox.dataSource);

            combobox.dataSource.read();
            data = combobox.dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].text, "Foo");
            assert.equal(data[0].value, "Foo");
        });

        it("combobox does not select first item if initialized from empty select", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                dataSource: [{ text: "Foo", value: "Foo" }],
                dataTextField: "text",
                dataValueField: "value"
            });

            assert.isOk(!combobox.value());
            assert.isOk(!combobox.text());
        });

        it("combobox do not select custom option when value is empty string", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                dataSource: [{ text: "Foo", value: "Foo" }],
                dataTextField: "text",
                dataValueField: "value"
            });

            assert.equal(select[0].selectedIndex, -1);
        });

        it("combobox keeps selected index on rebind", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);

            select.append(document.createTextNode(""));

            let combobox = new ComboBox(select, {
                dataSource: [{ text: "Foo", value: "Foo" }],
                dataTextField: "text",
                dataValueField: "value",
                value: "Foo"
            });

            assert.equal(select[0].selectedIndex, 0);
        });

        it("combobox selects first item when initialized from select with TEXT node", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);

            select.append(document.createTextNode(""));

            let combobox = new ComboBox(select, {
                dataSource: [{ text: "Foo", value: "Foo" }],
                dataTextField: "text",
                dataValueField: "value"
            });

            assert.isOk(!combobox.value());
            assert.isOk(!combobox.text());
        });

        it("combobox initializes an UL for its items", function() {
            let combobox = new ComboBox(input, []);

            assert.isOk(combobox.ul);
            assert.isOk(combobox.ul.is("ul"));
            assert.equal(combobox.listView.content.css("overflow"), "hidden auto");
        });

        it("combobox initializes a popup for its items", function() {
            let combobox = new ComboBox(input, []);

            assert.isOk(combobox.popup);
            assert.isOk(combobox.popup instanceof kendo.ui.Popup);
            assert.isOk(combobox.popup.options.anchor[0], combobox.input[0]);
            assert.isOk(combobox.popup.element[0], combobox.ul[0]);
        });

        it("combobox shrink ul if the height of the items is more then options.height", function() {
            let data = [
                { text: "foo", value: 1 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 }
            ];
            let combobox = new ComboBox(input, data);

            combobox.options.height = 100;

            combobox.dataSource.read();
            combobox.open();

            assert.equal(combobox.list.css("height"), "100px");
        });

        it("combobox subtracts height of header from list content", function() {
            let data = [
                { text: "foo", value: 1 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 },
                { text: 2, value: 2 }
            ];
            let combobox = new ComboBox(input, {
                dataSource: data,
                headerTemplate: () => "<div>Header</div>"
            });

            combobox.options.height = 100;

            combobox.dataSource.read();
            combobox.open();

            assert.isOk(combobox.listView.content.height() < 100);
        });

        it("combobox calculates popup height properly when ul has overflow-x styling", function() {
            let combobox = new ComboBox(input, {
                dataSource: ["item1", "item2", "item3", "item4", "item5"],
                height: 50
            });

            combobox.ul.css("overflow-x", "hidden");

            combobox.open();

            let list = combobox.list;

            assert.equal(list.height(), 50);
        });

        it("combobox populates its list when the datasource changes", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.dataSource.read();

            assert.equal(combobox.ul.children("li").length, 2);
            assert.equal(combobox.ul.children("li").first().text(), "foo");
        });

        it("combobox sets default item template", function() {
            let combobox = new ComboBox(input, { });
            let template = combobox.listView.options.template;
            let result = template("abc");

            assert.equal(result, "abc");
        });

        it("template should use defined dataTextField", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "ProductName"
            });
            let template = combobox.listView.options.template;
            let result = template({ ProductName: "abc" });

            assert.equal(result, "abc");
        });

        it("changing the template", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "",
                template: (data) => data.toUpperCase()
            });
            let template = combobox.listView.options.template;
            let result = template("abc");

            assert.equal(result, "ABC");
        });

        it("defining header template", function() {
            let combobox = new ComboBox(input, {
                template: (data) => data.toUpperCase(),
                headerTemplate: () => "<div id='t'>Header</div>"
            });
            let list = combobox.list;

            assert.equal(list.parent().find("#t")[0].outerHTML, '<div id="t">Header</div>');
        });

        it("render footer container", function() {
            let combobox = new ComboBox(input, {
                footerTemplate: () => "footer"
            });
            let footer = combobox.footer;

            assert.isOk(footer);
            assert.isOk(footer.hasClass("k-list-footer"));
        });

        it("render footer template", function() {
            let combobox = new ComboBox(input, {
                autoBind: true,
                footerTemplate: () => "footer"
            });
            let footer = combobox.footer;

            assert.equal(footer.html(), "footer");
        });

        it("compile footer template with the combobox instance", function() {
            let combobox = new ComboBox(input, {
                autoBind: true,
                footerTemplate: ({ instance }) => instance.dataSource.total()
            });
            let footer = combobox.footer;

            assert.equal(footer.html(), combobox.dataSource.total());
        });

        it("update footer template on dataBound", function() {
            let combobox = new ComboBox(input, {
                autoBind: true,
                footerTemplate: ({ instance }) => instance.dataSource.total()
            });
            let footer = combobox.footer;

            combobox.dataSource.data(["Item1"]);

            assert.equal(footer.html(), combobox.dataSource.total());
        });

        it("adjust height if footer template", function() {
            let combobox = new ComboBox(input, {
                animation: false,
                autoBind: false,
                dataSource: ["item1", "item2", "item3", "item4", "item5"],
                footerTemplate: () => "<div>Footer</div>",
                height: 100
            });

            combobox.open();

            assert.isOk(combobox.listView.content.height() < 100);
        });

        it("should populate text and value if items", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }],
                index: 0
            });

            assert.equal(combobox.text(), "foo");
            assert.equal(combobox.value(), "1");
        });

        it("disabled input rendered with wrapper.k-disabled", function() {
            input.attr("disabled", "disabled").kendoComboBox();

            let combobox = input.data("kendoComboBox");

            assert.isOk(combobox.wrapper.hasClass("k-disabled"));
            assert.isOk(combobox.input.prop("disabled"));
        });

        it("ComboBox disables on init", function() {
            input.kendoComboBox({
                enabled: false
            });

            let combobox = input.data("kendoComboBox");

            assert.isOk(combobox.wrapper.hasClass("k-disabled"));
            assert.isOk(combobox.input.prop("disabled"));
        });

        it("rebuild select options if data", function() {
            let select = $("<select><option>&lt;script&gt;alert(1)&lt;/script&gt;</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select);

            assert.equal(select.children(":first")[0].text, "<script>alert(1)<\/script>");
        });

        it("Encodes the text value of the option element", function() {
            let select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "Foo&", value: 0 }, { text: 0, value: 5 }]
            });

            assert.equal(select.find("option:first").html(), "Foo&amp;");
        });

        it("value with space should be added to option", function() {
            let select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                index: 0,
                value: "",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "Foo", value: "Foo 1" }, { text: "Foo 2", value: "Foo 2" }],
                dataBound: function() {
                    assert.equal(this.value(), "Foo 1");
                }
            });
        });

        it("copy input styles to the visible input", function() {
            input.css("color", "red").kendoComboBox();

            let color = input.css("color");
            let combobox = input.data("kendoComboBox");

            assert.equal(combobox.input.css("color"), color);
            assert.isOk(combobox.input.is(":visible"));
        });

        it("copy input title attribute to the visible input", function() {
            input.attr("title", "foo").kendoComboBox();

            let title = input.attr("title");
            let combobox = input.data("kendoComboBox");

            assert.equal(combobox.input.attr("title"), title);
            assert.isOk(combobox.input.is(":visible"));
        });

        it("copy input className to the visible input", function() {
            input.addClass("test").kendoComboBox();

            let combobox = input.data("kendoComboBox");

            assert.isOk(combobox.input.hasClass("test"));
        });

        it("copy input className to the wrapper", function() {
            input.addClass("test").kendoComboBox();

            let combobox = input.data("kendoComboBox");

            assert.isOk(combobox.wrapper.hasClass("test"));
        });

        it("copy position style to the wrapper only", function() {
            input.css("position", "absolute").kendoComboBox();

            let combobox = input.data("kendoComboBox");

            assert.equal(combobox.wrapper[0].style.position, "absolute");
            assert.equal(combobox.input[0].style.position, '');
        });

        it("set height if items height is bigger than options.height", function() {
            let dataSource = new kendo.data.DataSource.create([{ text: 1, value: 1 }, { text: 2, value: 2 }]);
            dataSource.read();

            let combobox = new ComboBox(input, {
                autoBind: false,
                dataSource: dataSource,
                template: ({ text }) => `<div style='height:30px'>${text} </div>`,
                height: 50
            });

            combobox.refresh();
            combobox.open();

            assert.equal(combobox.list.height(), 50);
        });

        if (!kendo.support.touch) {
            it("pointer over widget should add hover state", function() {
                let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
                let combobox = new ComboBox(input, {
                    dataSource: data
                });
                let element = combobox.wrapper.find(".k-input-inner");

                element.mouseenter();

                assert.isOk(combobox.wrapper.hasClass("k-hover"));
            });
        }

        it("leaving widget should remove hover state", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, {
                dataSource: data
            });
            let element = combobox.wrapper.find(".k-input-inner");

            element.mouseenter();
            element.mouseleave();

            assert.isOk(!element.hasClass("k-hover"));
        });

        it("set selectedIndex", function() {
            let combobox = input.kendoComboBox().data("kendoComboBox");

            assert.equal(combobox.selectedIndex, -1);
        });

        it("set selectedIndex when autoBind: false", function() {
            let combobox = input.kendoComboBox({ autoBind: false }).data("kendoComboBox");

            assert.equal(combobox.selectedIndex, -1);
        });

        it("do not suggest on init", function() {
            let combobox = input.kendoComboBox({
                dataSource: ["text1", "text2"],
                suggest: true
            }).data("kendoComboBox");

            assert.equal(combobox.input.val(), "");
        });

        it("list.mousedown should focus input", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, {
                dataSource: data
            });

            combobox.input.focus();
            combobox.open();
            combobox.list.mousedown();

            assert.equal(document.activeElement.nodeName, "INPUT");
        });

        it("Calling triggerHandler('focus') focuses visible one", function() {
            let data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            let combobox = new ComboBox(input, {
                dataSource: data
            });

            input.triggerHandler("focus");

            assert.equal(document.activeElement, combobox.input[0]);
        });

        it("resetting dataSource detaches the previous events", function() {
            let combobox = new ComboBox(input);
            let dataSource = combobox.dataSource;

            combobox.setDataSource([]);

            combobox.bind("dataBound", function() {
                assert.isOk(false, "Change event is not detached");
            });

            dataSource.read();
        });

        it("resetting DataSource rebinds the widget", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value"
            });

            combobox.setDataSource(new kendo.data.DataSource({
                data: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
            }));

            assert.equal(combobox.ul.children().length, 2);
        });

        it("Set data source does not change selected index", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                dataTextField: "text",
                dataValueField: "value",
                index: -1
            });

            combobox.setDataSource(new kendo.data.DataSource({
                data: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
            }));

            combobox.open();

            assert.equal(combobox.value(), "");
        });

        it("Persist value when rebind data source", function() {
            let combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                value: "1"
            });

            combobox.value("");

            combobox.refresh();

            assert.equal(combobox.value(), "");
        });

        it("persist tabIndex of the original element", function() {
            input.attr("tabindex", 5);

            let combobox = new ComboBox(input);
            let text = combobox.input;

            assert.equal(text.attr("tabIndex"), 5);
        });

        it("move accesskey to the visible input", function() {
            input.attr("accesskey", "w");

            let combobox = new ComboBox(input);
            let text = combobox.input;

            assert.equal(text.attr("accesskey"), "w");
        });

        it("ComboBox sets element value if option.value is defined", function() {
            let combobox = input.kendoComboBox({
                dataSource: ["Item1", "Item2"],
                value: "Item2",
            }).data("kendoComboBox");

            assert.equal(combobox.value(), "Item2");
        });

        it("ComboBox sets element value if option.value is defined (select)", function() {
            let combobox = $("<select/>").appendTo(Mocha.fixture).kendoComboBox({
                dataSource: ["Item1", "Item2"],
                value: "Item2",
            }).data("kendoComboBox");

            assert.equal(combobox.value(), "Item2");
        });

        it("ComboBox displays text if autoBind false", function() {
            let combobox = input.kendoComboBox({
                text: "Chai",
                placeholder: "Select...",
                autoBind: false
            }).data("kendoComboBox");

            assert.equal(combobox.text(), "Chai");
        });

        it("ComboBox copies maxLength attr to the fake input", function() {
            input.attr("maxLength", 10);
            let combobox = new kendo.ui.ComboBox(input);

            assert.equal(combobox.input.attr("maxLength"), 10);
        });

        it("ComboBox sets value on refresh", function() {
            input.val("Foo");
            let combobox = new kendo.ui.ComboBox(input);

            combobox.dataSource.data(["Boo", "Foo"]);

            assert.equal(combobox.selectedIndex, 1);
        });

        it("ComboBox does not suggest on load", function() {
            let combobox = new kendo.ui.ComboBox(input.val("Item2"), {
                suggest: true,
                value: "Item2",
                autoBind: false
            });

            stub(combobox, {
                suggest: combobox.suggest
            });

            combobox.dataSource.data(["Boo", "Foo"]);
            input.focus();

            assert.equal(combobox.calls("suggest"), 0);
            assert.equal(combobox.text(), "Item2");
        });

        asyncTest("ComboBox fetches only once on open and not data is returned", function(done) {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "application/json";
            $.mockjax({ url: "foo.json", responseText: '[]' });

            let called = 0;
            let combobox = new kendo.ui.ComboBox(input.val("Item2"), {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: "foo.json"
                    },
                    requestStart: function() {
                        called += 1;
                    }
                }
            });

            combobox.open();

            setTimeout(function() {
                $.mockjax.clear();

                done(() => assert.equal(called, 1));
            }, 200);
        });

        asyncTest("form reset support - after selection", function(done) {
            input.attr("value", "123");

            let input_text = $("<input />").appendTo(Mocha.fixture);

            let form = $("<form/>").appendTo(Mocha.fixture).append(input).append(input_text);

            let combobox = new ComboBox(input, {
                dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
            });

            let textbox = new TextBox(input_text, {
                value: "123"
            });

            combobox.select(1);

            form[0].reset();

            setTimeout(function() {
                done(() => {
                    assert.equal(combobox.element.val(), "123");
                    assert.equal(combobox.input.val(), "123");
                    assert.equal(textbox.element.val(), "");
                });
            }, 150);
        });

        asyncTest("form reset support - value provided as option", function(done) {
            let input_text = $("<input />").appendTo(Mocha.fixture);
            let form = $("<form/>").appendTo(Mocha.fixture).append(input).append(input_text);

            let combobox = new ComboBox(input, {
                placeholder: "Select product",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                value: 1,
                dataSource: [{ ProductID: 1, ProductName: 'test' }]
            });

            let textbox = new TextBox(input_text, {
                value: "123"
            });

            form[0].reset();

            setTimeout(function() {
                done(() => assert.equal(combobox.text(), "test"));
                assert.equal(textbox.element.val(), "");
            }, 150);
        });

        it("ComboBox honors readonly attribute", function() {
            let combobox = input.attr("readonly", true).kendoComboBox().data("kendoComboBox");

            combobox._arrow.click();

            assert.isOk(!combobox.popup.visible());
        });

        it("ComboBox uses disabled attr over the readonly", function() {
            let combobox = input.attr("readonly", true)
                            .attr("disabled", true)
                            .kendoComboBox()
                            .data("kendoComboBox");

            assert.equal(input.attr("readonly"), undefined);
        });

        asyncTest("ComboBox hides loading image on error", function(done) {
            let combobox = input.kendoComboBox().data("kendoComboBox");

            //simulate request start
            combobox.dataSource.trigger("progress");

            setTimeout(function() {

                //simulate error
                combobox.dataSource.trigger("error");

                done(() => assert.isOk(!combobox.wrapper.find(".k-i-loading").is(":visible")));
            }, 200);
        });

        it("ComboBox sets options.value to input value on init", function() {
            let combobox = input.val("1").kendoComboBox().data("kendoComboBox");

            assert.equal(combobox.options.value, "1");
        });

        it("ComboBox adds scrollbar width to the fixed group header padding", function() {
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

            let combobox = input.kendoComboBox({
                dataSource: dataSource,
                height: 50
            }).data("kendoComboBox");

            combobox.open();

            let padding = combobox.list.find(".k-list-group-sticky-header").css("padding-right");

            assert.isOk(parseFloat(padding) >= kendo.support.scrollbar());
        });

        it("ComboBox does not add scrollbar width to the fixed group header padding if popup has not scroll", function() {
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

            let combobox = input.kendoComboBox({
                dataSource: dataSource,
                height: 350
            }).data("kendoComboBox");

            combobox.open();

            let padding = combobox.list.find(".k-list-group-sticky-header").css("padding-right");

            assert.isOk(parseFloat(padding) < 15);
        });

        it("ComboBox updates selected text when selected item is changed", function() {
            let dataSource = new kendo.data.DataSource({
                data: [
                    { text: "item1", value: 1 },
                    { text: "item2", value: 2 },
                    { text: "item3", value: 3 },
                    { text: "item4", value: 4 },
                    { text: "item5", value: 5 }
                ]
            });

            let combobox = input.kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dataSource,
                value: "3"
            }).data("kendoComboBox");

            dataSource.view()[2].set("text", "updated");

            assert.equal(combobox.input.val(), "updated");
        });

        it("ComboBox shows the custom value if source is empty", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, { value: "custom" });

            assert.equal(combobox.text(), "custom");
        });

        it("ComboBox shows the custom text if source is empty", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, { value: "custom", text: "custom text" });

            assert.equal(combobox.value(), "custom");
            assert.equal(combobox.text(), "custom text");
        });

        asyncTest("ComboBox shows the custom text if source is empty", function(done) {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                autoBind: false,
                dataSource: {
                    transport: {
                            read: function(options) {
                                setTimeout(function() {
                                    options.success([]);
                                    done(() => {});
                                }, 100);
                            }
                    }

                }
            });

            combobox.value("custom");

            assert.equal(combobox.value(), "custom");
            assert.equal(combobox.text(), "");
        });

        it("ComboBox with autoBind:false reads datasource ", function() {
            let select = $("<select></select>").appendTo(Mocha.fixture);
            let dataSource = new kendo.data.DataSource({
                data: ["Item1", "Item2"]
            });

            dataSource.read();

            let combobox = new ComboBox(select, {
                autoBind: false,
                dataSource: dataSource
            });

            combobox.open();

            assert.equal(combobox.ul.children().length, 2);
        });

        it("ComboBox updates the selected text on source rebind", function() {
            let data = [
                { name: "item", value: 1, group: "a" },
                { name: "item2", value: 2, group: "b" }
            ];

            let combobox = input.kendoComboBox({
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success(data);
                        }
                    }
                },
                dataValueField: "value",
                dataTextField: "name",
                value: 1
            }).data("kendoComboBox");

            data[0].name = "Item new";

            combobox.dataSource.read();

            assert.equal(combobox.text(), "Item new");
        });

        it("ComboBox is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoComboBox().data("kendoComboBox");
            assert.include(["disabled", "true"], input.attr("disabled"));
            $(".k-list-container").remove();
        });

        asyncTest("ComboBox calls placeholder method when delayed binding is used", function(done) {
            let combobox = input.kendoComboBox({
                text: "Chai",
                placeholder: "Select...",
                autoBind: false
            }).data("kendoComboBox");

            stub(combobox, {
                _placeholder: combobox._placeholder
            });

            setTimeout(function() {
                combobox.dataSource.read();

                done(() => assert.equal(combobox.calls("_placeholder"), 1));
            });
        });

        it("ComboBox opens the popup if noDataTemplate", function() {
            let combobox = new ComboBox(input, {
                noDataTemplate: () => "no data"
            });

            combobox.wrapper.find(".k-icon:last, .k-svg-icon:last").click();

            assert.isOk(combobox.popup.visible());
        });

        it("ComboBox doesn't open the popup if no data", function() {
            let combobox = new ComboBox(input, {
                noDataTemplate: null
            });

            combobox.wrapper.find(".k-icon:last").click();

            assert.isOk(!combobox.popup.visible());
        });

        it("widget keeps defaultSelected property", function() {
            let select = $("<select><option>foo</option><option selected>bar</option><option>baz</option></select>").appendTo(Mocha.fixture);
            let combobox = new ComboBox(select, {
                value: "bar"
            });

            combobox.value("baz");

            let options = select[0].children;

            assert.equal(options[1].selected, false);
            assert.equal(options[2].selected, true);

            assert.equal(options[1].defaultSelected, true);
            assert.equal(options[2].defaultSelected, false);
        });

        it("ComboBox does not bind on open if minLength & autoBind: false", function() {
            let combobox = new ComboBox(input, {
                minLength: 3,
                autoBind: false,
                filter: "contains"
            });

            combobox.dataSource.bind("change", function() {
                assert.isOk(false, "dataSource should not be read");
            });
            combobox.wrapper.find(".k-i-caret-alt-down, .k-svg-i-caret-alt-down").click();

            assert.isOk(combobox.popup.visible());
        });

        it("ComboBox does not bind on open if minLength & autoBind: true", function() {
            let combobox = new ComboBox(input, {
                minLength: 3,
                filter: "contains"
            });

            combobox.dataSource.bind("change", function() {
                assert.isOk(false, "dataSource should not be read");
            });
            combobox.wrapper.find(".k-i-caret-alt-down, .k-svg-i-caret-alt-down").click();

            assert.isOk(combobox.popup.visible());
        });

        //no data template
        it("ComboBox builds a noDataTemplate", function() {
            let combobox = new ComboBox(input, {
                noDataTemplate: () => "test"
            });

            assert.isOk(combobox.noDataTemplate);
        });

        it("render nodata container", function() {
            let combobox = new ComboBox(input, {
                noDataTemplate: () => "test"
            });

            assert.isOk(combobox.noData);
            assert.isOk(combobox.noData.hasClass("k-no-data"));
            assert.equal(combobox.noData.text(), combobox.options.noDataTemplate());
        });

        it("render nodata before footerTemplate", function() {
            let combobox = new ComboBox(input, {
                noDataTemplate: () => "test",
                footerTemplate: () => "footer"
            });

            assert.isOk(combobox.noData.next().hasClass("k-list-footer"));
        });

        it("hides noData template if any data", function() {
            let combobox = new ComboBox(input, {
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

            combobox.open();

            assert.isOk(!combobox.noData.is(":visible"));
        });

        it("shows noData template if no data", function() {
            let combobox = new ComboBox(input, {
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: [ ]
                },
                noDataTemplate: () => "no data",
                template: ({ name }) => name
            });

            combobox.open();

            assert.isOk(combobox.noData.is(":visible"));
        });

        it("hides noData template if widget is bound on subsequent call", function() {
            let combobox = new ComboBox(input, {
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: [ ]
                },
                noDataTemplate: () => "no data",
                template: ({ name }) => name
            });

            combobox.open();

            assert.isOk(combobox.noData.is(":visible"));

            combobox.dataSource.data([
                { name: "item1", type: "a" },
                { name: "item2", type: "a" },
                { name: "item3", type: "b" }
            ]);

            assert.isOk(!combobox.noData.is(":visible"));
        });

        it("update noData template on dataBound", function() {
            let combobox = new ComboBox(input, {
                autoBind: true,
                noDataTemplate: ({ instance }) => instance.dataSource.total()
            });

            let noData = combobox.noData;

            combobox.dataSource.data(["Item1"]);

            assert.equal(noData.text(), combobox.dataSource.total());
        });

        it("adds class hidden to the wrapper if clearButton is enabled and value is null", function() {
            let combobox = new ComboBox(input, {
                clearButton: true
            });

            combobox._hideBusy();

            assert.isOk(combobox._clear.hasClass("k-hidden"));
        });

        it("_syncValueAndText is true value when syncValueAndText is true", function() {
            let combobox = new ComboBox(input, {
                syncValueAndText: true
            });

            assert.isOk(combobox._syncValueAndText());
        });

        it("_syncValueAndText is false value when syncValueAndText is false", function() {
            let combobox = new ComboBox(input, {
                syncValueAndText: true
            });

            assert.isOk(combobox._syncValueAndText());
        });

        it("renders not-floating label from string", function() {
            let combobox = new ComboBox(input, {
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

            assert.equal(combobox.label.element.text(), "Label");
            assert.isNotOk(!!combobox.label.floatingLabel);
        });

        it("renders label from object", function() {
            let combobox = new ComboBox(input, {
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

            assert.equal(combobox.label.element.text(), "some label");
        });

        it("renders floating label", function() {
            let combobox = new ComboBox(input, {
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

            assert.equal(combobox.label.element.text(), "some label");
            assert.isOk(!!combobox.label.floatingLabel);
        });

        it("renders label with funciton", function() {
            let combobox = new ComboBox(input, {
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

            assert.equal(combobox.label.element.text(), "some label");
        });

        it ("Should set readonly state", function() {
            let combobox = new ComboBox(input, {
                readonly: true,
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: [
                        { name: "item1", value: "1" },
                        { name: "item2", value: "2" },
                        { name: "item3", value: "3" }
                    ]
                }
            });

            assert.isOk(combobox.wrapper.attr("aria-readonly", true));
            assert.isOk(combobox.input.attr("readonly"));
        })
    });

