(function() {

var ComboBox = kendo.ui.ComboBox;
var input;

describe("kendo.ui.ComboBox initialization", function () {
    beforeEach(function() {
        kendo.ns = "kendo-";
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.ns = "";

        var combobox = input.getKendoComboBox();

        if (combobox) {
            combobox.destroy();
        }

        var selectCombo = Mocha.fixture.find("select").getKendoComboBox();

        if (selectCombo) {
            selectCombo.destroy();
        }

        kendo.destroy(Mocha.fixture);
    });

it("kendoComboBox attaches a combobox object to target", function() {
   var combobox = input.kendoComboBox({ data: [] }).data("kendoComboBox");

   assert.isOk(input.data("kendoComboBox") instanceof ComboBox);
});

it("kendoComboBox extends passed options", function() {
    var combobox = new ComboBox(input, { test: 1});

    var options = combobox.options;

    assert.notEqual(options.test, undefined);
    assert.equal(options.test, 1);
});

it("combobox creates static list view", function() {
    var combobox = new ComboBox(input);

    assert.isOk(combobox.listView instanceof kendo.ui.StaticList);
});

it("wraps element if no wrapper span.k-widget and hide element", function() {
   input.wrap("<span class='test'/>");

   var combobox = new ComboBox(input);

   var wrapper = combobox.wrapper;

   assert.isOk(wrapper.is("span"));
   assert.isOk(wrapper.parent().is("span.test"));
   assert.isOk(wrapper.hasClass("k-widget k-combobox"));
   assert.isOk(!input.is(":visible"));

   input.unwrap();
});

it("create a text input", function() {
   var combobox = new ComboBox(input.attr("name", "combo1"), {
       text: "test"
   });

   var text = combobox.input;

   assert.isOk(text.is("input"));
   assert.isOk(text.hasClass("k-input"));

   assert.equal(text.val(), "test");
   assert.equal(text.attr("autocomplete"), "off");
   assert.equal(text.attr("name"), "combo1_input");
});

it("text input should be wrapped with span", function(){
   var combobox = new ComboBox(input);

   var comboWrapper = combobox.input.parent();

   assert.isOk(comboWrapper.is("span"));
   assert.isOk(comboWrapper.hasClass("k-dropdown-wrap k-state-default"));
});

it("include arrow after input.k-input", function(){
   var combobox = new ComboBox(input);

    var spanArrow = combobox.input.next().next(),
       arrow = spanArrow.children().eq(0);

   assert.isOk(spanArrow.is("span"));
   assert.isOk(spanArrow.hasClass("k-select"));
   assert.isOk(arrow.is("span"));
   assert.isOk(arrow.hasClass("k-icon k-i-arrow-60-down"));
   assert.equal(arrow.html(), "");
});

it("text input should keep the visible input empty on init", function() {
   var combobox = new ComboBox(input.val("item"), {
        autoBind: false
   });

   assert.equal(combobox.input.val(), "");
});

it("text input shows options.text value", function() {
    var text = "visible";
    var combobox = new ComboBox(input.val("item"), {
        autoBind: false,
        text: text
    });

    assert.equal(combobox.input.val(), text);
});

it("bound widget should set text to the custom value", function() {
   var combobox = new ComboBox(input.val("item"), {
        autoBind: true,
        dataSource: []
   });

   assert.equal(combobox.input.val(), input.val());
});

it("data source instance reference is preserved when pass DataSource", function() {
   var dataSource = kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]);

   var combobox = new ComboBox(input, {dataSource: dataSource});

    assert.isOk(combobox.dataSource);
    assert.equal(combobox.dataSource, dataSource);
    assert.equal(combobox.options.dataSource, dataSource);
});

it("data source is initialized from options when it is an array", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    var combobox = new ComboBox(input, data);

    assert.isOk(combobox.dataSource);
    combobox.dataSource.read();
    assert.equal(combobox.dataSource.data().length, 2);
});

it("data source is initialized from options.dataSource when array is passed", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    var combobox = new ComboBox(input, {
        dataSource: data
    });

    assert.isOk(combobox.dataSource);
    combobox.dataSource.read();
    assert.equal(combobox.dataSource.data().length, 2);
});

it("data source is initialized from options.dataSource", function() {
   var data = [{text: 1, value: 1}, {text:2, value:2}];

   var combobox = new ComboBox(input, {
       dataSource: {
           data: data
       }
   });

   assert.isOk(combobox.dataSource);
   combobox.dataSource.read();
   assert.equal(combobox.dataSource.data().length, 2);
});

it("data source is initialized from OPTION items + one custom OPTION", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select);

   var data = combobox.dataSource.view();

   assert.isOk(combobox.dataSource);
   assert.equal(data.length, 2);
   assert.equal(data[0].text, "Chai");
   assert.equal(data[0].value, "1");

});

it("ComboBox selects correct option on init", function() {
   var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Chang</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select);

   assert.equal(select.val(), "2");
});

it("ComboBox persists custom value after re-bind", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select);

   combobox.value("custom");
   combobox.dataSource.data(["test"]);

   assert.equal(combobox.value(), "custom");
});

it("selected index is get from select element", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select);

   assert.equal(combobox.options.index, 1);
});

it("set text if select and not autoBind", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {autoBind: false});

   assert.equal(combobox.input.val(), "Chai");
});

it("retrived data from OPTIONS does not override options.dataSource", function() {
   var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Beverages</option></select>").appendTo(Mocha.fixture);
   var data = [{text: "Foo", value: "Foo"}];

   var combobox = new ComboBox(select, {
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
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value"
   });

   assert.isOk(!combobox.value());
   assert.isOk(!combobox.text());
});

it("combobox do not select custom option when value is empty string", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value"
   });

   assert.equal(select[0].selectedIndex, -1);
});

it("combobox keeps selected index on rebind", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   select.append(document.createTextNode(""));

   var combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value",
       value: "Foo"
   });

   assert.equal(select[0].selectedIndex, 0);
});

it("combobox selects first item when initalized from select with TEXT node", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   select.append(document.createTextNode(""));

   var combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value"
   });

   assert.isOk(!combobox.value());
   assert.isOk(!combobox.text());
});

it("combobox initializes an UL for its items", function() {
     var combobox = new ComboBox(input, []);

     assert.isOk(combobox.ul);
     assert.isOk(combobox.ul.is("ul"));
     assert.equal(combobox.listView.content.css("overflow"), "auto");
});

it("combobox initializes a popup for its items", function() {
     var combobox = new ComboBox(input, []);

     assert.isOk(combobox.popup);
     assert.isOk(combobox.popup instanceof kendo.ui.Popup);
     assert.isOk(combobox.popup.options.anchor[0], combobox.input[0]);
     assert.isOk(combobox.popup.element[0], combobox.ul[0]);
});

it("combobox shrink ul if the height of the items is more then options.height", function() {
   var data = [{text: "foo", value: 1},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2}];

      var combobox = new ComboBox(input, data);
      combobox.options.height = 100;

      combobox.dataSource.read();
      combobox.open();

      assert.equal(combobox.list.css("height"), "100px");
});

it("combobox substracts height of header from list content", function() {
   var data = [{text: "foo", value: 1},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2}];

    var combobox = new ComboBox(input, {
       dataSource: data,
       headerTemplate: "<div>Header</div>"
    });

    combobox.options.height = 100;

    combobox.dataSource.read();
    combobox.open();

    assert.isOk(combobox.listView.content.height() < 100);
});

it("combobox calculates popup height properly when ul has overflow-x styling", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        height: 50
    });

    combobox.ul.css("overflow-x", "hidden");

    combobox.open();

    var list = combobox.list;

    assert.equal(list.height(), 50);
});

it("combobox populates its list when the datasource changes", function() {
   var combobox = new ComboBox(input, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "foo", value: 1}, {text:2, value:2}]
   });

   combobox.dataSource.read();

   assert.equal(combobox.ul.children("li").length, 2);
   assert.equal(combobox.ul.children("li").first().text(), "foo");
});

it("combobox sets default item template", function(){
    var combobox = new ComboBox(input, { });

    var template = combobox.listView.options.template;

    assert.equal(template, "#:data#");
});

it("template should use defined datatextField", function(){
    var combobox = new ComboBox(input, {
        dataTextField : "ProductName"
    });

    var template = combobox.listView.options.template;

    assert.equal(template, "#:data.ProductName#");
});

it("changing the template", function() {
    var combobox = new ComboBox(input, {
        datatextField: "",
        template: "#= data.toUpperCase() #"
    });

    var template = combobox.listView.options.template;

    assert.equal(template, "#= data.toUpperCase() #");
});

it("defining header template", function() {
    var combobox = new ComboBox(input, {
        template: "#= data.toUpperCase() #",
        headerTemplate: "<div>Header</div>"
    });

    var list = combobox.list;

    assert.equal(list.children()[0].outerHTML, "<div>Header</div>");
});

it("render footer container", function() {
    var combobox = new ComboBox(input, {
        footerTemplate: "footer"
    });

    var footer = combobox.footer;

    assert.isOk(footer);
    assert.isOk(footer.hasClass("k-footer"));
});

it("render footer template", function() {
    var combobox = new ComboBox(input, {
        autoBind: true,
        footerTemplate: "footer"
    });

    var footer = combobox.footer;

    assert.equal(footer.html(), "footer");
});

it("compile footer template with the combobox instance", function() {
    var combobox = new ComboBox(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = combobox.footer;

    assert.equal(footer.html(), combobox.dataSource.total());
});

it("update footer template on dataBound", function() {
    var combobox = new ComboBox(input, {
        autoBind: true,
        footerTemplate: "#: instance.dataSource.total() #"
    });

    var footer = combobox.footer;

    combobox.dataSource.data(["Item1"]);

    assert.equal(footer.html(), combobox.dataSource.total());
});

it("adjust height if footer template", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        autoBind: false,
        dataSource: ["item1", "item2", "item3", "item4", "item5"],
        footerTemplate: "<div>Footer</div>",
        height: 100
    });

    combobox.open();

    assert.isOk(combobox.listView.content.height() < 100);
});

it("should populate text and value if items", function() {
   var combobox = new ComboBox(input, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "foo", value: 1}, {text:2, value:2}],
       index: 0
   });

   assert.equal(combobox.text(), "foo");
   assert.equal(combobox.value(), "1");
});

it("disabled input rendered with wrapper.k-state-disabled", function() {
   input.attr("disabled", "disabled").kendoComboBox();

   var combobox = input.data("kendoComboBox");

   assert.isOk(combobox._inputWrapper.hasClass("k-state-disabled"));
   assert.isOk(combobox.input.prop("disabled"));
});

it("ComboBox disables on init", function() {
   input.kendoComboBox({
        enabled: false
   });

   var combobox = input.data("kendoComboBox");

   assert.isOk(combobox._inputWrapper.hasClass("k-state-disabled"));
   assert.isOk(combobox.input.prop("disabled"));
});

it("rebuild select options if data", function() {
   var select = $("<select><option>&lt;script&gt;alert(1)&lt;/script&gt;</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select);

   assert.equal(select.children(":first")[0].text, "<script>alert(1)<\/script>");
});

it("Encodes the text value of the option element", function() {
   var select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "Foo&", value: 0}, {text: 0, value:5}]
   });

   assert.equal(select.find("option:first").html(), "Foo&amp;");
});

it("value with space should be added to option", function() {
   var select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
       index: 0,
       value: "",
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "Foo", value: "Foo 1"}, {text: "Foo 2", value:"Foo 2"}],
       dataBound: function() {
           assert.equal(this.value(), "Foo 1");
       }
   });
});

it("copy input styles to the visible input", function() {
   input.css("color", "red").kendoComboBox();

   var color = input.css("color");

   var combobox = input.data("kendoComboBox");

   assert.equal(combobox.input.css("color"), color);
   assert.isOk(combobox.input.is(":visible"));
});

it("copy input title attribute to the visible input", function() {
   input.attr("title", "foo").kendoComboBox();

   var title = input.attr("title");

   var combobox = input.data("kendoComboBox");

   assert.equal(combobox.input.attr("title"), title);
   assert.isOk(combobox.input.is(":visible"));
});

it("copy input className to the visible input", function() {
   input.addClass("test").kendoComboBox();

   var combobox = input.data("kendoComboBox");

   assert.isOk(combobox.input.hasClass("test"));
});

it("copy input className to the wrapper", function() {
   input.addClass("test").kendoComboBox();

   var combobox = input.data("kendoComboBox");

   assert.isOk(combobox.wrapper.hasClass("test"));
});

it("set height if items height is bigger than options.height", function() {
   var dataSource = new kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]);
   dataSource.read();

   var combobox = new ComboBox(input, {
       autoBind: false,
       dataSource: dataSource,
       template: "<div style='height:30px'>#= text # </div>",
       height: 50
   });

   combobox.refresh();
   combobox.open();

   assert.equal(combobox.list.height(), 50);
});

if (!kendo.support.touch) {
    it("pointer over widget should add hover state", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}];

        var combobox = new ComboBox(input, {
             dataSource: data
        });

        var wrap = combobox.wrapper.children(".k-dropdown-wrap");

        wrap.mouseenter();

        assert.isOk(wrap.hasClass("k-state-hover"));
    });
}

it("leaving widget should remove hover state", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    var combobox = new ComboBox(input, {
         dataSource: data
    });

    wrap = combobox.wrapper.children(".k-dropdown-wrap");
    wrap.mouseenter();
    wrap.mouseleave();

    assert.isOk(!wrap.hasClass("k-state-hover"));
});

it("set selectedIndex", function() {
    var combobox = input.kendoComboBox().data("kendoComboBox");

    assert.equal(combobox.selectedIndex, -1);
});

it("set selectedIndex when autoBind: false", function() {
    var combobox = input.kendoComboBox({ autoBind: false }).data("kendoComboBox");

    assert.equal(combobox.selectedIndex, -1);
});

it("do not suggest on init", function() {
    var combobox = input.kendoComboBox({
        dataSource: ["text1", "text2"],
        suggest: true
    }).data("kendoComboBox");

    assert.equal(combobox.input.val(), "");
});

it("list.mousedown should focus input", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    var combobox = new ComboBox(input, {
         dataSource: data
    });

    combobox.input.focus();
    combobox.open();
    combobox.list.mousedown();

    assert.equal(document.activeElement.nodeName, "INPUT");
});

it("Calling triggerHandler('focus') focuses visible one", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    var combobox = new ComboBox(input, {
         dataSource: data
    });

    input.triggerHandler("focus");

    assert.equal(document.activeElement, combobox.input[0]);
});

it("resetting dataSource detaches the previouse events", function() {
    var combobox = new ComboBox(input);

    var dataSource = combobox.dataSource;

    combobox.setDataSource([]);

    combobox.bind("dataBound", function() {
        assert.isOk(false, "Change event is not detached");
    });

    dataSource.read();
});

it("resetting DataSource rebinds the widget", function() {
    var combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value"
    });

    combobox.setDataSource(new kendo.data.DataSource({
        data:[{text: 1, value: 1}, {text:2, value:2}]
    }));

    assert.equal(combobox.ul.children().length, 2);
});

it("Set data source does not change selected index", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        index: -1
   });

   combobox.setDataSource(new kendo.data.DataSource({
       data:[{text: 1, value: 1}, {text:2, value:2}]
   }));

   combobox.open();

   assert.equal(combobox.value(), "");
});

it("Persist value when rebind data source", function() {
    var combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: 1, value: 1}, {text:2, value:2}],
        value: "1"
    });

    combobox.value("");

    combobox.refresh();

    assert.equal(combobox.value(), "");
});

it("persist tabIndex of the original element", function() {
    input.attr("tabindex", 5);

    var combobox = new ComboBox(input);

    var text = combobox.input;

    assert.equal(text.attr("tabIndex"), 5);
});

it("move accesskey to the visible input", function() {
    input.attr("accesskey", "w");

    var combobox = new ComboBox(input);

    var text = combobox.input;

    assert.equal(text.attr("accesskey"), "w");
});

it("ComboBox sets element value if option.value is defined", function() {
    var combobox = input.kendoComboBox({
        dataSource: ["Item1", "Item2"],
        value: "Item2",
    }).data("kendoComboBox");

    assert.equal(combobox.value(), "Item2");
});

it("ComboBox sets element value if option.value is defined (select)", function() {
    var combobox = $("<select/>").appendTo(Mocha.fixture).kendoComboBox({
        dataSource: ["Item1", "Item2"],
        value: "Item2",
    }).data("kendoComboBox");

    assert.equal(combobox.value(), "Item2");
});

it("ComboBox displays text if autoBind false", function() {
    var combobox = input.kendoComboBox({
        text: "Chai",
        placeholder: "Select...",
        autoBind: false
    }).data("kendoComboBox");

    assert.equal(combobox.text(), "Chai");
});

it("ComboBox copies maxlength attr to the fake input", function() {
    input.attr("maxLength", 10);
    var combobox = new kendo.ui.ComboBox(input);

    assert.equal(combobox.input.attr("maxLength"), 10);
});

it("ComboBox sets value on refresh", function() {
    input.val("Foo");
    var combobox = new kendo.ui.ComboBox(input);

    combobox.dataSource.data(["Boo", "Foo"]);

    assert.equal(combobox.selectedIndex, 1);
});

it("ComboBox does not suggest on load", function() {
    var combobox = new kendo.ui.ComboBox(input.val("Item2"), {
        suggest: true,
        value: "Item2",
        autoBind: false
    });

    stub(combobox, {
        suggest: combobox.suggest
    });

    input.focus();
    combobox.dataSource.data(["Boo", "Foo"]);

    assert.equal(combobox.calls("suggest"), 0);
    assert.equal(combobox.text(), "Item2");
});

it("ComboBox fetches only once on open and not data is returned", function(done) {
    $.mockjaxSettings.responseTime = 0;
    $.mockjaxSettings.contentType = "application/json";
    $.mockjax({ url: "foo.json", responseText: '[]' });

    var called = 0;
    var combobox = new kendo.ui.ComboBox(input.val("Item2"), {
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

        assert.equal(called, 1);
        done();
    }, 200);
});

it("form reset support", function(done) {
    input.attr("value", "123");

    var form = $("<form/>").appendTo(Mocha.fixture).append(input);

    var combobox = new ComboBox(input, {
         dataSource: [{text: 1, value: 1}, {text:2, value:2}]
    });

    combobox.select(1);

    form[0].reset();

    setTimeout(function() {
        assert.equal(combobox.element.val(), "123");
        assert.equal(combobox.input.val(), "123");
        done();
    }, 150);
});

it("ComboBox honors readonly attribute", function() {
    var combobox = input.attr("readonly", true).kendoComboBox().data("kendoComboBox");

    combobox._arrow.click();

    assert.isOk(!combobox.popup.visible());
});

it("ComboBox uses disabled attr over the readonly", function() {
    var combobox = input.attr("readonly", true)
                    .attr("disabled", true)
                    .kendoComboBox()
                    .data("kendoComboBox");

    assert.equal(input.attr("readonly"), undefined);
});

it("ComboBox hides loading image on error", function(done) {
    var combobox = input.kendoComboBox().data("kendoComboBox");

    //simulate request start
    combobox.dataSource.trigger("progress");

    setTimeout(function() {

        //simulate error
        combobox.dataSource.trigger("error");

        assert.isOk(!combobox.wrapper.find(".k-i-loading").is(":visible"));
        done();
    }, 200);
});

it("ComboBox sets options.value to input value on init", function() {
    var combobox = input.val("1").kendoComboBox().data("kendoComboBox");

    assert.equal(combobox.options.value, "1");
});

it("ComboBox adds scrollbar width to the fixed group header padding", function() {
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

    var combobox = input.kendoComboBox({
        dataSource: dataSource,
        height: 50
    }).data("kendoComboBox");

    combobox.open();

    var padding = combobox.list.find(".k-group-header").css("padding-right");

    assert.isOk(parseFloat(padding) >= kendo.support.scrollbar());
});

it("ComboBox does not add scrollbar width to the fixed group header padding if popup has not scroll", function() {
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

    var combobox = input.kendoComboBox({
        dataSource: dataSource,
        height: 350
    }).data("kendoComboBox");

    combobox.open();

    var padding = combobox.list.find(".k-group-header").css("padding-right");

    assert.isOk(parseFloat(padding) < 15);
});

it("ComboBox updates selected text when selected item is changed", function() {
    var dataSource = new kendo.data.DataSource({
        data: [
            { text: "item1", value: 1 },
            { text: "item2", value: 2 },
            { text: "item3", value: 3 },
            { text: "item4", value: 4 },
            { text: "item5", value: 5 }
        ]
    });

    var combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        value: "3"
    }).data("kendoComboBox");

    dataSource.view()[2].set("text", "updated");

    assert.equal(combobox.input.val(), "updated");
});

it("ComboBox shows the custom value if source is empty", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, { value: "custom" });

   assert.equal(combobox.text(), "custom");
});

it("ComboBox shows the custom text if source is empty", function() {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, { value: "custom", text: "custom text" });

   assert.equal(combobox.value(), "custom");
   assert.equal(combobox.text(), "custom text");
});

it("ComboBox shows the custom text if source is empty", function(done) {
   var select = $("<select></select>").appendTo(Mocha.fixture);

   var combobox = new ComboBox(select, {
       autoBind: false,
       dataSource: {
           transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success([]);
                        done();
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
   var select = $("<select></select>").appendTo(Mocha.fixture);
   var dataSource = new kendo.data.DataSource({
       data: ["Item1", "Item2"]
   });

   dataSource.read();

   var combobox = new ComboBox(select, {
       autoBind: false,
       dataSource: dataSource
   });

   combobox.open();

   assert.equal(combobox.ul.children().length, 2);
});

it("ComboBox updates the selected text on source rebind", function() {
    var data = [
        { name: "item", value: 1, group: "a" },
        { name: "item2", value: 2, group: "b" }
    ];

    var combobox = input.kendoComboBox({
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
     assert.equal(input.attr("disabled"), "disabled");
     $(".k-list-container").remove()
});

it("ComboBox calls placeholder method when delayed binding is used", function(done) {
    var combobox = input.kendoComboBox({
        text: "Chai",
        placeholder: "Select...",
        autoBind: false
    }).data("kendoComboBox");

    stub(combobox, {
        _placeholder: combobox._placeholder
    });

    setTimeout(function() {
        combobox.dataSource.read();

        assert.equal(combobox.calls("_placeholder"), 1);
        done();
    });
});

it("ComboBox opens the popup if noDataTemplate", function() {
    var combobox = new ComboBox(input, {
        noDataTemplate: "no data"
    });

    combobox.wrapper.find(".k-icon:last").click();

    assert.isOk(combobox.popup.visible());
});

it("ComboBox doesn't open the popup if no data", function() {
    var combobox = new ComboBox(input, {
        noDataTemplate: ""
    });

    combobox.wrapper.find(".k-icon:last").click();

    assert.isOk(!combobox.popup.visible());
});

it("widget keeps defaultSelected property", function() {
   var select = $("<select><option>foo</option><option selected>bar</option><option>baz</option></select>").appendTo(Mocha.fixture);

    var combobox = new ComboBox(select, {
        value: "bar"
    });

    combobox.value("baz");

    var options = select[0].children;

    assert.equal(options[1].selected, false);
    assert.equal(options[2].selected, true);

    assert.equal(options[1].defaultSelected, true);
    assert.equal(options[2].defaultSelected, false);
});

it("ComboBox does not bind on open if minLength & autoBind: false", function() {
    var combobox = new ComboBox(input, {
        minLength: 3,
        autoBind: false,
        filter: "contains"
    });

    combobox.dataSource.bind("change", function() {
        assert.isOk(false, "dataSource should not be read");
    })
    combobox.wrapper.find(".k-icon:last").click();

    assert.isOk(combobox.popup.visible());
});

it("ComboBox does not bind on open if minLength & autoBind: true", function() {
    var combobox = new ComboBox(input, {
        minLength: 3,
        filter: "contains"
    });

    combobox.dataSource.bind("change", function() {
        assert.isOk(false, "dataSource should not be read");
    })
    combobox.wrapper.find(".k-icon:last").click();

    assert.isOk(combobox.popup.visible());
});

//no data template
it("ComboBox builds a noDataTemplate", function() {
    var combobox = new ComboBox(input, {
        noDataTemplate: "test"
    });

    assert.isOk(combobox.noDataTemplate);
});

it("render nodata container", function() {
    var combobox = new ComboBox(input, {
        noDataTemplate: "test"
    });

    assert.isOk(combobox.noData);
    assert.isOk(combobox.noData.hasClass("k-nodata"));
    assert.equal(combobox.noData.children("div").length, 1);
    assert.equal(combobox.noData.text(), combobox.options.noDataTemplate);
});

it("render nodata before footerTemplate", function() {
    var combobox = new ComboBox(input, {
        noDataTemplate: "test",
        footerTemplate: "footer"
    });

    assert.isOk(combobox.noData.next().hasClass("k-footer"));
});

it("hides noData template if any data", function() {
    var combobox = new ComboBox(input, {
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

    combobox.open();

    assert.isOk(!combobox.noData.is(":visible"));
});

it("shows noData template if no data", function() {
    var combobox = new ComboBox(input, {
        dataValueField: "name",
        dataTextField: "name",
        dataSource: {
            data: [ ]
        },
        noDataTemplate: "no data",
        template: '#:data.name#'
    });

    combobox.open();

    assert.isOk(combobox.noData.is(":visible"));
});

it("hides noData template if widget is bound on subsequent call", function() {
    var combobox = new ComboBox(input, {
        dataValueField: "name",
        dataTextField: "name",
        dataSource: {
            data: [ ]
        },
        noDataTemplate: "no data",
        template: '#:data.name#'
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
    var combobox = new ComboBox(input, {
        autoBind: true,
        noDataTemplate: "#: instance.dataSource.total() #"
    });

    var noData = combobox.noData;

    combobox.dataSource.data(["Item1"]);

    assert.equal(noData.text(), combobox.dataSource.total());
});

it("adds class to the wrapper if clearButton is enabled", function() {
    var combobox = new ComboBox(input, {
        clearButton: true
    });

    assert.isOk(combobox.wrapper.hasClass("k-combobox-clearable"));
});

it("adds class hidden to the wrapper if clearButton is enabled and value is null", function() {
    var combobox = new ComboBox(input, {
        clearButton: true
    });

    combobox._hideBusy()

    assert.isOk(combobox._clear.hasClass("k-hidden"));
});

it("does not add k-combobox-clearable class if clearButton is turned off", function() {
    var combobox = new ComboBox(input, {
        clearButton: false
    });

    assert.isOk(!combobox.wrapper.hasClass("k-combobox-clearable"));
});

it("_syncValueAndText is true value when syncValueAndText is true", function() {
    var combobox = new ComboBox(input, {
        syncValueAndText: true
    });

    assert.isOk(combobox._syncValueAndText());
});

it("_syncValueAndText is false value when syncValueAndText is false", function() {
    var combobox = new ComboBox(input, {
        syncValueAndText: true
    });

    assert.isOk(combobox._syncValueAndText());
});

    });
}());
